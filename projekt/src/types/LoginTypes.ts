import {ZodEmail, ZodBoolean} from "zod";

export interface newsletterPropsState {
  email?: ZodEmail;
  newsletter_check?:ZodBoolean;
  success?: boolean;
  errors?: {
    email?: string[];
    newsletter_check?: string[];
  }
}


export interface loginPropsState {
  email?: ZodEmail;
  password?: string;
  success?: boolean;
  message?: string;
  errors?: {
    email?: string[];
    password?: string[];
  }
}


export type LoginVersion = "Register" | "Login";
export enum LoginVersionState {
  Login= "Login",
  Register = "Register",
}

export interface registerMenuProps {
  registerFunction: () => void;
}


export interface loginReturnProps {
  userId: number;
  token: string;
  validUntil: number;
}