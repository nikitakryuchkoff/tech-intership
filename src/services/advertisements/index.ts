import { IAdvertisements } from '../../types';

class AdvertismentsService {
  async getAllAdvertisements(
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    data: IAdvertisements[];
    items: number;
  }> {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_RUL}advertisements?_page=${page}&_per_page=${limit}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
        },
      );

      const { data, items }: { data: IAdvertisements[]; items: number } =
        await response.json();

      return {
        data,
        items,
      };
    } catch (error) {
      throw new Error(`Fetching error ${error}`);
    }
  }
}

const advertisementsService = new AdvertismentsService();
export default advertisementsService;
