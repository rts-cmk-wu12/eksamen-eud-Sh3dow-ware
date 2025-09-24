'use client'

import {useEffect, useState} from "react";

interface OptionsProps {
  method: "GET" | "POST" | "DELETE" | "PUT"
}

export const useFetch = (url: string, options: OptionsProps) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url, options)
      const data = await response.json()
      setData(data)
    }
    fetchData()
  }, []);
    return {data}
}