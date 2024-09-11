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
          element: <NotFound />,
        },
      ],
    },
  ]);
  return router;
}
