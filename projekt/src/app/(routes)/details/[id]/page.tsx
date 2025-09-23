import {ListingItemProps} from "@/types/ListingsTypes";
import {DetailsListings} from "@/components/section/details/Details";

interface ParamProp  {
  params:Promise<{id: string}>
}

const ListingDetailsPage = async ({params}: ParamProp) => {
  try {
    const {id} = await params;
    const response = await fetch(process.env.API_URL + `listings/${id}`)
    const data_by_id: ListingItemProps  = await response.json()
    return (
        <>
         <DetailsListings data={data_by_id}></DetailsListings>
        </>
    );
  } catch (e) {
    let ErrorMsg = (e as Error).message
    return (
        <>
          <p>Der skete en fejl på serveren, {ErrorMsg}</p>
        </>
    )
  }
};


export default ListingDetailsPage