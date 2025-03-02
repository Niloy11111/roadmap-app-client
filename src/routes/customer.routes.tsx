import CustomerOrderLists from "../pages/customer/orderManagemnt/CustomerOrderLists";
import DashboardUserProfile from "../pages/dashboardUserProfile/DashboardUserProfile";

export const customerPaths = [
  {
    name: "My Profile",
    path: "my-profile",
    element: <DashboardUserProfile />,
  },

  {
    name: "View Orders",
    path: "view-orders",
    element: <CustomerOrderLists />,
  },
];
