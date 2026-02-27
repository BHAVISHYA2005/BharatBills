import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, createToken, setAuthCookie } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password } = body;

        if (!email || !password || !name) {
            return NextResponse.json(
                { success: false, error: 'Name, email and password are required' },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { success: false, error: 'Password must be at least 6 characters' },
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json(
                { success: false, error: 'Email already registered' },
                { status: 409 }
            );
        }

        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });

        const token = await createToken({ userId: user.id, email: user.email });
        const response = NextResponse.json(
            { success: true, data: { id: user.id, name: user.name, email: user.email } },
            { status: 201 }
        );
        response.cookies.set(setAuthCookie(token));
        return response;
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { success: false, error: 'Something went wrong' },
            { status: 500 }
        );
    }
}
