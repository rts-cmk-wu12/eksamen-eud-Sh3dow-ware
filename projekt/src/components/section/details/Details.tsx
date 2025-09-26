import {ListingItemProps} from "@/types/ListingsTypes";
import Image from "next/image";
import "./Details.sass"
import {fetchAction} from "@/app/utils/server/fetchAction";
import Link from "next/link";


export const DetailsListings = async ({data}: { data: ListingItemProps }) => {
  const fetchData = await fetchAction("listings")
  const filterData: [ListingItemProps] = fetchData.filter((item: ListingItemProps) => {
    return item.title.toLowerCase() !== data.title.toLowerCase()
  })
  return (
      <>
        <main className={"details"}>
          <section className={"details__product"}>
            <Image className={"details__image"} width={415} height={415} alt={data.description}
                   src={data.asset.url}></Image>
            <div className={"details__container"}>
              <h2 className={"details__title"}>{data.title}</h2>
              <p className={"details__description"}>{data.description}</p>
              <p className={"details__date"}>On SwapHub
                since: {(new Date(data.createdAt)).getFullYear()}-{(new Date(data.createdAt)).getMonth()}-{(new Date(data.createdAt)).getDate()}</p>
              <button className={"details__propose"}>Propose a Swap</button>
            </div>
          </section>
          <section className={"details__other"}>
            <h2 className={"details__title"}>Other Items</h2>
            <div className={"details__other__container"}>
              {filterData.map(item => {
                    return (
                        <section className={"details__other__section"} key={item.id}>
                          <Link href={`${item.id}`}>
                          <Image className={"details__image"} width={415} height={415} alt={item.description}
                                 src={item.asset.url}></Image>
                          <p>{item.title}</p></Link>
                        </section>
                    )
                  }
              )
              }
            </div>
          </section>
        </main>
      </>
  )
}