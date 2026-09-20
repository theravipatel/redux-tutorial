import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import usersSlice from "./usersSlice";

// Create the Redux store and configure it with the counter slice
const store = configureStore({
    reducer: {
        counter: counterSlice, // This names our state slice "counter"
        users: usersSlice,
    }
});

export default store;