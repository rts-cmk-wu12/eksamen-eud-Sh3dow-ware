'use client'

import {useEffect, useState} from "react";
import {getCookieAction} from "@/app/utils/server/getCookieAction";
import {has} from "immutable";


type actionAuth = "getCookie"

export const useCookie = (
    ...args: [action?: actionAuth, keyCookie?: string, changeState?: boolean][]
) => {
  const [login, setLogin] = useState<boolean>(false)

  const checkCookie = async (keyCookie: string) => {
    return await getCookieAction(keyCookie)
  }

  useEffect(() => {
    args.forEach(([action, keyCookie, changeState]) => {
      if (action === "getCookie" && keyCookie) {
        checkCookie(keyCookie).then(value => {
          setLogin(value)
        })
        if (changeState !== undefined) {
          setLogin(changeState)
        }
      }
    })
  }, [login]);
  return {login}
}