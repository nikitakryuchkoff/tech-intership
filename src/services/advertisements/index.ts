import { IAdvertisements } from '../../types';

class AdvertismentsService {
  async getAllAdvertisements(
    page: number = 1,
    limit: number = 10,
  ): Promise<IAdvertisements[]> {
    try {
      const data: IAdvertisements[] = await fetch(
        `${import.meta.env.VITE_BASE_RUL}advertisements?_limit=${limit}&_page=${page}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
        },
      ).then((res) => res.json());
      return data;
    } catch (error) {
      throw new Error(`Fetching error ${error}`);
    }
  }
}

const advertisementsService = new AdvertismentsService();
export default advertisementsService;
