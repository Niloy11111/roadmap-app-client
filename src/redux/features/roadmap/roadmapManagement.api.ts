import { TQueryParam, TResponseRedux } from "../../../types/global";
import { IRoadMap } from "../../../types/productManagement.type";

import { baseApi } from "../../api/baseApi";

const roadmapManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoadmaps: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        // params.append(args[0].name, args[0].value);

        // console.log(args);
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/roadmaps",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["roadmap"],
      transformResponse: (response: TResponseRedux<IRoadMap[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    addComment: builder.mutation({
      query: (data) => ({
        url: "/comments/create-comment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["comment"],
    }),

    replyComment: builder.mutation({
      query: (args) => ({
        url: `/comments/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["comment"],
    }),
    updateComment: builder.mutation({
      query: (args) => ({
        url: `/comments/${args.id}/update`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["comment"],
    }),
    deleteComment: builder.mutation({
      query: (args) => ({
        url: `/comments/${args.id}/delete`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["comment"],
    }),

    getFilteredComments: builder.query({
      query: (roadmapId: string) => ({
        url: `/comments/${roadmapId}`,
        method: "GET",
      }),
      providesTags: ["comment"],
      transformResponse: (response: TResponseRedux<IRoadMap>) => response,
    }),
    getRoadmapById: builder.query({
      query: (id: string) => ({
        url: `/roadmaps/${id}`,
        method: "GET",
      }),
      providesTags: ["roadmap"],
      transformResponse: (response: TResponseRedux<IRoadMap>) => response,
    }),

    updateRoadmap: builder.mutation({
      query: (args) => ({
        url: `/roadmaps/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["roadmap"],
    }),
    upvoteRoadmap: builder.mutation({
      query: (args) => ({
        url: `/roadmaps/${args.id}/upvote`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["roadmap"],
    }),
  }),
});

export const {
  useGetFilteredCommentsQuery,
  useAddCommentMutation,
  useUpdateRoadmapMutation,
  useGetRoadmapByIdQuery,
  useGetAllRoadmapsQuery,
  useUpvoteRoadmapMutation,
  useReplyCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = roadmapManagementApi;
