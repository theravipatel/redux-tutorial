import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import usersSlice from "./usersSlice";
import { usersApiSlice } from "./usersApiSlice";
import customLoggerMiddleware from "./middleware/customLoggerMiddleware";

// Create the Redux store and configure it with the counter slice
const store = configureStore({
    reducer: {
        counter: counterSlice, // This names our state slice "counter"
        users: usersSlice,
        // RTK Query - Required: Mounts the API cache slice into Redux state
        [usersApiSlice.reducerPath]: usersApiSlice.reducer,
    },
    // RTK Query - Required: Middleware manages caching, invalidation, and lifetimes
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(usersApiSlice.middleware, customLoggerMiddleware);
    },
});

export default store;