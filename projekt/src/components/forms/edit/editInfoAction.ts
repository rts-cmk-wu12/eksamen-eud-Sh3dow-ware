'use server'
import {z} from 'zod';
import {loginReturnProps, registerPropsState} from "@/types/LoginTypes";
import {cookies} from "next/headers";
import {revalidatePath} from "next/cache";

export async function editInfoAction(_prevState: registerPropsState, formData: FormData): Promise<registerPropsState> {
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
    const cookieStore = await cookies()
    const userID = cookieStore.get("userID")?.value
    const access_token = cookieStore.get("access_token")?.value
    if (userID) {
      const response = await fetch(process.env.API_URL + "users/" + userID, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`
        },
        method: "PUT",
        body: JSON.stringify(validated.data)
      })

      const renewAccessToken = await fetch(`${process.env.API_AUTH}`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: validated.data.email,
          password: validated.data.password,
        })
      })

      const token_data: loginReturnProps = await renewAccessToken.json()

      cookieStore.set({
        name: "access_cookie",
        value: token_data.token,
        maxAge: Math.floor(token_data.validUntil / 1000)
      })
    }
  } catch (e) {
    return {
      success: false,
      message: (e as Error).message
    }
  } finally {
    revalidatePath("/profile")
  }

  return {
    success: true
  }
}