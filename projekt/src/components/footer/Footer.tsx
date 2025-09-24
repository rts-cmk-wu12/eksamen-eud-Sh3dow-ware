import Link from "next/link";
import Image from "next/image";
import {Instagram, Linkedin, Twitter, Youtube} from "@/components/ui/icons/Icons";
import "./Footer.sass"
export const Footer = () => {
  return (
      <footer className={"footer"}>
        <nav className={"footer__navigation"}>
          <ul className={"footer__logo"}>
            <Link className={"footer__logo-link"} href={"/"}>
              <Image  width={40} height={40} src={"/logo/swaphub.svg"}
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
            <li>How it works</li>
            <li>Community guidelines</li>
            <li>Our mission</li>
            <li>Contact us</li>
          </ul>
        </nav>
        <nav className={"footer__navigation"}>
          <p className={"footer__heading"}>Discover</p>
          <ul>
            <li>Browse categories</li>
            <li>Popular Swaps</li>
            <li>Successful stories</li>
            <li>Upcoming swaps</li>
          </ul>
        </nav>
        <nav className={"footer__navigation"}>
          <p className={"footer__heading"}>Support</p>
          <ul>
            <li>Help Center</li>
            <li>FAQs</li>
            <li>Safety tips</li>
            <li>Report an issue</li>
          </ul>
        </nav>
      </footer>
  )
}