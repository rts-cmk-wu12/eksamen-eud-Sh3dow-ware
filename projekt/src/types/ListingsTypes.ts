export type Asset = {
  id: 1;
  url: string;
}

export interface ListingProps {
  items: ListingItemProps[];
}


export interface ListingItemProps {
  id: number;
  title: string;
  description: string;
  categoryId: number;
  asset: Asset;
  createdAt: Date;
  updatedAt: Date;
}