import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout, NotFound } from '../components';
import {
  AdvertisementsPage,
  AdvertisementPage,
  OrdersPage,
  OrdersWithAdvertisementsPage,
  HomePage,
} from '../pages';
import { AdvertisementsProvider } from '../context/AdvertisementsContext';
import { AdvertisementProvider } from '../context/AdvertisementContext';
import { OrdersProvider } from '../context/OrdersContext';
import { OrdersWithAdvertisementsProvider } from '../context/OrdersWithAdvertisementsContext';

export default function useAppRoutes(): ReturnType<typeof createBrowserRouter> {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/advertisements',
          element: (
            <AdvertisementsProvider>
              <AdvertisementsPage />
            </AdvertisementsProvider>
          ),
        },
        {
          path: '/advertisements/:id',
          element: (
            <AdvertisementProvider>
              <AdvertisementPage />
            </AdvertisementProvider>
          ),
        },
        {
          path: '/orders',
          element: (
            <OrdersProvider>
              <OrdersPage />
            </OrdersProvider>
          ),
        },
        {
          path: '/orders/:id',
          element: (
            <OrdersWithAdvertisementsProvider>
              <OrdersWithAdvertisementsPage />
            </OrdersWithAdvertisementsProvider>
          ),
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ]);
  return router;
}
