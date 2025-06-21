import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layout/RootLayout";
import ErrorPage from "../components/ui/pages/error/Errorpage";
import Homepage from "../components/ui/pages/home/Homepage";

import Login from "../pages/login/Login";
import Register from "../pages/register/Register";

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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/change-password",
        element: "ai",
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
