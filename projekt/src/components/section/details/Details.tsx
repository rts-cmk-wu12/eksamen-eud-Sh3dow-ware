import {ListingItemProps} from "@/types/ListingsTypes";
import Image from "next/image";
import "./Details.sass"


export const DetailsListings = ({data}: {data:ListingItemProps}) => {
  return (
      <>
     <main className={"details"}>
       <Image className={"details__image"} width={415} height={415} alt={data.description} src={data.asset.url}></Image>
       <section className={"details__product"}>
         <h2 className={"details__title"}>{data.title}</h2>
         <p className={"details__description"}>{data.description}</p>
         <p className={"details__date"}>On SwapHub since: {(new Date(data.createdAt)).getFullYear()}-{(new Date(data.createdAt)).getMonth()}-{(new Date(data.createdAt)).getDate()}</p>
         <button className={"details__propose"}>Propose a Swap</button>
       </section>
     </main>
   </>
  )
}