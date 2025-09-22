'use client'

import Image from "next/image";
import {ListingItemProps, ListingProps} from "@/types/ListingsTypes";
import {useState} from "react";
import {Pagination} from "@/components/section/products/pagination/Pagination";

export const Products = ({items}: ListingProps) => {

  const [product, setProducts] = useState<ListingItemProps[] | null>(null)

  const handleProducts = (start: number, end: number) => {
    let itemData = items.slice(start, end)
    setProducts(itemData)
  }

  return (
      <>
        {
          product?.map((item: ListingItemProps) =>
              <section key={item.id}>
                <Image quality={50} src={item.asset.url} alt={item.description} width={512} height={512}></Image>
                <p>{item.title}</p>
              </section>
          )
        }
        <Pagination items={items} handleProduct={handleProducts}></Pagination>
      </>
  );
};