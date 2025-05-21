import { Badge } from "../../../components/reusable/badge";
import { useGetOrdersQuery } from "../../../redux/features/admin/orderManagement.api";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";

import { useAppSelector } from "../../../redux/hooks";
import { TOrdersData } from "../../../types/orderManagement.type";

export interface Transaction {
  id: string;
  transactionStatus: string | null;
  bank_status: string;
  date_time: string;
  method: string;
  sp_code: string;
  sp_message: string;
}

export interface Product {
  product: string;
  quantity: number;
  _id: string;
}

export interface Order {
  transaction: Transaction;
  _id: string;
  user: Record<string, any>;
  products: Product[];
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function CustomerOrderLists() {
  const user = useAppSelector(selectCurrentUser);
  const { isLoading, data: orders } = useGetOrdersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const orderData: TOrdersData[] =
    (orders?.data?.ordersData as TOrdersData[]) || [];

  const customerOrders: TOrdersData[] = orderData?.filter(
    (item) => item?.user?.email === user?.email
  );

  return isLoading ? (
    "Loading"
  ) : (
    <div className="mx-auto   p-10 ">
      {customerOrders?.map((order, index) => (
        <div
          className={`grid  grid-cols-2 gap-4 border-x  border-b2 border-t p-4 ${
            index === customerOrders.length - 1 ? "border-b" : ""
          }`}
        >
          <div className="space-y-1">
            <h3 className="font-semibold">Customer Information</h3>
            <p>User ID: {order?.user?._id}</p>
            <p>User EMAIL: {order?.user?.email}</p>
            <p>Order Date: {new Date(order?.createdAt).toLocaleString()}</p>
            <p>Last Updated: {new Date(order?.updatedAt).toLocaleString()}</p>
            <p>
              Est. Delivery Date:{" "}
              {order.estimatedDeliveryDate
                ? new Date(order.estimatedDeliveryDate).toLocaleString()
                : "Not Updated"}
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold">Order Summary</h3>
            <p>Total Price: ${order?.totalPrice?.toFixed(2)}</p>
            <p>
              Status:{" "}
              <Badge
                variant={order?.status === "Pending" ? "outline" : "default"}
              >
                {order?.status}
              </Badge>
            </p>
          </div>
          <div>
            {/* <h3 className="font-semibold">Products</h3> */}
            <ul>
              {order?.products?.map((product, i) => (
                <li key={i} className="space-y-1">
                  <p>Product ID: {product?.product}</p>
                  <p>Quantity: {product?.quantity}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold">Transaction Details</h3>
            <p>Transaction ID: {order?.transaction?.id}</p>
            <p>Payment Method: {order?.transaction?.method}</p>
            <p>Transaction Date: {order?.transaction?.date_time}</p>
            <p>Transaction Status: {order?.transaction?.bank_status}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
