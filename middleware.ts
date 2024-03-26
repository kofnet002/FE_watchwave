import { withAuth } from "next-auth/middleware";

import { NextResponse } from "next/server";

export default withAuth(async function middleware(req) {
    const pathname = req.nextUrl.pathname;

    const isAuth = req.cookies.get('access-token');

    const sensitiveRoutes = ['/', '/watch', '/account-verification', '/auth/activiate', '/auth/reset-password'];

    const isAccessingSensitiveRoute = sensitiveRoutes.includes(pathname);

    const sensitiveRoutesAfterLogin = ['/login', '/register', '/account-verification', '/auth/activate', '/auth/reset-password']

    const isAccessingSensitiveRoutesAfterLogin = sensitiveRoutesAfterLogin.includes(pathname);

    //  if (!isAuth && isAccessingSensitiveRoute) {
    //      return NextResponse.redirect(new URL('/login', req.url));
    //  }

    // if (pathname == '/watch') {
    //     return NextResponse.redirect(new URL('/', req.url));
    // }
    if (isAuth && isAccessingSensitiveRoutesAfterLogin) {
        return NextResponse.redirect(new URL('/', req.url));
    }
}, {
    callbacks: {
        async authorized() {
            return true;
        }
    }
});


export const config = {
    matcher: ['/', '/login', '/register', '/account-verification', '/auth/activate', '/auth/reset-password', '/watch']
}