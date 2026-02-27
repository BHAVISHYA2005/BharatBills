import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(request: Request) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search') || '';

    const invoices = await prisma.invoice.findMany({
        where: {
            userId: session.userId,
            ...(status ? { status } : {}),
            ...(search ? {
                OR: [
                    { invoiceNumber: { contains: search, mode: 'insensitive' as const } },
                    { customer: { name: { contains: search, mode: 'insensitive' as const } } },
                ],
            } : {}),
        },
        include: { customer: true, items: { include: { product: true } } },
        orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: invoices });
}

export async function POST(request: Request) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { customerId, invoiceDate, dueDate, items, notes, sellerState } = body;

    if (!customerId || !items || items.length === 0) {
        return NextResponse.json({ error: 'Customer and at least one item are required' }, { status: 400 });
    }

    // Get customer for state comparison
    const customer = await prisma.customer.findFirst({ where: { id: customerId, userId: session.userId } });
    if (!customer) return NextResponse.json({ error: 'Customer not found' }, { status: 404 });

    const isInterstate = sellerState && customer.state && sellerState !== customer.state;

    // Calculate totals
    let subtotal = 0;
    let totalCgst = 0;
    let totalSgst = 0;
    let totalIgst = 0;

    const processedItems = items.map((item: { productId: number; quantity: number; unitPrice: number; gstRate: number }) => {
        const lineTotal = item.quantity * item.unitPrice;
        subtotal += lineTotal;

        const gstAmount = lineTotal * (item.gstRate / 100);
        if (isInterstate) {
            totalIgst += gstAmount;
        } else {
            totalCgst += gstAmount / 2;
            totalSgst += gstAmount / 2;
        }

        return { productId: item.productId, quantity: item.quantity, unitPrice: item.unitPrice, lineTotal, gstRate: item.gstRate };
    });

    const totalTax = totalCgst + totalSgst + totalIgst;
    const totalAmount = subtotal + totalTax;

    // Generate invoice number
    const lastInvoice = await prisma.invoice.findFirst({
        where: { userId: session.userId },
        orderBy: { createdAt: 'desc' },
    });
    const nextNum = lastInvoice ? parseInt(lastInvoice.invoiceNumber.replace('INV-', '')) + 1 : 1;
    const invoiceNumber = `INV-${String(nextNum).padStart(4, '0')}`;

    const invoice = await prisma.invoice.create({
        data: {
            userId: session.userId,
            invoiceNumber,
            customerId,
            invoiceDate: new Date(invoiceDate || Date.now()),
            dueDate: dueDate ? new Date(dueDate) : null,
            subtotal: parseFloat(subtotal.toFixed(2)),
            cgst: parseFloat(totalCgst.toFixed(2)),
            sgst: parseFloat(totalSgst.toFixed(2)),
            igst: parseFloat(totalIgst.toFixed(2)),
            totalTax: parseFloat(totalTax.toFixed(2)),
            totalAmount: parseFloat(totalAmount.toFixed(2)),
            notes: notes || null,
            items: { create: processedItems },
        },
        include: { customer: true, items: { include: { product: true } } },
    });

    return NextResponse.json({ success: true, data: invoice }, { status: 201 });
}
