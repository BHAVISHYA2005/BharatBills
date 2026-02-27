import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const customer = await prisma.customer.findFirst({
        where: { id: parseInt(id), userId: session.userId },
    });

    if (!customer) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: customer });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await request.json();
    const { name, email, phone, gstin, address, state } = body;

    const existing = await prisma.customer.findFirst({ where: { id: parseInt(id), userId: session.userId } });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const customer = await prisma.customer.update({
        where: { id: parseInt(id) },
        data: { name, email: email || null, phone: phone || null, gstin: gstin || null, address: address || null, state: state || null },
    });

    return NextResponse.json({ success: true, data: customer });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const existing = await prisma.customer.findFirst({ where: { id: parseInt(id), userId: session.userId } });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    await prisma.customer.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
}
