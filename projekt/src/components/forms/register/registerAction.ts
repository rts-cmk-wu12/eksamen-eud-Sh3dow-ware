'use server'

import {registerPropsState} from "@/types/LoginTypes";
import {z} from 'zod';
import {redirect} from "next/navigation";


export async function registerAction(_prevState: registerPropsState, formData: FormData): Promise<registerPropsState> {
  const {email, password, firstname, lastname} = Object.fromEntries(formData)

  const register_schema = z.object({
    email: z.email().min(3, {error: "Du skal udfylde email"}).max(100, {error: "Email'en overskrider 100 karaktere."}),
    password: z.string().min(6, {error: "Du skal udfylde password"}),
    firstname: z.string().min(2, {error: "Du skal udfylde First Name"}).max(20, {error: "Dit navn overskrider 20 karatere"}),
    lastname: z.string().min(2, {error: "Du skal udfylde Last Name"}).max(30, {error: "Dit efternavn overskrider 20 karatere"}),
  })

  const validated = register_schema.safeParse({
    email,
    password,
    firstname,
    lastname
  })
  console.log(validated)
  if (!validated.success) {
    const errorTree = z.treeifyError(validated.error)
    return {
      ...validated,
      errors: {
        email: errorTree.properties?.email?.errors,
        password: errorTree.properties?.password?.errors,
        firstname: errorTree.properties?.firstname?.errors,
        lastname: errorTree.properties?.lastname?.errors
      },
    }
  }

  try {
    const response = await fetch(process.env.API_URL + "users", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email: validated.data.email,
        password: validated.data.password,
        firstname: validated.data.firstname,
        lastname: validated.data.lastname,
      })
    })

    if (response.ok) {
      redirect("/login")
    }

  } catch (e) {
    return {
      success: false,
      message: (e as Error).message
    }
  }
  return {
    success: true
  }
}