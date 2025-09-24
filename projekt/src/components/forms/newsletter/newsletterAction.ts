'use server'
import { setTimeout } from "timers/promises";
import { z } from 'zod';
import {newsletterPropsState} from "@/types/LoginTypes";
import {cookies} from "next/headers";

export async function newsletterAction(_prevState: newsletterPropsState, formData: FormData): Promise<newsletterPropsState> {
  const {email, newsletter_check} = Object.fromEntries(formData)


  const newsletter_schema = z.object({
    email: z.email().min(3, {error: "Du skal udfylde email"}).max(100, {error: "Email'en overskrider 100 karaktere."}),
    // Taget fra github - https://github.com/edmundhung/conform/issues/107#issuecomment-1673834912
    newsletter_check: z.string().transform(value => value === 'on')
  })


  const validated = newsletter_schema.safeParse({
    email,
    newsletter_check
  })


  console.log(validated)

  if (!validated.success) {
    const errorTree = z.treeifyError(validated.error);
    return {
      ...validated,
      errors: {
        email: errorTree.properties?.email?.errors,
        newsletter_check: errorTree.properties?.newsletter_check?.errors,
      },
    }
  }

  await setTimeout(1000)

  const cookieStore = await cookies()

  cookieStore.set({
    name: "newsletter__access",
    value: "on",
    maxAge: 31556926,
    sameSite: "lax"
  })

  cookieStore.set({
    name: "newsletter_user",
    value: btoa(validated.data.email),
    maxAge: 31556926,
    sameSite: "lax",
  })

  return {
    success: true
  }
}



export async function getCookieAction(){
  const cookieStore = await cookies()
  return cookieStore.has("newsletter__access")
}