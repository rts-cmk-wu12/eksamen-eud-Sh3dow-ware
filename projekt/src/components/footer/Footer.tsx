'use client'

import Link from "next/link";
import Image from "next/image";
import {Instagram, Linkedin, Twitter, Youtube} from "@/components/ui/icons/Icons";
import "./Footer.sass"
import {usePathname} from "next/navigation";

export const Footer = () => {
  const path_name = usePathname()
  return (
      <footer className={"footer"}>
        <nav className={"footer__navigation"}>
          <ul className={"footer__logo"}>
            <Link className={"footer__logo-link"} href={"/"}>
              <Image width={40} height={40} src={"/logo/swaphub.svg"}
                     alt={"swaphub logo"}></Image>
              <p>SwapHub</p>
            </Link>
          </ul>
          <ul className={"footer__social"}>
            <li><Link href={"/"}><Twitter></Twitter></Link></li>
            <li><Link href={"/"}><Instagram></Instagram></Link></li>
            <li><Link href={"/"}><Youtube></Youtube></Link></li>
            <li><Link href={"/"}><Linkedin></Linkedin></Link></li>
          </ul>
        </nav>

        <nav className={"footer__navigation"}>
          <p className={"footer__heading"}>About SwapHub</p>
          <ul>
            <Link href={path_name}>
              <li>How it works</li>
            </Link>
            <Link href={path_name}>
              <li>Community guidelines</li>
            </Link>
            <Link href={path_name}>
              <li>Our mission</li>
            </Link>
            <Link href={path_name}>
              <li>Contact us</li>
            </Link>
          </ul>
        </nav>
        <nav className={"footer__navigation"}>
          <p className={"footer__heading"}>Discover</p>
          <ul>
            <Link href={path_name}>
              <li>Browse categories</li>
            </Link>
            <Link href={path_name}>
              <li>Popular Swaps</li>
            </Link>
            <Link href={path_name}>
              <li>Successful stories</li>
            </Link>
            <Link href={path_name}>
              <li>Upcoming swaps</li>
            </Link>
          </ul>
        </nav>
        <nav className={"footer__navigation"}>
          <p className={"footer__heading"}>Support</p>
          <ul>
            <Link href={path_name}>
              <li>Help Center</li>
            </Link>
            <Link href={path_name}>
              <li>FAQs</li>
            </Link>
            <Link href={path_name}>
              <li>Safety tips</li>
            </Link>
            <Link href={path_name}>
              <li>Report an issue</li>
            </Link>
          </ul>
        </nav>
      </footer>
  )
}