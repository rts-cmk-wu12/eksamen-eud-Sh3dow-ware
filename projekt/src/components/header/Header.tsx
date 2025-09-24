'use client'

import Link from "next/link"
import Image from "next/image"
import "./Header.sass"
import {usePathname} from "next/navigation";
import {useAuth} from "@/hooks/useAuth";
import {useFetch} from "@/hooks/useFetch";


export const HeaderComponent = () => {
  const pathname = usePathname()
  const {login} = useAuth()



  function logout(){
    const {} = useFetch("api/logout", {
      method: "POST"
    })
  }

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

              {!login ? <li className={`header__item header__signin ${pathname === '/login' ? 'active-sign-up' : ''}`}><Link
                  href={"/login"}>{login ? "Log out" : "Sign in"}</Link></li> : <li onClick={logout} className={`header__item header__signin ${pathname === '/' ? 'active-sign-up' : ''}`}><Link
                href={"/login"}>{login ? "Log out" : "Sign in"}</Link></li> }

              <li className={`header__item header__login ${pathname === '/login' ? 'active-login' : ''}`}><Link
                  href={"/login"}>Register</Link></li>
            </ul>
          </nav>
        </header>
      </>
  )
}