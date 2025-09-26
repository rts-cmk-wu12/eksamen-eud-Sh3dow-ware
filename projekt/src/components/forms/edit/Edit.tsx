import {useActionState} from "react";
import "./Edit.sass"
import {editInfoAction} from "@/components/forms/edit/editInfoAction";
import SpinnerDark from "@/components/forms/newsletter/SpinnerDark";


export const Edit = () => {
  const [formState, formAction, isPending] = useActionState(editInfoAction, {})
  return ( isPending ? <SpinnerDark></SpinnerDark> :
      <>
        <section className={"edit-wrapper"}>
          <form action={formAction} className={"edit"}>
            <div className={"edit__container"}>
              <label className={"edit__label"} htmlFor={"email"}>Email</label>
              <input className={"edit__input"} type={"text"} name={"email"} id={"email"}
                     placeholder={"Value"}/>
              <span>{formState?.errors?.email ? `• ${formState?.errors?.email?.[1]}` : ""} </span>
            </div>
            <div className={"edit__container"}>
              <label className={"edit__label"} htmlFor={"password"}>Password</label>
              <input className={"edit__input"} type={"password"} name={"password"} placeholder={"Value"}
                     id={"edit_check"}/>
            </div>
            <div className={"edit__container"}>
              <label className={"edit__label"} htmlFor={"firstname"}>First Name</label>
              <input className={"edit__input"} type={"text"} name={"firstname"} placeholder={"Value"}
                     id={"edit_check"}/>
            </div>
            <div className={"edit__container"}>
              <label className={"edit__label"} htmlFor={"lastname"}>Last Name</label>
              <input className={"edit__input"} type={"text"} name={"lastname"} placeholder={"Value"}
                     id={"edit_check"}/>
            </div>
            <button type={"submit"} className={"edit__submit"}>Confirm Edit</button>
          </form>
        </section>
      </>
  );
};