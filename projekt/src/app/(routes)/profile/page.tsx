import {cookies} from "next/headers";
import {Profile} from "@/components/section/profile/Profile";
import {ProfileUserProps} from "@/types/ProfileTypes";

const ProfilePage = async () => {

  const cookiesStore = await cookies()
  const userID = cookiesStore.get("userID")?.value
  const access_token = cookiesStore.get("access_token")?.value

  try {
    if (userID && access_token) {
      const response = await fetch(process.env.API_URL + "users/" + userID, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${access_token}`
        }
      })

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