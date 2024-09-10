import { IOrder } from '../../types';
import modifySortOption from '../../utils/filtredArray';

interface IOrdersResponse {
  data: IOrder[];
  itemsCount: number | 0;
}

class OrdersService {
  public async getAllOrders(
    page: number = 1,
    limit: number = 10,
    sortType: string,
    sortOrder: string,
  ): Promise<IOrdersResponse> {
    try {
      const sortOption = modifySortOption(sortType, sortOrder);

      const response = await fetch(
        `${import.meta.env.VITE_BASE_RUL}orders?_page=${page}&_limit=${limit}${sortOption?.order && `&status=${sortOption?.order}`}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
        },
      );

      const data: IOrder[] = await response.json();

      const itemsCount = Number(response.headers.get('X-Total-Count'));

      return {
        data,
        itemsCount,
      };
    } catch (error) {
      throw new Error(`Fetching error ${error}`);
    }
  }

  public async getOrdersByStatusFilter(
    page: number = 1,
    limit: number = 10,
    filter: string,
  ): Promise<IOrdersResponse> {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_RUL}orders?_page=${page}&_limit=${limit}&status=${filter}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
        },
      );

      const data: IOrder[] = await response.json();

      const itemsCount = Number(response.headers.get('X-Total-Count'));

      return {
        data,
        itemsCount,
      };
    } catch (error) {
      throw new Error(`Fetching error ${error}`);
    }
  }

  public async changeOrderStatus(id: number): Promise<number> {
    try {
      await fetch(`${import.meta.env.VITE_BASE_RUL}orders/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ status: 'Завершен' }),
      });

      return id;
    } catch (error) {
      throw new Error(`Fetching error ${error}`);
    }
  }
}

const ordersService = new OrdersService();
export default ordersService;
