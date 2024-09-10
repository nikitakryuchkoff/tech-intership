import { Advertisment } from '../../types';
import modifySortOption from '../../utils/filtredArray';

interface IAdvertisementsResponse {
  data: Advertisment[];
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

      let query = `${import.meta.env.VITE_BASE_RUL}advertisements?_page=${page}&_limit=${limit}`;

      if (sortOption.status) {
        query += `&${sortOption.status}`;
      }

      if (sortOption.name && sortOption.order) {
        query += `&${sortOption.name}&${sortOption.order}`;
      }
      const response = await fetch(query, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      });

      const data: Advertisment[] = await response.json();
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
    body: Omit<Advertisment, 'id'>,
  ): Promise<Advertisment> {
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
  public async deleteAdvertisement(id: string): Promise<void> {
    try {
      await fetch(`${import.meta.env.VITE_BASE_RUL}advertisements/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      });
    } catch (error) {
      throw new Error(`Fetching error ${error}`);
    }
  }
  public async updateAdvertisement(
    body: Record<string, FormDataEntryValue>,
    id: number,
  ): Promise<Advertisment> {
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
      const data: Advertisment[] = await response.json();

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
