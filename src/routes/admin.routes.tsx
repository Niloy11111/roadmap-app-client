import AllOrders from "../pages/admin/orderManagemnt/AllOrders";
import AllProducts from "../pages/admin/productManagement/AllProducts";
import CreateBike from "../pages/admin/productManagement/CreateBike";

import UserData from "../pages/admin/userManagement/UserData";
import DashboardUserProfile from "../pages/dashboardUserProfile/DashboardUserProfile";

export const adminPaths = [
  {
    name: "My Profile",
    path: "my-profile",
    element: <DashboardUserProfile />,
  },

  {
    name: "Product Management",
    children: [
      {
        name: "Create Bike",
        path: "create-bike",
        element: <CreateBike />,
      },
      {
        name: "All Products",
        path: "all-products",
        element: <AllProducts />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "User Lists",
        path: "user-lists",
        element: <UserData />,
      },
    ],
  },
  {
    name: "Order Management",
    children: [
      {
        name: "Manage Orders",
        path: "manage-orders",
        element: <AllOrders />,
      },
    ],
  },
];
