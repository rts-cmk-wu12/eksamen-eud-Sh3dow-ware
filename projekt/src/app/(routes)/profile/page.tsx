import {cookies, headers} from "next/headers";
import {Profile} from "@/components/section/profile/Profile";
import {ProfileUserProps} from "@/types/ProfileTypes";

const ProfilePage = async () => {

  const cookiesStore = await cookies()
  const userID = cookiesStore.get("userID")?.value
  const access_token = cookiesStore.get("access_token")?.value

  try {
    if (userID && access_token) {
      const response = await fetch(process.env.API_URL + "users/" + userID, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })

      if (!response.ok && !response.headers.get("content-type")?.includes("application/json")) {
        throw new Error("Resultatet var ikke json, prøv at logge ud for at fikse problemet.")
      }

      const data: ProfileUserProps = await response.json()

   
      return (
          <>
            <Profile user={data}></Profile>
          </>
      );
    }
  } catch (e) {
    return (
        <>
          <section>
            <p>Der skete en fejl, {(e as Error).message}</p>
          </section>
        </>)
  }
};

export default ProfilePage