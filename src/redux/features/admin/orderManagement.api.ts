import { TResponseRedux } from "../../../types";
import { TOrder } from "../../../types/orderManagement.type";
import { baseApi } from "../../api/baseApi";

const orderManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (userInfo) => ({
        url: "/orders/create-order",
        method: "POST",
        body: userInfo,
      }),
    }),
    getOrders: builder.query({
      query: () => "/orders/allOrders",
      providesTags: ["order"],
      transformResponse: (response: TResponseRedux<TOrder>) => {
        return {
          data: response.data,
          // meta: response.meta,
        };
      },
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: "/orders/verify",
        params: { order_id },
        method: "GET",
      }),
    }),
    deleteOrder: builder.mutation({
      query: (args) => ({
        url: `/orders/${args.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],
    }),
    updateOrder: builder.mutation({
      query: (args) => ({
        url: `/orders/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useCreateOrderMutation,
  useGetOrdersQuery,
  useVerifyOrderQuery,
} = orderManagementApi;
