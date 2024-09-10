import { IAdvertisement, ICreateAdvertisementFormData } from '../../types';
import modifySortOption from '../../utils/filtredArray';

interface IAdvertisementsResponse {
  data: IAdvertisement[];
  itemsCount: number | 0;
}

class AdvertismentsService {
  public async getAllAdvertisements(
    page: number = 1,
    limit: number = 10,
    sortType: string,
    sortOrder: string,
  ): Promise<IAdvertisementsResponse> {
    try {
      const sortOption = modifySortOption(sortType, sortOrder);

      const response = await fetch(
        `${import.meta.env.VITE_BASE_RUL}advertisements?_page=${page}&_limit=${limit}&_sort=${sortOption?.name}&_order=${sortOption?.order}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
        },
      );

      const data: IAdvertisement[] = await response.json();
      const itemsCount = Number(response.headers.get('X-Total-Count'));

      return {
        data,
        itemsCount,
      };
    } catch (error) {
      throw new Error(`Fetching error ${error}`);
    }
  }
  public async createAdvertisement(
    body: ICreateAdvertisementFormData,
  ): Promise<IAdvertisement> {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_RUL}advertisements`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(body),
        },
      );

      return response.json();
    } catch (error) {
      throw new Error(`Fetching error ${error}`);
    }
  }

  public async getAdvertisementById(id: number) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_RUL}advertisements?id=${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
        },
      );

      return response.json();
    } catch (error) {
      throw new Error(`Fetching error ${error}`);
    }
  }

  public async updateAdvertisement(
    body: Record<string, FormDataEntryValue>,
    id: number,
  ): Promise<IAdvertisement> {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_RUL}advertisements/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(body),
        },
      );
      return response.json();
    } catch (error) {
      throw new Error(`Fetching error ${error}`);
    }
  }

  public async searchByTitle(
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
      const data: IAdvertisement[] = await response.json();

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
