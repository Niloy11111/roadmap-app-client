import { TResponseRedux, TUser } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users/allUsers",
      providesTags: ["user"],
      transformResponse: (response: TResponseRedux<TUser[]>) => {
        return {
          data: response.data,
          // meta: response.meta,
        };
      },
    }),
    blockUser: builder.mutation({
      query: (args) => ({
        url: `/admin/users/${args.id}/block`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (args) => ({
        url: `admin/users/${args.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
    updateUserProfile: builder.mutation({
      query: (args) => ({
        url: `/users/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["user"],
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useUpdateUserProfileMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useChangePasswordMutation,
  useBlockUserMutation,
} = userManagementApi;
