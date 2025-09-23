'use client'
import {ListingItemProps} from "@/types/ListingsTypes";
import {useEffect, useState} from "react";
import "./Pagination.sass"
import {ArrowLeft, ArrowRight} from "@/components/ui/icons/Icons";

export const Pagination = ({items, handleProductAction}: {
  items: ListingItemProps[],
  handleProductAction: (start: number, end: number) => void
}) => {

  const [itemNumber, setNumbers] = useState<number[]>([])
  const [page, setPage] = useState<number>(1)


  let ProductsArray = Math.ceil(items.length / 6)

  function handleItemNumbers() {
    let ItemsArray = []
    for (let i = 1; i <= ProductsArray; i++) {
      ItemsArray.push(i)
    }
    setNumbers(ItemsArray)
  }


  function handlePagination() {
    let ItemsLength = items.length
    const MAX_ITEMS = 6
    const PAGE = page-1
    handleProductAction(0, 6)
    if (page === ProductsArray) {
      handleProductAction(ItemsLength % MAX_ITEMS, ItemsLength)
    }

    itemNumber.map((item => {

      if (item === page) {
        handleProductAction(6 * PAGE, 6 * page )
      }
    }))
  }


  useEffect(() => {
    handleItemNumbers();
    handlePagination()

  }, [page]);


  return (
      <>
        <div className={"pagination"}>
          <p onClick={() => setPage(page === 1 ? 4 : page - 1)}
             className={`pagination__previous ${page === 1 ? "disabled" : ""}`}>
            <ArrowLeft></ArrowLeft>Previous</p>
          {
            itemNumber?.map((item) => (
                <p onClick={() => setPage(item)} className={`pagination__number ${page === item ? "active" : ""}`}
                   key={item}>{item}</p>
            ))
          }
          <p onClick={() => setPage(page === ProductsArray ? 1 : page + 1)}
             className={`pagination__next ${page === ProductsArray ? "disabled" : ""}`}>Next <ArrowRight></ArrowRight>
          </p>
        </div>
      </>
  );
};