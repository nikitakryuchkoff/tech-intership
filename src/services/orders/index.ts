import { Order } from '../../types';
import modifySortOption from '../../utils/filtredArray';

interface IOrdersResponse {
  data: Order[];
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

      let query = `${import.meta.env.VITE_BASE_RUL}orders?_page=${page}&_limit=${limit}`;

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

      const data: Order[] = await response.json();

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

      const data: Order[] = await response.json();

      const itemsCount = Number(response.headers.get('X-Total-Count'));

      return {
        data,
        itemsCount,
      };
    } catch (error) {
      throw new Error(`Fetching error ${error}`);
    }
  }

  public async changeOrderStatus(id: string): Promise<string> {
    try {
      await fetch(`${import.meta.env.VITE_BASE_RUL}orders/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ status: 4, finishedAt: new Date() }),
      });

      return id;
    } catch (error) {
      throw new Error(`Fetching error ${error}`);
    }
  }

  public async fetchOrdersByAdvertisementId(
    advertisementId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<IOrdersResponse> {
    try {
      const query = `${import.meta.env.VITE_BASE_RUL}orders?_page=${page}&_limit=${limit}`;

      const response = await fetch(query, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.statusText}`);
      }

      const orders: Order[] = await response.json();
      const itemsCount = Number(response.headers.get('X-Total-Count'));

      const filteredOrders = orders.filter((order) =>
        order.items.some((item) => item.id === advertisementId),
      );

      return {
        data: filteredOrders,
        itemsCount,
      };
    } catch (error) {
      throw new Error(`Fetching error: ${error}`);
    }
  }
}

const ordersService = new OrdersService();
export default ordersService;
