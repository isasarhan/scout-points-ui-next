import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const currentUser = request.cookies.get('currentUser')

    if (!currentUser && request.nextUrl.pathname.includes('/dashboard'))
        return Response.redirect(new URL('/login', request.url))
    
    
    // if (currentUser && request.nextUrl.pathname.startsWith('/dashboard'))
    //     return Response.redirect(new URL('/dashboard', request.url))
    
    
}