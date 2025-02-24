export type TOrdersData = {
  _id: string;
  user: Record<string, any>; // Adjust based on actual user structure
  products: {
    product: string; // ObjectId of the product (Bike)
    quantity: number;
  }[];
  totalPrice: number;
  status: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled";
  transaction?: {
    id?: string;
    transactionStatus?: string;
    bank_status?: string;
    sp_code?: string;
    sp_message?: string;
    method?: string;
    date_time?: string;
  };
  createdAt: string;
  updatedAt: string;
};
export type TRevenueData = {
  name: string;
  Total: number;
};

export type TOrder = {
  ordersData: TOrdersData[];
  revenueData: TRevenueData[];
};
