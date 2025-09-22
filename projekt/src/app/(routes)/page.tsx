import {Products} from "@/components/section/products/Products";


const HomePage = async () => {
  const ProductResponse = await fetch("http://localhost:4000/api/v1/listings")
  const ProductData = await ProductResponse.json()
  return (
      <>
        <Products items={ProductData}></Products>
      </>
  )
}



export default HomePage