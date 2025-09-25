import {ChangeEvent, useContext} from "react";
import {SearchContext} from "@/components/section/products/search/provider/SearchProvider";
import "./Search.sass"
export const Search = () => {
  const {setSearchTerm} = useContext(SearchContext)


  function handleSearchTerm(e: ChangeEvent){
    const searched = (e.target as HTMLInputElement).value
    setSearchTerm(searched)
  }

  return (
      <>
        <form className={"search-box"}>
          <input className={"search-box__input"} onChange={handleSearchTerm} type={"search"} placeholder={"Search"}/>
        </form>
      </>
  );
};