import { auth } from "@/auth";
import { NextRequest } from "next/server";

export default auth((req: NextRequest & { auth: { user?: { id: string } } | null }) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
    const isPublicRoute = nextUrl.pathname === "/" || nextUrl.pathname.startsWith("/auth");
    const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");

    if (isApiAuthRoute) return;

    if (isPublicRoute) {
        if (isLoggedIn && nextUrl.pathname.startsWith("/auth")) {
            return Response.redirect(new URL("/dashboard", nextUrl));
        }
        return;
    }

    if (!isLoggedIn && isDashboardRoute) {
        return Response.redirect(new URL("/auth/login", nextUrl));
    }

    return;
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
