'use server'


import {z} from 'zod';
import {loginPropsState, loginReturnProps} from "@/types/LoginTypes";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";



export async function loginAction(_prevState: loginPropsState, formData: FormData): Promise<loginPropsState> {
  const {email, password} = Object.fromEntries(formData)

  const login_schema = z.object({
    email: z.email().min(3, {error: "Du skal udfylde email"}).max(100, {error: "Email'en overskrider 100 karaktere."}),
    password: z.string().min(6, {error: "Du skal udfylde password"}),
  })


  const validated = login_schema.safeParse({
    email,
    password
  })
   console.log(validated)
  if (!validated.success) {
    const errorTree = z.treeifyError(validated.error);
    return {
      ...validated,
      errors: {
        email: errorTree.properties?.email?.errors,
        password: errorTree.properties?.password?.errors,
      },
    }
  }

  try {
    const response = await fetch(`${process.env.API_AUTH}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email: validated.data.email,
        password: validated.data.password
      })
    })
    const data: loginReturnProps = await response.json()
    const cookieStore = await cookies()

    cookieStore.set({
      name: 'access_token',
      value: data.token,
      maxAge: Math.floor(data.validUntil / 1000)
    })
  } catch (e) {
    return {
      success: false,
      message: "Din email eller adgangskode er forkert."
    }
  }

  redirect("/")
}