import { TQueryParam, TResponseRedux } from "../../../types";
import { TOrder } from "../../../types/orderManagement.type";
import {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
} from "../../../types/productManagement.type";
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

    getAllSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        // params.append(args[0].name, args[0].value);

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicSemesters: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
    getAcademicFaculties: builder.query({
      query: () => {
        return { url: "/academic-faculties", method: "GET" };
      },
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
    }),
    getAcademicDepartments: builder.query({
      query: () => {
        return { url: "/academic-departments", method: "GET" };
      },
      transformResponse: (response: TResponseRedux<TAcademicDepartment[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: "/academic-departments/create-academic-department",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useCreateOrderMutation,
  useGetOrdersQuery,
  useVerifyOrderQuery,
  useGetAllSemestersQuery,
  useAddAcademicSemestersMutation,
  useGetAcademicDepartmentsQuery,
  useGetAcademicFacultiesQuery,
} = orderManagementApi;
