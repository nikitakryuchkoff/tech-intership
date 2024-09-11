import { RouterProvider } from 'react-router-dom';
import useAppRoutes from './hooks/useAppRoutes';

export default function App() {
  const router = useAppRoutes();

  return <RouterProvider router={router} />;
}
