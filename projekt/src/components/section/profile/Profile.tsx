'use client'

import {ProfileProps} from "@/types/ProfileTypes";
import "./Profile.sass"
import {useState} from "react";
import {Edit} from "@/components/forms/edit/Edit";

export const Profile = ({user}: ProfileProps) => {
  const [popup, setPopUp] = useState<boolean>(false)

  function handlePopUp() {
    setPopUp(prevState => !prevState)
  }

  return (
      <>
        <section className={"profile"}>
          <h2 className={"profile__title"}>Hej, {`${user.firstname} ${user.lastname}`}</h2>
          <div className={"profile__container"}>
            <button onClick={handlePopUp} className={"profile__edit"}>Redigere oplysninger</button>
          </div>
          {popup && <div className={"profile__popup"}>
              <button onClick={handlePopUp} className={"profile__unedit"}>X</button>
              <Edit></Edit>
          </div>}
        </section>
      </>
  );
};