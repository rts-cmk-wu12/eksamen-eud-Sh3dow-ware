import { NextResponse, NextRequest } from 'next/server'
import {cookies} from "next/headers";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies()
  if (!cookieStore.has("access_token")){
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: '/profile/:path*',
}