import { Advertisment } from '../../types';
import modifySortOption from '../../utils/filtredArray';

interface IAdvertisementsResponse {
  data: Advertisment[];
  itemsCount: number;
}

class AdvertismentsService {
  private baseUrl: string = import.meta.env.VITE_BASE_RUL;

  private async fetchFromApi<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET',
    body?: object,
    signal?: AbortSignal,
  ): Promise<{ data: T; totalCount: number | null }> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: body ? JSON.stringify(body) : undefined,
        signal,
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const totalCount = Number(response.headers.get('X-Total-Count'));
      const data = await response.json();

      return { data, totalCount };
    } catch (error) {

      return { data: [] as T, totalCount: null };
    }
  }

  public async getAllAdvertisements(
    page: number = 1,
    limit: string = '10',
    sortType: string,
    sortOrder: string,
    signal?: AbortSignal,
  ): Promise<IAdvertisementsResponse> {
    const sortOption = modifySortOption(sortType, sortOrder);

    let query = `advertisements?_page=${page}&_limit=${limit}`;

    if (sortOption.status) {
      query += `&${sortOption.status}`;
    }

    if (sortOption.name && sortOption.order) {
      query += `&${sortOption.name}&${sortOption.order}`;
    }

    const { data, totalCount } = await this.fetchFromApi<Advertisment[]>(
      query,
      'GET',
      undefined,
      signal,
    );

    if (totalCount === null) {
      throw new Error('Total count is missing in the response headers.');
    }

    return {
      data,
      itemsCount: totalCount,
    };
  }

  public async createAdvertisement(
    body: Omit<Advertisment, 'id'>,
    signal?: AbortSignal,
  ): Promise<Advertisment> {
    return this.fetchFromApi<Advertisment>(
      'advertisements',
      'POST',
      body,
      signal,
    ).then((response) => response.data);
  }

  public async getAdvertisementById(
    id: string,
    signal?: AbortSignal,
  ): Promise<Advertisment> {
    const { data } = await this.fetchFromApi<Advertisment[]>(
      `advertisements?id=${id}`,
      'GET',
      undefined,
      signal,
    );

    if (data.length > 0) {
      return data[0];
    }

    throw new Error('Advertisement not found');
  }

  public async deleteAdvertisement(
    id: string,
    signal?: AbortSignal,
  ): Promise<void> {
    await this.fetchFromApi<void>(
      `advertisements/${id}`,
      'DELETE',
      undefined,
      signal,
    );
  }

  public async updateAdvertisement(
    body: Record<string, FormDataEntryValue>,
    id: string,
    signal?: AbortSignal,
  ): Promise<Advertisment> {
    return this.fetchFromApi<Advertisment>(
      `advertisements/${id}`,
      'PATCH',
      body,
      signal,
    ).then((response) => response.data);
  }

  public async searchByTitle(
    searchQuery: string,
    page: number,
    limit: string,
    signal?: AbortSignal,
  ): Promise<IAdvertisementsResponse> {
    const query = `advertisements?_page=${page}&_limit=${limit}&name_like=${searchQuery}`;
    const { data, totalCount } = await this.fetchFromApi<Advertisment[]>(
      query,
      'GET',
      undefined,
      signal,
    );

    return {
      data,
      itemsCount: totalCount!,
    };
  }
}

const advertisementsService = new AdvertismentsService();
export default advertisementsService;
