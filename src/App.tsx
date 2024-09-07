import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components';
import MainPage from './pages/MainPage';

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
          element: <div>123</div>,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
