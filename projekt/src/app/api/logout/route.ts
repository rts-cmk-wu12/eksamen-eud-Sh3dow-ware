'use server'
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export async function POST() {
  const cookieStore = await cookies()
  if (cookieStore.has("access_token")) {
    cookieStore.delete("access_token")
    redirect("/login")
  }
}