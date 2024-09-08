export default interface IAdvertisement {
  id: number;
  title: string;
  image: string;
  likes: number;
  price: number;
  views: number;
  description?: string;
}
