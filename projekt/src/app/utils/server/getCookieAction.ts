'use server'

import {cookies} from "next/headers";

export async function getCookieAction(cookie_key: string) {
  const cookieStore = await cookies()
  return cookieStore.has(cookie_key)
}