import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Define the async API call
export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
    const response = await fetch("https://dummyjson.com/users/?limit=5");
    return response.json();
});

// Define user slice
const usersSlice = createSlice({
    name: "usersSlice",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.data = action.error?.message;
        });
    },
});

export default usersSlice.reducer;