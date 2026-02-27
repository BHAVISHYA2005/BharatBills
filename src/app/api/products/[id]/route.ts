import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const product = await prisma.product.findFirst({
        where: { id: parseInt(id), userId: session.userId },
    });

    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: product });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await request.json();
    const { name, hsnCode, gstRate, price, description } = body;

    const existing = await prisma.product.findFirst({ where: { id: parseInt(id), userId: session.userId } });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const product = await prisma.product.update({
        where: { id: parseInt(id) },
        data: { name, hsnCode, gstRate: parseInt(gstRate), price: parseFloat(price), description: description || null },
    });

    return NextResponse.json({ success: true, data: product });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const existing = await prisma.product.findFirst({ where: { id: parseInt(id), userId: session.userId } });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    await prisma.product.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
}
