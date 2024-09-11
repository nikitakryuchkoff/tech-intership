import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '../components';
import {
  AdvertisementsPage,
  AdvertisementPage,
  OrdersPage,
  OrdersWithAdvertisementsPage,
} from '../pages';

export default function useAppRoutes(): ReturnType<typeof createBrowserRouter> {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: '/advertisements',
          element: <AdvertisementsPage />,
        },
        {
          path: '/advertisements/:id',
          element: <AdvertisementPage />,
        },
        {
          path: '/orders',
          element: <OrdersPage />,
        },
        {
          path: '/orders/:id',
          element: <OrdersWithAdvertisementsPage />,
        },
        {
          path: '*',
          element: <Navigate to={'/advertisements'} />,
        },
      ],
    },
  ]);
  return router;
}
