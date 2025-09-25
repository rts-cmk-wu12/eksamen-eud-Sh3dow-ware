'use client'

import {deleteCookieAction} from "@/app/utils/server/signoutAction";


export const handleCookieDeleteRequest = async (cookie_key: string) => {
  await deleteCookieAction(cookie_key)
}