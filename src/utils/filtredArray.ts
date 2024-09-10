import { IAdvertisement } from '../types';

function filtredArray(
  sortedAdvertisements: IAdvertisement[],
  sortType: string,
  sortOrder: string,
) {
  if (sortType === 'Цена') {
    sortedAdvertisements.sort((a, b) =>
      sortOrder === 'По возрастанию' ? a.price - b.price : b.price - a.price,
    );
  } else if (sortType === 'Просмотры') {
    sortedAdvertisements.sort((a, b) =>
      sortOrder === 'По возрастанию' ? a.views - b.views : b.views - a.views,
    );
  } else if (sortType === 'Лайки') {
    sortedAdvertisements.sort((a, b) =>
      sortOrder === 'По возрастанию' ? a.likes - b.likes : b.likes - a.likes,
    );
  }
}
export default filtredArray;
