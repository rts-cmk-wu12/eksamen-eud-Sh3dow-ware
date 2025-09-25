'use client'

import {createContext, ReactNode, useState} from "react";


interface SearchContextProps {
  searchTerm: string
  setSearchTerm: (newSearchTerm: string) => void
}


export const SearchContext = createContext<SearchContextProps>(
    {
      searchTerm: "",
      setSearchTerm: () => {
      }
    }
)

interface SearchProviderProps {
  children: ReactNode
}

export const SearchProvider = ({children}: SearchProviderProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
      <>
        <SearchContext value={{searchTerm, setSearchTerm}}>
          {children}
        </SearchContext>
      </>
  );
};