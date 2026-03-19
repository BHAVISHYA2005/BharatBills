import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    
    const isApiAuthRoute = pathname.startsWith("/api/auth");
    const isPublicRoute = pathname === "/" || pathname.startsWith("/auth");
    const isDashboardRoute = pathname.startsWith("/dashboard");

    if (isApiAuthRoute) return;

    const token = req.cookies.get("bb_token")?.value;
    const isLoggedIn = token ? !!(await verifyToken(token)) : false;

    if (isPublicRoute) {
        if (isLoggedIn && pathname.startsWith("/auth")) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }
        return;
    }

    if (!isLoggedIn && isDashboardRoute) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return;
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
