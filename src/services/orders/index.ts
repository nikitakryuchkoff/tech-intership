import { IOrder } from '../../types';

interface IOrdersResponse {
  data: IOrder[];
  itemsCount: number | 0;
}

class OrdersService {
  public async getAllOrders(
    page: number = 1,
    limit: number = 10,
  ): Promise<IOrdersResponse> {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_RUL}orders?_page=${page}&_limit=${limit}`,
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
  public async getOrderById(id: number) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_RUL}orders?id=${id}`,
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
}

const ordersService = new OrdersService();
export default ordersService;
