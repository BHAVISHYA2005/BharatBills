import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = "force-dynamic";
import { getSession } from '@/lib/auth';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const invoice = await prisma.invoice.findFirst({
        where: { id: parseInt(id), userId: session.userId },
        include: { customer: true, items: { include: { product: true } } },
    });

    if (!invoice) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: invoice });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await request.json();
    const { status, notes, dueDate } = body;

    const existing = await prisma.invoice.findFirst({ where: { id: parseInt(id), userId: session.userId } });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const invoice = await prisma.invoice.update({
        where: { id: parseInt(id) },
        data: {
            ...(status ? { status } : {}),
            ...(notes !== undefined ? { notes } : {}),
            ...(dueDate ? { dueDate: new Date(dueDate) } : {}),
        },
        include: { customer: true, items: { include: { product: true } } },
    });

    return NextResponse.json({ success: true, data: invoice });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const existing = await prisma.invoice.findFirst({ where: { id: parseInt(id), userId: session.userId } });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    await prisma.invoice.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
}
