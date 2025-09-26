'use server'

import {cookies} from "next/headers";

export async function deleteCookieAction(cookie_key: string) {
  const cookieStore = await cookies()
  if (cookieStore.has(cookie_key)){
    cookieStore.delete(cookie_key)
    cookieStore.delete("userID")
  }
}