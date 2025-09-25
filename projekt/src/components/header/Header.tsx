'use client'

import Link from "next/link"
import Image from "next/image"
import "./Header.sass"
import {usePathname} from "next/navigation";
import {useCookie} from "@/hooks/useCookie";
import {handleCookieDeleteRequest} from "@/app/utils/client/handleCookieRequest";


export const HeaderComponent = () => {
  const pathname = usePathname()
  const {login} = useCookie(["getCookie", "access_token"])


  return (
      <>
        <header className={"header"}>
          <nav className={"header__navigation"}>
            <ul className={"header__list header__logo"}>
              <Link className={"header__list header__logo"} href={"/"}>
                <Image className={"header__item"} width={40} height={40} src={"/logo/swaphub.svg"}
                       alt={"swaphub logo"}></Image>
                <p className={"header__item"}>SwapHub</p>
              </Link>
            </ul>
            <ul className={"header__list"}>
              <li className={`header__item ${pathname === '/' ? 'active' : ''}`}><Link href={"/"}>Listings</Link></li>
              <li className={`header__item ${pathname === '/community' ? 'active' : ''}`}><Link
                  href={"/community"}>Community</Link></li>
              <li className={`header__item ${pathname === '/contact' ? 'active' : ''}`}><Link
                  href={"/contact"}>Contact</Link></li>
              <li onClick={async () => handleCookieDeleteRequest("access_token")} className={`header__item header__signin ${pathname === '/login' ? 'active-sign-up' : ''}`}><Link
                  href={"/login"}>{!login ? "Sign in" : "Log Out"}</Link></li>
              <li className={`header__item header__login ${pathname === '/login' ? 'active-login' : ''}`}><Link
                  href={"/login"}>Register</Link></li>
            </ul>
          </nav>
        </header>
      </>
  )
}