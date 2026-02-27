import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(request: Request) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';

    const products = await prisma.product.findMany({
        where: {
            userId: session.userId,
            ...(search ? { name: { contains: search, mode: 'insensitive' as const } } : {}),
        },
        orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: products });
}

export async function POST(request: Request) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { name, hsnCode, gstRate, price, description } = body;

    if (!name || !hsnCode || gstRate === undefined || !price) {
        return NextResponse.json({ error: 'Name, HSN code, GST rate, and price are required' }, { status: 400 });
    }

    const product = await prisma.product.create({
        data: { userId: session.userId, name, hsnCode, gstRate: parseInt(gstRate), price: parseFloat(price), description: description || null },
    });

    return NextResponse.json({ success: true, data: product }, { status: 201 });
}
