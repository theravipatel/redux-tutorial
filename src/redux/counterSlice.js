import { createSlice } from "@reduxjs/toolkit";

// Define a slice of the Redux store for the counter functionality
const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
    },
    // Define the reducers for incrementing, decrementing, and incrementing by a specific amount
    reducers: {
        incrementMyCount: (state) => {
            state.value += 1; // Immer allows safe "mutation" here
        },
        decrementMyCount: (state) => {
            state.value -= 1;
        },
        incrementMyCountByAmount: (state, action) => {
            state.value += action.payload; // action.payload holds the argument passed
        },
    },
});

// Export the actions to dispatch them in components
export const { incrementMyCount, decrementMyCount, incrementMyCountByAmount } = counterSlice.actions;

// Export the reducer for store.js
export default counterSlice.reducer;