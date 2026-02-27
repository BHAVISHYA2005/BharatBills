import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const userId = session.userId;

    const [totalInvoices, totalCustomers, totalProducts, invoices] = await Promise.all([
        prisma.invoice.count({ where: { userId } }),
        prisma.customer.count({ where: { userId } }),
        prisma.product.count({ where: { userId } }),
        prisma.invoice.findMany({
            where: { userId },
            include: { customer: true },
            orderBy: { createdAt: 'desc' },
            take: 5,
        }),
    ]);

    const allInvoices = await prisma.invoice.findMany({ where: { userId }, select: { totalAmount: true, status: true } });
    const totalRevenue = allInvoices.reduce((sum: number, inv: { totalAmount: number }) => sum + inv.totalAmount, 0);
    const pendingAmount = allInvoices.filter((i: { status: string }) => i.status === 'sent' || i.status === 'draft').reduce((sum: number, inv: { totalAmount: number }) => sum + inv.totalAmount, 0);

    return NextResponse.json({
        success: true,
        data: { totalInvoices, totalCustomers, totalProducts, totalRevenue, pendingAmount, recentInvoices: invoices },
    });
}
