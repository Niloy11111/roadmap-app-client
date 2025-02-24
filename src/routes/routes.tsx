import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import RootLayout from "../components/layout/RootLayout";
import AllItems from "../components/ui/pages/all-products/AllItems";
import BikeDetails from "../components/ui/pages/bikeDetails/BikeDetails";
import Checkout from "../components/ui/pages/checkout/Checkout";
import ErrorPage from "../components/ui/pages/error/Errorpage";
import Homepage from "../components/ui/pages/home/Homepage";
import OrderVerification from "../components/ui/pages/verifyOrder/Verifyorder";
import ChangePassword from "../pages/customer/ChangePassword";

import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import { customerPaths } from "./customer.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/all-products",
        element: <AllItems />,
      },
      {
        path: "/details/:id",
        element: <BikeDetails />,
      },
      {
        path: "/checkout/:id",
        element: <Checkout />,
      },
      {
        path: "/order/verify",
        element: <OrderVerification />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <App />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },

  {
    path: "/customer",
    element: (
      <ProtectedRoute role="customer">
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(customerPaths),
  },
]);

export default router;
