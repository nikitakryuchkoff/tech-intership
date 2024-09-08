import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components';
import { AdvertisementPage, AdvertisementsPage, OrdersPage } from './pages';

export default function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <AdvertisementsPage />,
        },
        {
          path: '/:id',
          element: <AdvertisementPage />,
        },
        {
          path: '/orders',
          element: <OrdersPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
