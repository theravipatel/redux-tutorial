import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const notesApiSlice = createApi({
    reducerPath: "notesApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
    tagTypes: ["Notes"],
    endpoints: (builder) => ({
        // List Notes
        listNotes: builder.query({
            query: () => "notes",
            providesTags: ["Notes"],
        }),
        // Create Note
        createNote: builder.mutation({
            query: (requestPayload) => ({
                url: "notes",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: requestPayload,
            }),
            invalidatesTags: ["Notes"],
        }),
        // Delete Note
        deleteNote: builder.mutation({
            query: (noteId) => ({
                url: `notes/${noteId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Notes"],
        }),
    })
});

export const {
    useListNotesQuery,
    useCreateNoteMutation,
    useDeleteNoteMutation
} = notesApiSlice;