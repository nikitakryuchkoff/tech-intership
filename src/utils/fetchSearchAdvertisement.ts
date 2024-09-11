import { AdvertismentsService } from '../services';
import { Advertisment } from '../types';

interface FetchAdvertisementsParams {
  debouncedQuery?: string;
  page: number;
  limit: string;
  sortType: string;
  sortOrder: string;
  signal?: AbortSignal;
}

const fetchAdvertisements = async ({
  debouncedQuery,
  page,
  limit,
  sortType,
  sortOrder,
}: FetchAdvertisementsParams): Promise<{
  data: Advertisment[];
  itemsCount: number;
}> => {
  let result;

  if (debouncedQuery) {
    result = await AdvertismentsService.searchByTitle(
      debouncedQuery,
      page,
      limit,
    );
  } else {
    result = await AdvertismentsService.getAllAdvertisements(
      page,
      limit,
      sortType,
      sortOrder,
    );
  }

  return result;
};

export default fetchAdvertisements;
