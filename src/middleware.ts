import { NextRequest, NextResponse } from "next/server";
import { IUser, Role } from "./types/user";
import { getAuth } from "./lib/auth";

export async function middleware(request: NextRequest) {
    const { user } = await getAuth()

    if (!user && (request.nextUrl.pathname.includes('/admin') || request.nextUrl.pathname.includes('/account')))
        return Response.redirect(new URL('/login', request.url))

    if (user) {

        switch (user.role) {
            case Role.USER:
                if (request.nextUrl.pathname.startsWith("/admin")) {
                    return NextResponse.redirect(new URL("/", request.url));
                }
                break;
            case Role.ADMIN:
                if (request.nextUrl.pathname.startsWith("/account")) {
                    return NextResponse.redirect(new URL("/admin", request.url));
                }
                break;
        }
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}