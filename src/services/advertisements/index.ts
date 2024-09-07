import { IAdvertisements } from '../../types';

interface IAdvertisementsResponse {
  data: IAdvertisements[];
  itemsCount: number | 0;
}

class AdvertismentsService {
  async getAllAdvertisements(
    page: number = 1,
    limit: number = 10,
  ): Promise<IAdvertisementsResponse> {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_RUL}advertisements?_page=${page}&_limit=${limit}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
        },
      );

      const data: IAdvertisements[] = await response.json();

      const itemsCount = Number(response.headers.get('X-Total-Count'));

      return {
        data,
        itemsCount,
      };
    } catch (error) {
      throw new Error(`Fetching error ${error}`);
    }
  }

  async searchByTitle(
    searchQuery: string,
    page: number,
    limit: number,
  ): Promise<IAdvertisementsResponse> {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_RUL}advertisements?_page=${page}&_limit=${limit}&title_like=${searchQuery}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
        },
      );
      const data: IAdvertisements[] = await response.json();

      const itemsCount = Number(response.headers.get('X-Total-Count'));

      return {
        data,
        itemsCount,
      };
    } catch (error) {
      throw new Error(`Fetching error ${error}`);
    }
  }
}

const advertisementsService = new AdvertismentsService();
export default advertisementsService;
