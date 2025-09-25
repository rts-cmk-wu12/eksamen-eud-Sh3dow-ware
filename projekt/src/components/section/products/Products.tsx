'use client'

import Image from "next/image";
import {ListingItemProps, ListingProps} from "@/types/ListingsTypes";
import {useContext, useEffect, useState} from "react";
import {Pagination} from "@/components/section/products/pagination/Pagination";
import "./Products.sass"
import Link from "next/link";
import {Search} from "@/components/section/products/search/Search";
import {SearchContext} from "@/components/section/products/search/provider/SearchProvider";

export const Products = ({items}: ListingProps) => {

  const [product, setProducts] = useState<ListingItemProps[] | null>(null)

  const handleProducts = (start: number, end: number) => {
    let itemData = items.slice(start, end)
    setProducts(itemData)
  }

  const {searchTerm} = useContext(SearchContext)

  useEffect(() => {
   console.log(searchTerm)
  }, [searchTerm]);

  const filteredItems = searchTerm === "" ? product : product?.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
      <>

          <Search></Search>
          <article className={"products"}>
            {
              filteredItems?.map((item: ListingItemProps) => {
                return (
                <Link key={item.id} href={`/details/${item.id}`}>
                  <section className={"products__section"}>
                    <Image className={"products__image"} quality={50} src={item.asset.url} alt={item.description}
                           width={256} height={256}></Image>
                    <p className={"products__title"}>{item.title}</p>
                  </section>
                </Link>
              )
              })
            }
          </article>
          <Pagination items={items} handleProductAction={handleProducts}></Pagination>
      </>
  );
};