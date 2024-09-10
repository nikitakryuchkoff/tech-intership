export interface IAdvertisement {
  id: number;
  title: string;
  image: string;
  likes: number;
  price: number;
  views: number;
  description?: string;
}

export interface IOrder {
  orderNumber: number;
  items: IAdvertisement[];
  totalPrice: number;
  creationDate: string;
  status: string;
  id: number;
}
