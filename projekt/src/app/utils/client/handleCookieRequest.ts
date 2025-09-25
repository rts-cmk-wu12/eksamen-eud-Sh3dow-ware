'use client'

import {deleteCookieAction} from "@/app/utils/server/signoutAction";
import {useCookie} from "@/hooks/useCookie";

export const handleCookieDeleteRequest = async (cookie_key: string) => {
  await deleteCookieAction(cookie_key)
  useCookie([undefined, undefined, false])
}