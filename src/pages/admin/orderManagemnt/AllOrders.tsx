import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { Badge } from "../../../components/reusable/badge";
import { Button } from "../../../components/reusable/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "../../../components/reusable/card";
import Skeleton from "../../../components/Skeleton/Skeleton";
import Modal from "../../../components/ui/pages/checkout/modal/Modal";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";

import { Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { statusesOptions } from "../../../constants/global";
import {
  useDeleteOrderMutation,
  useGetOrdersQuery,
  useUpdateOrderMutation,
} from "../../../redux/features/admin/orderManagement.api";
import { useAppSelector } from "../../../redux/hooks";

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
  user: string;
  products: Product[];
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function AllOrders() {
  const [orderId, setOrderId] = useState("");
  const [defaultValues, setDefaultValues] = useState({});
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const user = useAppSelector(selectCurrentUser);
  const { isLoading, data } = useGetOrdersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const orderData: Order[] = data?.data;

  const [deleteOrder] = useDeleteOrderMutation();
  const [updateOrder] = useUpdateOrderMutation();

  console.log(orderData);
  const handleDeleteOrder = async (orderId: string) => {
    const toastId = toast.loading("Creating... ");

    const deleteData = {
      id: orderId,
    };

    try {
      const res = await deleteOrder(deleteData);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Product Deleted", { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const handleUpdateOrder = (orderId: string) => {
    setOpenUpdate(true);
    setOrderId(orderId);

    // Implement the update functionality here
    console.log("Update order :", orderId);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating... ");

    const category = data?.category
      ?.toLowerCase()
      .replace(/^./, (c: string) => c.toUpperCase());

    // console.log("createbike", bikeData);
    const updateData = {
      id: orderId,
      data: {
        status: data.status,
        estimatedDeliveryDate: data.estimatedDeliveryDate,
      },
    };

    console.log("uddatedData", updateData);

    try {
      const res = await updateOrder(updateData);
      if (res.error) {
        console.log(res.error);
        toast.error(res.error.data.message, { id: toastId });
      } else {
        console.log("here", res);
        toast.success("Product Updated", { id: toastId });
        // setOpen(false);
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return isLoading ? (
    <Skeleton />
  ) : (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {orderData?.map((order) => (
          <Card key={order._id}>
            <CardContent>
              <dl className="grid grid-cols-2 gap-2 p-4">
                <dt className="font-semibold">Order ID:</dt>
                <dd>{order._id}</dd>
                <dt className="font-semibold">Total Price:</dt>
                <dd>${order.totalPrice?.toFixed(2)}</dd>
                <dt className="font-semibold">Status:</dt>
                <dd>
                  <Badge
                    variant={
                      order?.status === "Pending" ? "outline" : "default"
                    }
                  >
                    {order?.status}
                  </Badge>
                </dd>
                <dt className="font-semibold">Created At:</dt>
                <dd>{new Date(order.createdAt).toLocaleString()}</dd>
                <dt className="font-semibold">Est. Delivery Date:</dt>
                <dd>
                  {order.estimatedDeliveryDate
                    ? new Date(order.estimatedDeliveryDate).toLocaleString()
                    : "Not Updated"}
                </dd>
              </dl>
            </CardContent>
            <CardFooter>
              <div className="flex gap-4">
                <Button
                  variant="dashboardTwo"
                  className="px-5 py-2 rounded"
                  onClick={() => handleUpdateOrder(order._id)}
                >
                  Update
                </Button>
                <Modal open={openUpdate} onClose={() => setOpenUpdate(false)}>
                  <div className="text-center ">
                    <Pencil size={26} className="mx-auto text-red-500" />

                    <div className="mx-auto my-2 w-[400px]">
                      <h3 className="text-lg font-black text-gray-800">
                        Update Order
                      </h3>
                    </div>

                    <Flex justify="center" align="center">
                      <Col span={24}>
                        {" "}
                        {/* Expand to full width */}
                        <PHForm
                          onSubmit={onSubmit}
                          defaultValues={defaultValues}
                        >
                          <PHSelect
                            label="Status"
                            name="status"
                            options={statusesOptions}
                          />

                          <PHInput
                            type="date"
                            label="Estimated Delivery Date"
                            name="estimatedDeliveryDate"
                          />
                          <div className="flex justify-center gap-4 ">
                            <button
                              type="submit"
                              className="btn btn-light  px-7"
                              onClick={() => setOpenUpdate(false)}
                            >
                              Update
                            </button>
                            <button
                              type="button"
                              className="btn btn-light  px-7"
                              onClick={() => setOpenUpdate(false)}
                            >
                              Cancel
                            </button>
                          </div>
                        </PHForm>
                      </Col>
                    </Flex>
                  </div>
                </Modal>
                <Button
                  variant="dashboardOne"
                  className="px-5 py-2 rounded"
                  onClick={() => setOpenDelete(true)}
                >
                  Delete
                </Button>
                <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
                  <div className="text-center ">
                    <Trash size={56} className="mx-auto text-red-500" />
                    <div className="mx-auto my-4 w-[400px]">
                      <h3 className="text-lg font-black text-gray-800">
                        Confirm Delete
                      </h3>
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this order?
                      </p>
                    </div>
                    <div className="flex justify-center gap-4 ">
                      <button
                        onClick={() => handleDeleteOrder(order._id)}
                        className="btn btn-danger px-7 "
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-light  px-7"
                        onClick={() => setOpenDelete(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Modal>
              </div>

              <ul className="ml-5">
                {order?.products?.map((product, i) => (
                  <li key={i}>
                    Product ID: {product?.product}, Quantity:{" "}
                    {product?.quantity}
                  </li>
                ))}
              </ul>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
