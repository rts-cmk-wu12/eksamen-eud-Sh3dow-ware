import {useActionState} from "react";
import {registerAction} from "@/components/forms/register/registerAction";
import "./Register.sass"
import {registerMenuProps} from "@/types/LoginTypes";

export const Register = ({registerFunction}: registerMenuProps) => {
  const [formState, formAction, isPending] = useActionState(registerAction, {})
  return (
      <>
        <section className={"register-wrapper"}>
          <form action={formAction} className={"register"}>
            <div className={"register__container"}>
              <label className={"register__label"} htmlFor={"email"}>Email</label>
              <input className={"register__input"} type={"text"} name={"email"} id={"email"}
                     placeholder={"Value"}/>
              <span>{formState?.errors?.email ? `• ${formState?.errors?.email?.[1]}` : ""} </span>
            </div>
            <div className={"register__container"}>
              <label className={"register__label"} htmlFor={"register_check"}>Password</label>
              <input className={"register__input"} type={"password"} name={"register_check"} placeholder={"Value"}
                     id={"register_check"}/>
            </div>
            <button type={"submit"} className={"register__submit"}>Register</button>
            <p onClick={registerFunction} className={"register__register"}>Go to login</p>
          </form>
        </section>
      </>
  );
};