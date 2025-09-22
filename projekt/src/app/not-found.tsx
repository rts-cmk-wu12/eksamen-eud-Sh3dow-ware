import Link from "next/link";
import "./not-found.sass"
const NotFoundPage = () => {
  return (
      <>
        <section className={"not-found"}>
          <h2 className={"not-found__title"}>⚠️Fandt ikke siden⚠️</h2>
          <p className={"not-found__description"}>Desværre kunne vi ikke finde siden du søgte efter.</p>
          <p className={"not-found__return"}>Returner til <Link className={"not-found__link"} href={"/"}>forside</Link></p>
        </section>
      </>
  )
}


export default NotFoundPage