'use client'

import {useEffect, useState} from "react";

export const useAuth = () => {
   const [login, setLogin] = useState<boolean>(false)

  useEffect(() => {
    const hasAccessToken = async () =>  {
      const response = await fetch("api/auth")
      const data: {authCookie: boolean} = await response.json()
      setLogin(data.authCookie)
    }
    hasAccessToken()
  }, []);

   return {login}
}