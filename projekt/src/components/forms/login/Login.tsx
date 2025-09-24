'use client'

import {useActionState, useEffect, useState} from "react";
import {loginAction} from "@/components/forms/login/loginAction";
import "./Login.sass"
import {LoginVersion, LoginVersionState} from "@/types/LoginTypes";
import {Register} from "@/components/forms/register/Register";
import {useAuth} from "@/hooks/useAuth";

export const Login = () => {
  const [formState, formAction, isPending] = useActionState(loginAction, {})
  const [formVersion, setFormVersion] = useState<LoginVersion>("Login")
  const {login} = useAuth()

  const registerMenu = () => {
    setFormVersion(prevState => prevState === "Login" ? "Register" : "Login")
  }

  switch (formVersion) {
    case LoginVersionState.Login:
      return (!login ? (<>
            <section className={"login-wrapper"}>
              <form action={formAction} className={"login"}>
                <div className={"login__container"}>
                  <label className={"login__label"} htmlFor={"email"}>Email</label>
                  <input className={"login__input"} type={"text"} name={"email"} id={"email"}
                         placeholder={"Value"}/>
                  <span>{formState?.errors?.email ? `• ${formState?.errors?.email?.[1]}` : ""} </span>
                </div>
                <div className={"login__container"}>
                  <label className={"login__label"} htmlFor={"password"}>Password</label>
                  <input className={"login__input"} type={"password"} name={"password"} placeholder={"Value"}
                         id={"password"}/>
                </div>
                <button type={"submit"} className={"login__submit"}>Sign in</button>
                <p onClick={registerMenu} className={"login__register"}>Register</p>
              </form>
            </section>
          </>) : (
              <>
                <section className={"login-wrapper"}>
                  <p>Hejsa</p>
                </section>
              </>
          )
      )

    case LoginVersionState.Register:
      return (
          <>
            <Register registerFunction={(registerMenu)}></Register>
          </>
      )
  }
};