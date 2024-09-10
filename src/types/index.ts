export interface IAdvertisement {
  id: number;
  title: string;
  image: string;
  likes: number;
  price: number;
  views: number;
  description?: string;
}
export interface ICreateAdvertisementFormData {
  title: string;
  image: string;
  description?: string;
  price: number;
  likes: number;
  views: number;
}

export interface IOrder {
  orderNumber: number;
  items: IAdvertisement[];
  totalPrice: number;
  createdAt: string;
  status: string;
  id: number;
}
