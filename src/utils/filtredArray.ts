interface ModifySortOptionReturnValue {
  status?: any;
  name?: any;
  order?: any;
  filter?: {
    status: string;
  };
  sort?: {
    name?: string;
    order?: string;
  };
}

function modifySortOption(
  sortType: string,
  sortOrder: string,
): ModifySortOptionReturnValue {
  const order = sortOrder === 'По возрастанию' ? 'asc' : 'desc';

  let filter = {};
  let sort = {};

  switch (sortType) {
    case 'Цена':
      sort = { name: '_sort=price', order: `_order=${order}` };
      break;
    case 'Просмотры':
      sort = { name: '_sort=views', order: `_order=${order}` };
      break;
    case 'Лайки':
      sort = { name: '_sort=likes', order: `_order=${order}` };
      break;
    case 'Статус':
      if (sortOrder !== 'Все') {
        filter = { status: `status=${sortOrder}` };
      }
      break;
    default:
      break;
  }

  return { ...filter, ...sort };
}

export default modifySortOption;
