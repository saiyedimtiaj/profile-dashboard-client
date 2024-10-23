// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://portfolio-dashboard-zeta.vercel.app/api",
  }),

  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (data) => ({
        url: "/project",
        body: data,
        method: "POST",
      }),
    }),
    createBlog: builder.mutation({
      query: (data) => ({
        url: "/blog",
        body: data,
        method: "POST",
      }),
    }),
    createSkill: builder.mutation({
      query: (data) => ({
        url: "/skill",
        body: data,
        method: "POST",
      }),
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/delete-project/${id}`,
        method: "DELETE",
      }),
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/delete-blog/${id}`,
        method: "DELETE",
      }),
    }),
    deleteSkill: builder.mutation({
      query: (id) => ({
        url: `/delete-skill/${id}`,
        method: "DELETE",
      }),
    }),
    getProject: builder.query({
      query: () => ({
        url: "/get-project",
        method: "GET",
      }),
    }),
    getBlogs: builder.query({
      query: () => ({
        url: "/get-blog",
        method: "GET",
      }),
    }),
    getSkill: builder.query({
      query: () => ({
        url: "/get-skill",
        method: "GET",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateProjectMutation,
  useCreateBlogMutation,
  useGetProjectQuery,
  useCreateSkillMutation,
  useDeleteProjectMutation,
  useGetBlogsQuery,
  useDeleteBlogMutation,
  useGetSkillQuery,
  useDeleteSkillMutation,
} = baseApi;
