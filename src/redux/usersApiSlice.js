import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApiSlice = createApi({
    reducerPath: "usersApi", // Required: Unique store state key
    baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }), // Required: Sets base URL
    tagTypes: ["Users"], // Declare the tag label for tracking cache
    endpoints: (builder) => ({
        // Required: Defines endpoints.
        // builder.query is for GET requests
        fetchUsers: builder.query({
            query: () => "users/?limit=5",
            providesTags: ["Users"], // Tag this GET query cache
        }),
        // builder.mutation is for POST/PUT/DELETE
        addUsers: builder.mutation({
            query: (userPayload) => ({
                url: "users/add",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: userPayload, // Pass form data to backend
            }),
            invalidatesTags: ["Users"], // Clear tag to trigger auto refetch of fetchUsers
        }),
    }),
});

// RTK Query auto-generates custom hooks based on the endpoint names
export const { useFetchUsersQuery, useAddUsersMutation } = usersApiSlice;