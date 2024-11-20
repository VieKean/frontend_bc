import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductPage from './pages/ProductPage';
import CheckOutPage from './pages/CheckOutPage';
import PrivateRoute from './components/PrivateRoute'; // Route bảo vệ

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/register",
        element: <RegisterPage />
      },
      {
        path: "/",
        element: (
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/product/:id",
        element: (
          <PrivateRoute>
            <ProductDetailPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/product",
        element: (
          <PrivateRoute>
            <ProductPage />
          </PrivateRoute>
        ),
      }

      ,
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <CheckOutPage />
          </PrivateRoute>
        ),
      }
    ]
  },
  {
    path: "*",
    element: <div>Không tìm thấy web theo yêu cầu</div>
  }
]);
