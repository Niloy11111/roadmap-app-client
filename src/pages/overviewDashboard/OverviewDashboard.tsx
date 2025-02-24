import Widget from "../../components/widget/widget";
import { useGetOrdersQuery } from "../../redux/features/admin/orderManagement.api";
import { useGetAllProductsQuery } from "../../redux/features/admin/productManagement.api";
import Chart from "./chart/Chart";

import { useGetUsersQuery } from "../../redux/features/admin/userManagement.api";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import "../../styles/loading/loading.scss";
import Table from "../overviewDashboard/table/Table";
import FeaturedDashboard from "./featured/FeaturedDashboard";
import "./overviewHome.scss";
const OverviewDashboard = () => {
  const user = useAppSelector(selectCurrentUser);
  const { isLoading: orderIsLoading, data: orders } = useGetOrdersQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const { isLoading: userIsLoading, data: userData } =
    user?.role === "admin" ? useGetUsersQuery() : { data: 30 };

  const { isLoading: bikeIsLoading, data: bikeData } = useGetAllProductsQuery();

  if (orderIsLoading || bikeIsLoading || userIsLoading) {
    return <div className="loader">Loading...</div>;
  }

  const orderData = orders?.data?.ordersData;
  const revenueData = orders?.data?.revenueData;
  const revenue = orderData?.reduce((acc, item) => acc + item.totalPrice, 0);

  console.log("revenueData", revenueData);

  const formatLength = (num: number) => {
    return num < 10 ? `0${num}` : num < 100 ? `${num}` : `${num}`;
  };

  const categoriesOrders = orderData?.map((item) => ({
    products: item.products[0],
    monthName:
      new Date(item.createdAt).toLocaleString("default", { month: "long" }) +
      new Date(item.createdAt).getFullYear(),
    createdAt: item.createdAt,
  }));

  // const revenueData = categoriesOrders?.reduce((acc, item) => {
  //   const { monthName, products } = item;
  //   const totalRevenue = products.price * products.quantity;

  //   const monthIndex = new Date(`${monthName} 1`).getMonth(); // Get the month index (0 for January, 1 for February, etc.)

  //   // If the month doesn't exist in the array, initialize it
  //   if (!acc[monthIndex]) {
  //     acc[monthIndex] = { name: monthName, Total: 0 };
  //   }

  //   acc[monthIndex].Total += totalRevenue;

  //   return acc;
  // }, []);

  const todaySales = categoriesOrders
    ?.filter((item) => {
      const createdAt = new Date(item.createdAt);
      const today = new Date();

      return (
        createdAt.getDate() === today.getDate() &&
        createdAt.getMonth() === today.getMonth() &&
        createdAt.getFullYear() === today.getFullYear()
      );
    })
    .reduce((total, item) => total + item.products.price, 0);

  // Assuming price is inside products[0]

  // const data = [
  //   { name: "January", Total: 1200 },
  //   { name: "February", Total: 2100 },
  //   { name: "March", Total: 800 },
  //   { name: "April", Total: 1600 },
  //   { name: "May", Total: 900 },
  //   { name: "June", Total: 1700 },
  // ];
  console.log(formatLength(userData?.data?.length || 0));

  return (
    <div className="">
      <div className="grid grid-cols-4">
        <Widget
          type="customers"
          amount={formatLength(userData?.data?.length || 0)}
        />

        <Widget type="order" amount={formatLength(orderData?.length || 0)} />

        <Widget
          type="products"
          amount={formatLength(bikeData?.data?.length || 0)}
        />
        <Widget type="earning" amount={revenue} />
      </div>
      <div className="charts flex gap-5 mt-5">
        <FeaturedDashboard todaySales={todaySales} />
        <Chart
          revenueData={revenueData}
          title="Last 6 Months (Revenue)"
          aspect={2 / 1}
        />
      </div>

      <div className="listContainer ">
        <div className="listTitle my-5">Latest Transactions</div>
        <Table orderIsLoading={orderIsLoading} orders={orderData} />
      </div>
    </div>
  );
};

export default OverviewDashboard;
