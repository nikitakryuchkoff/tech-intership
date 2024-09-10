function modifySortOption(sortType: string, sortOrder: string) {
  const order = sortOrder === 'По возрастанию' ? 'asc' : 'desc';

  switch (sortType) {
    case 'Цена':
      return { name: 'price', order };
    case 'Просмотры':
      return { name: 'views', order };
    case 'Лайки':
      return { name: 'likes', order };
    case 'Статус':
      return { name: 'status', order: sortOrder !== 'Все' ? sortOrder : '' };
  }
}

export default modifySortOption;
