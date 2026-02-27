import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = "force-dynamic";
import { getSession } from '@/lib/auth';

export async function GET(request: Request) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';

    const customers = await prisma.customer.findMany({
        where: {
            userId: session.userId,
            ...(search ? { name: { contains: search, mode: 'insensitive' as const } } : {}),
        },
        orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: customers });
}

export async function POST(request: Request) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { name, email, phone, gstin, address, state } = body;

    if (!name) {
        return NextResponse.json({ error: 'Customer name is required' }, { status: 400 });
    }

    const customer = await prisma.customer.create({
        data: { userId: session.userId, name, email: email || null, phone: phone || null, gstin: gstin || null, address: address || null, state: state || null },
    });

    return NextResponse.json({ success: true, data: customer }, { status: 201 });
}
