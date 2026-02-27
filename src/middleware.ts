import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/dashboard')) {
        const token = request.cookies.get('bb_token')?.value;
        if (!token) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
        const session = await verifyToken(token);
        if (!session) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
    }

    if (pathname.startsWith('/auth/')) {
        const token = request.cookies.get('bb_token')?.value;
        if (token) {
            const session = await verifyToken(token);
            if (session) {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/auth/:path*'],
};
