import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApiSlice = createApi({
    reducerPath: "usersApi", // Required: Unique store state key
    baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }), // Required: Sets base URL
    endpoints: (builder) => ({
        // Required: Defines endpoints. builder.query is for GET requests
        fetchUsers: builder.query({
            query: () => "users/?limit=5",
        }),
    }),
});

// RTK Query auto-generates custom hooks based on the endpoint names
export const { useFetchUsersQuery } = usersApiSlice;