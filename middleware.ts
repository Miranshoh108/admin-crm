import {NextResponse} from "next/server"
import type {NextRequest} from "next/server"

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value

    const url = request.nextUrl
    const path = url.pathname

    if (token && path === "/login") {
        return NextResponse.redirect(new URL("/", request.url))
    }

    if (!token && path !== "/login") {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|api|.*\\..*).*)"],
}
