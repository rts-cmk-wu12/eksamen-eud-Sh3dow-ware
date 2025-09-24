'use client'

import {useActionState, useEffect, useState} from "react";
import {getCookieAction, newsletterAction} from "@/components/forms/newsletter/newsletterAction";
import "./Newsletter.sass"
import SpinnerDark from "@/components/forms/newsletter/SpinnerDark";


export const Newsletter = () => {

  const [formState, formAction, isPending] = useActionState(newsletterAction, {})
  const [subscribed, setSubscribe] = useState<boolean>()

  async function waitCookie() {
    const cookieValue = await getCookieAction()
    setSubscribe(cookieValue)
  }
  useEffect(() => {
    waitCookie()
  }, [formState]);
  // Spinner animation taken from - https://react-bootstrap.netlify.app/docs/components/spinners/
  return isPending ? (<SpinnerDark></SpinnerDark>) : (
      <>
        {!subscribed ? (
            <section className={"newsletter-wrapper"}>
              <form action={formAction} className={"newsletter"}>
                <div className={"newsletter__container-input"}>
                  <label className={"newsletter__label"} htmlFor={"email"}>Email <span
                      className={"newsletter__required"}>*</span></label>
                  <input className={"newsletter__input"} type={"text"} name={"email"} id={"email"}
                         placeholder={"Enter email"}/>
                  <span>{formState?.errors?.email ? `• ${formState?.errors?.email?.[1]}` : ""} </span>
                </div>
                <div className={"newsletter__container-checkbox"}>
                  <label className={"newsletter__label"} htmlFor={"newsletter_check"}>Sign up for newsletter <span
                      className={"newsletter__required"}>*</span></label>
                  <input defaultChecked={true} className={"newsletter__checkbox"} type={"checkbox"}
                         name={"newsletter_check"}
                         id={"newsletter_check"}/>
                </div>
                <span>{formState?.errors?.newsletter_check ? "• Du skal acceptere vores nyhedsbrev" : ""}</span>
                <button className={"newsletter__submit"}>Submit</button>
              </form>
            </section>
        ) : (
            <section className={"newsletter-wrapper"}>
              <p>Tak for at melde dig til vores nyhedsbrev.</p>
            </section>
        )}
      </>
  )
};