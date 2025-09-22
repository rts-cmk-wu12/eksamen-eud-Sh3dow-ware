'use client'

import Link from "next/link"
import Image from "next/image"
import "./header.sass"
import {usePathname} from "next/navigation";


export const HeaderComponent = (slug: string) => {
  const pathname = usePathname()
  return (
      <>
        <header className={"header"}>
          <nav className={"header__navigation"}>
            <ul className={"header__list header__logo"}>
              <Image className={"header__item"} width={40} height={40} src={"/logo/swaphub.svg"}
                     alt={"swaphub logo"}></Image>
              <p className={"header__item"}>SwapHub</p>
            </ul>
            <ul className={"header__list"}>
              <li className={`header__item ${pathname === '/' ? 'active' : ''}`}><Link href={"/"}>Listings</Link></li>
              <li className={`header__item ${pathname === '/community' ? 'active' : ''}`}><Link href={"/community"}>Community</Link></li>
              <li className={`header__item ${pathname === '/contact' ? 'active' : ''}`}><Link href={"/contact"}>Contact</Link></li>
              <li className={`header__item ${pathname === '/login' ? 'active-sign-up' : ''}`}><Link href={"/login"}>Sign in</Link></li>
              <li className={`header__item ${pathname === '/login' ? 'active-login' : ''}`}><Link href={"/login"}>Register</Link></li>
            </ul>
          </nav>
        </header>
      </>
  )
}