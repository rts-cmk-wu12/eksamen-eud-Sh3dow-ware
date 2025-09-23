import {Products} from "@/components/section/products/Products";

const HomePage = async () => {
  try {
    const ProductResponse = await fetch(process.env.API_URL + "listings")
    const ProductData = await ProductResponse.json()
    return (
        <>
          <Products items={ProductData}></Products>
        </>
    )
  } catch (e) {
    let ErrorMsg = (e as Error).message
    return (
        <>
          <p>Der skete en fejl på serveren, {ErrorMsg}</p>
        </>
    )
  }
}



export default HomePage