import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components';
import { AdvertisementPage, MainPage } from './pages';

export default function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
        {
          path: '/:id',
          element: <AdvertisementPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
