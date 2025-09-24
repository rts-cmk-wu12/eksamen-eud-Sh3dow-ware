'use server'
import {cookies} from "next/headers";

export async function GET() {
  const cookieStore = await cookies()
  return Response.json({authCookie: cookieStore.has("access_token")})
}