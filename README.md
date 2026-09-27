# React Redux & Redux Toolkit Tutorial

## 1) Introduction of Redux & Redux Toolkit
- What is `Redux`?
    - Redux provides a centralized "store" to hold data that needs to be shared across our entire application.
    - It operates on three core principles:
        - `Single Source of Truth`:
            - The entire state of your application is stored in one central object tree.
        - `State is Read-Only`:
            - The only way to change the state is by emitting an Action (a plain JavaScript object describing what happened).
        - `Changes are Made with Pure Functions`:
            - To specify how the state tree is transformed by actions, we write Reducers—functions that take the current state and an action, and return a brand-new updated state without mutating the original data.
- The Problem with "Classic" Redux:
    - Historically, vanilla Redux was notorious for requiring an overwhelming amount of boilerplate code.
    - Setting up a simple counter required manually creating action type strings, separate action creator functions, complex switch-case statements in reducers, manually handling object-spreading for immutability, and complicated store configuration.
- What is `Redux Toolkit (RTK)`?
    - Redux Toolkit was created by the Redux team to eliminate that heavy boilerplate, prevent common developer mistakes, and enforce best practices automatically.
    - It comes bundled with essential tools and middleware out of the box.
    - Features of RTK:
        - `Code Setup`:
            - Minimal boilerplate using a unified "slice" file.
        - `Store Setup`:
            - Using `configureStore()` handles store creation, automatically sets up DevTools, and adds Redux Thunk.
        - `Immutability`:
            - Built-in `Immer` library lets us write clean, "mutating" syntax (like state.value += 1) safely behind the scenes.
        - `Async Operations`:
            - Using `createAsyncThunk()` simplifies handling promises (pending, fulfilled, rejected) out of the box.
- Key APIs in Redux Toolkit:
    - `configureStore()`:
        - Wraps the standard store creation tool to provide streamlined options, automatically combining reducers and attaching built-in middleware like redux-thunk.
    - `createSlice()`:
        - Accepts an initial state and an object of reducer functions, then automatically generates our action creators and action type strings dynamically.
    - `RTK Query`:
        - An optional, powerful data-fetching and caching layer built directly into RTK that eliminates the need to hand-write loading and error states for API calls.


## 2) Installation

- Install Node.js
- Install Vite
- Setup React App via Terminal:
    -   ```
        npm create vite@latest
        ```
    - Follow the prompts and select as per your need
- Install Node Modules
    -   ```
        npm install
        ```
- Install Redux/Redux-Toolkit
    -   ```
        npm install @reduxjs/toolkit react-redux
        ```
- Run the React App
    -   ```
        npm run dev
        ```
    - App should now run on localhost:5173 (Vite's default port).


## 3) Redux and Redux Toolkit Terminology
- Redux is a pattern and library for managing global application state, and Redux Toolkit is the modern, standard way to write Redux logic with less code.
- Redux Toolkit terminology centers on simplifying global state management by reducing boilerplate code and providing sensible defaults.
- Core Redux Concepts:
    - `State`:
        - The single, central object that holds all of our application's data at any given time.
    - `Action`:
        - A plain JavaScript object with a type property that describes "what happened" in the application.
    - `Payload`:
        - Extra data sent along with an action to update the state.
    - `Reducer`:
        - A pure function that takes the previous state and an action, calculates the next state, and returns it.
    - `Dispatch`:
        - The function used to send an action to the store to trigger a state update.
    - `Store`:
        - The centralized container that holds the application's complete state tree.
    - `Immutability`:
        - The core rule that state cannot be directly changed; instead, updates create an updated copy of the state.
- Redux Toolkit (RTK) Concepts:
    - `configureStore()`:
        - A function that sets up a Redux store with good default settings, combining reducers, and adding developer tools automatically.
    - `createSlice()`:
        - A function that accepts a name, initial state, and reducer functions, automatically generating action creators and action types matching our reducers.
    - `Immer`:
        - A built-in library that lets us write "mutating" logic inside reducers (e.g., state.value = 2) which it safely turns into immutable updates under the hood.
    - `Action Creator`:
        - A generated function that creates and returns an action object when called (e.g., increment()).
    - `createAsyncThunk()`:
        - A utility that generates a thunk handling asynchronous requests and automatically dispatching lifecycle actions (pending, fulfilled, rejected).
    - `RTK Query`:
        - A specialized data-fetching and caching toolset built into Redux Toolkit to manage server-side data and API endpoints.
    - `useSelector`:
        - A React hook that extracts data values from the global Redux store state.
    - `useDispatch`:
        - A React hook that returns the dispatch function to send actions from components.


## 4) Basic Example to setup store with Redux & RTK
- In this, we will see the complete setup from the absolute beginning, starting with the root file (main.jsx or index.jsx) where we hook up the Redux store to our React application.
- `Hook up the Provider (main.jsx)`:
    - To make the Redux store available to our entire React app, we must wrap our root component with the `<Provider>` component from react-redux and pass it our store.
    - Example:
        -   ```jsx
            // In main.jsx
            import { StrictMode } from 'react'
            import { createRoot } from 'react-dom/client'
            import 'bootstrap/dist/css/bootstrap.min.css';
            import './index.css'
            import App from './App.jsx'
            import { Provider } from 'react-redux'

            createRoot(document.getElementById('root')).render(
                <StrictMode>
                    <Provider>
                        <App />
                    </Provider>
                </StrictMode>,
            )
            ```
- `Configure the Store (store.js)`:
    - Next, create the central store using `configureStore()`.
    - This file holds the state tree of our app.
    - Example:
        -   ```jsx
            // In redux/store.js
            import { configureStore } from "@reduxjs/toolkit";

            // Create the Redux store and configure it with the counter slice
            const store = configureStore({
                reducer: {}
            });

            export default store;
            ```
        -   ```jsx
            // In main.jsx
            import { StrictMode } from 'react'
            import { createRoot } from 'react-dom/client'
            import 'bootstrap/dist/css/bootstrap.min.css';
            import './index.css'
            import App from './App.jsx'
            import { Provider } from 'react-redux'
            import store from './redux/store.js'

            createRoot(document.getElementById('root')).render(
                <StrictMode>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </StrictMode>,
            )
            ```
- `Create the Logic Slice (counterSlice.js)`:
    - The slice handles our initial state and the logic for updating it.
    - `createSlice()` automatically builds our actions and reducers behind the scenes.
    - Example:
        -   ```jsx
            // In redux/counterSlice.js
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
            ```
        -   ```jsx
            // In redux/store.js
            import { configureStore } from "@reduxjs/toolkit";
            import counterSlice from "./counterSlice";

            // Create the Redux store and configure it with the counter slice
            const store = configureStore({
                reducer: {
                    counter: counterSlice, // This names our state slice "counter"
                }
            });

            export default store;
            ```
- `Connect to Components`:
    - Finally, read data from the store with `useSelector` and dispatch updates using `useDispatch`.
    - Example:
        -   ```jsx
            // In MyCounterComponent.jsx
            import { Button } from "react-bootstrap";
            // import the hooks we need from react-redux
            import { useDispatch, useSelector } from "react-redux";
            // import the actions we defined in counterSlice.js
            import { incrementMyCount, decrementMyCount, incrementMyCountByAmount } from "./redux/counterSlice";

            function MyCounter() {
                // Access the "counter" object we defined in store.js
                const count = useSelector((state) => state.counter.value);

                // Get the dispatch function to dispatch actions
                const dispatch = useDispatch();

                return (
                    <div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <td colSpan={3}>Redux Toolkit Counter: { count }</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="w-25">
                                        <Button
                                            type="button"
                                            className="w-full"
                                            variant="primary"
                                            onClick={ () => dispatch(incrementMyCount()) }
                                        >
                                            Increment ++
                                        </Button>
                                    </td>
                                    <td className="w-25">
                                        <Button
                                            type="button"
                                            className="w-full"
                                            variant="primary"
                                            onClick={ () => dispatch(decrementMyCount()) }
                                        >
                                            Decrement --
                                        </Button>
                                    </td>
                                    <td className="w-25">
                                        <Button
                                            type="button"
                                            className="w-full"
                                            variant="primary"
                                            onClick={ () => dispatch(incrementMyCountByAmount(5)) }
                                        >
                                            Increment By 5
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            }

            export default MyCounter;
            ```


## 5) API Call with Redux Toolkit Using createAsyncThunk
- This is traditional approach for standard async workflows.
- In this, we write the asynchronous request manually and manage `pending`, `fulfilled`, and `rejected` states in our slice.
- If we prefer explicit control over dispatch actions and internal state properties, use `createAsyncThunk` along with a slice.
- To implement this we can follow below steps:
    - `Create the Async Thunk and Slice`:
        - Define the async function to resolve our payload data, and set up our lifecycle cases (pending, fulfilled, rejected) in the slice using `extraReducers`.
        - Example:
            -   ```js
                // In redux/usersSlice.js
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
                ```
    - `Configure the Redux Store`:
        - Register the slice reducer inside our central configuration file.
        - Example:
            -   ```js
                // In redux/store.js
                import { configureStore } from "@reduxjs/toolkit";
                import usersSlice from "./usersSlice";

                // Create the Redux store and configure it with the counter slice
                const store = configureStore({
                    reducer: {
                        users: usersSlice,
                    }
                });

                export default store;
                ```
    - `Dispatch and Access State in Components`:
        - Trigger the API payload dispatch on layout mount via useEffect, and read values from the slice through hooks.
        - Example:
            -   ```jsx
                // In ApiCallWithCreateAsyncThunkComponent.jsx
                import { useEffect } from "react";
                import { useDispatch, useSelector } from "react-redux";
                import { fetchUsers } from "./redux/usersSlice";
                import { Button, Spinner } from "react-bootstrap";

                function ApiCallWithCreateAsyncThunk() {
                    // Call the API using dispatch & useEffect
                    const dispatch = useDispatch();

                    useEffect(() => {
                        dispatch(fetchUsers());
                    }, []);

                    // Get the API using selector
                    const { data, loading, error} = useSelector((state) => state.users);

                    if (loading) {
                        return (
                            <div>
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                Loading...
                            </div>
                        );
                    }

                    if (error) {
                        return (
                            <div>
                                Errors... {error}
                            </div>
                        );
                    }

                    return (
                        <div>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>User Name</th>
                                        <th>User Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data?.users?.map((user, index)=>(
                                            <tr key={index}>
                                                <td>{ user?.id }</td>
                                                <td>{ user?.username }</td>
                                                <td>{ user?.email }</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    );
                }

                export default ApiCallWithCreateAsyncThunk;
                ```


## 6) GET API Call with Redux Toolkit Using RTK Query
- RTK Query is the modern, built-in data fetching and caching solution for Redux Toolkit.
- In this, we do not write async logic or manage pending, fulfilled, or rejected states manually; the tool handles networking states and caching automatically.
- If we want to eliminate slice boilerplate, automatically manage server cache, and use auto-generated custom React hooks, use RTK Query.
- To implement this we can follow below steps:
    - `Create the API Slice`:
        - Define the base configuration, endpoints, and data fetching queries using createApi and fetchBaseQuery from the React entry point.
        - Configuration Properties:
            - `reducerPath` *(Required)*:
                - Sets the unique key name under which this API slice's cache state will live inside the global Redux store.
            - `baseQuery` *(Required)*:
                - Defines the base configuration for requests (like standard headers or base URLs).
                - RTK Query provides `fetchBaseQuery`, which is a lightweight wrapper around standard `fetch()`.
                - `fetchBaseQuery` will require `baseUrl` property which is basically a API base URL.
            - `endpoints` *(Required)*:
                - A callback function that defines our specific network interactions.
                - It uses `builder.query()` for reading data `(GET)` or `builder.mutation()` for altering data `(POST/PUT/DELETE)`.
            - `tagTypes` *(Optional)*:
                - An array of string labels used to tag cached data for automatic cache invalidation and re-fetching.
        - Example:
            -   ```js
                // In redux/usersApiSlice.js
                import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

                // Define the API slice configuration
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
                ```
    - `Configure the Redux Store`:
        - Register the generated API slice reducer and its internal caching middleware inside our central configuration file.
        - Store Properties:
            - `[apiSlice.reducerPath]: apiSlice.reducer` *(Required)*:
                - Allocates a dedicated state slice to store our fetched API data, request statuses, and cache.
            - `middleware` *(Required for full features)*:
                - Appends the auto-generated API middleware to handle caching timelines, garbage collection, polling, and background updates.
        - Example:
            -   ```js
                // In redux/store.js
                import { configureStore } from "@reduxjs/toolkit";
                import { usersApiSlice } from "./usersApiSlice";

                // Add the generated reducer and middleware to the store
                const store = configureStore({
                    reducer: {
                        // Required: Mounts the API cache slice into Redux state
                        [usersApiSlice.reducerPath]: usersApiSlice.reducer,
                    },
                    // Required: Middleware manages caching, invalidation, and lifetimes
                    middleware: (getDefaultMiddleware) =>
                        getDefaultMiddleware().concat(usersApiSlice.middleware),
                });

                export default store;
                ```
    - `Access Auto-Generated Hook in Components`:
        - Execute the auto-generated query hook directly inside the component body, which handles fetching on mount and provides active lifecycle states.
        - Hook Properties:
            - `data`:
                - The raw, successful JSON response body returned from the server (defaults to undefined until the request resolves).
            - `isLoading`:
                - A boolean flag that turns true only during the very first request when there is no cached data available.
            - `isFetching`:
                - A boolean flag that turns true every single time a network request is currently active (including background updates).
            - `isError`:
                - A boolean flag that turns true if the network request encounters a failure status code or exception.
            - `error`:
                - The raw error payload object returned from the server, containing status codes and custom message data.
        - Example:
            -   ```jsx
                // In ApiCallWithRtkQueryComponent.jsx
                import { useFetchUsersQuery } from "./redux/usersApiSlice";
                import { Spinner } from "react-bootstrap";

                function GetApiCallWithRtkQuery() {
                    // Call the hook; returns data and reactive tracking properties automatically
                    const { data, isLoading, isError, error } = useFetchUsersQuery();

                    if (isLoading) {
                        return (
                            <div>
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                Loading...
                            </div>
                        );
                    }

                    if (isError) {
                        return (
                            <div>
                                Errors... {error?.data?.message || "Something went wrong"}
                            </div>
                        );
                    }

                    return (
                        <div>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>User Name</th>
                                        <th>User Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data?.users?.map((user, index) => (
                                            <tr key={index}>
                                                <td>{ user?.id }</td>
                                                <td>{ user?.username }</td>
                                                <td>{ user?.email }</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    );
                }

                export default GetApiCallWithRtkQuery;
                ```


## 7) POST API Call with Redux Toolkit Using RTK Query
- In RTK Query, data-modifying operations (like creating, updating, or deleting server data) are called `mutations`.
- Unlike queries that run automatically on component mount, mutations return a `trigger function` that we call manually when an event occurs (e.g., submitting a form or clicking a button).
- By pairing mutations with `Tags`, RTK Query can automatically invalidate old cache data and re-fetch active queries in the background to keep the UI perfectly synced.
- To implement a POST request with cache invalidation, we follow below steps:
    - `Create the API Slice with Mutation and Tags`:
        - Declare a tag name in tagTypes, assign it to the GET endpoint using `providesTags`, and state that the POST endpoint clears it using `invalidatesTags`.
        - Mutation Properties:
            - `builder.mutation()` *(Required)*:
                - The endpoint builder method specifically used for data-modifying requests (POST, PUT, DELETE).
            - `query` *(Required)*:
                - A function that accepts our user-defined argument payload and returns an configuration object containing the specific sub-URL route, the HTTP method (POST), and the request body.
            - `invalidatesTags` `(Optional)`:
                - An array listing the tags that should be cleared when this mutation runs successfully, telling RTK Query to immediately re-fetch any active queries using those same tags.
        - Example:
            -   ```js
                // In redux/usersApiSlice.js
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
                ```
    - `Configure the Redux Store`:
        - No changes are required here if we already registered the API slice reducer and middleware during the GET setup.
        - Example:
            -   ```js
                // In redux/store.js
                import { configureStore } from "@reduxjs/toolkit";
                import { usersApiSlice } from "./usersApiSlice";

                // Add the generated reducer and middleware to the store
                const store = configureStore({
                    reducer: {
                        // Required: Mounts the API cache slice into Redux state
                        [usersApiSlice.reducerPath]: usersApiSlice.reducer,
                    },
                    // Required: Middleware manages caching, invalidation, and lifetimes
                    middleware: (getDefaultMiddleware) =>
                        getDefaultMiddleware().concat(usersApiSlice.middleware),
                });

                export default store;
                ```
    - `Execute the Trigger Function in Components`:
        - Destructure the tuple array returned by the mutation hook to get the manual trigger function and its active lifecycle states.
        - Mutation Hook Return Properties:
            - `[triggerFunction, mutationStatusObject]`:
                - The hook returns an array.
                - The first element is the function we invoke to start the network request.
                - The second element is an object tracking the call's specific lifecycle states.
            - `isLoading`:
                - A boolean flag that turns true while the POST network request is actively in progress.
            - `.unwrap()`:
                - A built-in method appended to the trigger promise chain that bypasses the RTK wrapper, returning the raw success payload or throwing an error directly to standard JavaScript try/catch blocks.
        - Example:
            -   ```jsx
                // In PostApiCallWithRtkQueryComponent.jsx
                import { Button } from "react-bootstrap";
                import { useAddUsersMutation } from "./redux/usersApiSlice";

                function PostApiCallWithRtkQuery() {
                    // Setup the POST mutation hook
                    const [addUser, { isLoading: isPostLoading }] = useAddUsersMutation();
                    const handleCreateUser = async () => {
                        const newMockUser = {
                            username: "RaviPatel",
                            email: "ravi@patel.com"
                        };

                        try {
                            // Trigger the API call and unwrap the raw promise response
                            const response = await addUser(newMockUser).unwrap();
                            alert(`User added successfully with ID: ${response.id}`);
                        } catch (error) {
                            console.error("Failed to add user:", error);
                            alert("Failed to create user.");
                        }
                    }
                    return (
                        <div>
                            <div className="pb-3">
                                <h6>Mock data to submit with API request</h6>
                                <code>
                                    {
                                        `newMockUser = {
                                            username: "RaviPatel",
                                            email: "ravi@patel.com"
                                        }`
                                    }
                                </code>
                            </div>
                            {/* Trigger the mutation on button click */}
                            <Button
                                variant="primary" 
                                className="mb-3" 
                                onClick={ handleCreateUser } 
                                disabled={ isPostLoading }
                            >
                                { isPostLoading ? "Creating..." : "Add New User" }
                            </Button>
                        </div>
                    );
                }

                export default PostApiCallWithRtkQuery;
                ```


## 8) Redux and Redux-Toolkit Middleware
- A `Redux middleware` provides a third-party extension point between the moment an action is dispatched and the moment it reaches the reducer.
- It is primarily used to handle side effects - such as asynchronous API calls, logging, crash reporting, and routing.
- Core Concepts of Middleware:
    - `The Pipeline`:
        - When we run `dispatch(action)`, the action travels through a pipeline of configured middlewares sequentially before finally hitting the reducer to update the state.
    - `The Signature`:
        - Every standard Redux middleware follows a specific `curried function` structure representing `(store) => (next) => (action) => { ... }`.
            - `store`:
                - Provides access to `getState()` and `dispatch()`.
            - `next`:
                - The function used to pass the action down to the next middleware in the pipeline (or to the reducer if it is the last one).
            - `action`:
                - The plain JavaScript object representing the event being dispatched.
    - `Built-in Defaults`:
        - `Vanilla Redux` comes with zero middlewares out of the box.
        - `Redux Toolkit (RTK)` automatically configures a robust set of default middlewares, including `redux-thunk` (for handling async actions) and development-only checks for immutability and serializability.
- Creating a Custom Middleware:
    - If we want to intercept actions to run custom logic globally - like logging actions, tracking analytics, or catching specific errors, we can write our own middleware.
    - To implement Custom Middleware, we can follow below steps:
        - `Define the Custom Middleware Function`:
            - Write a `curried function` that intercepts actions, inspects their type or payload, runs custom code, and then forwards the action using `next(action)`.
            - Example:
                -   ```js
                    // In middleware/customLoggerMiddleware.js

                    // Custom middleware structure: store -> next -> action
                    const customLoggerMiddleware = (store) => (next) => (action) => {

                        // Log only for Counter actions
                        if (!action.type?.startsWith("counter/")) {
                            return next(action);
                        }

                        console.log("1. Action Intercepted", action.type);
                        console.log("2. State Before Update", store.getState());

                        // Execute the next middleware or send the action to the reducer
                        const result = next(action);

                        console.log("3. State After Update:", store.getState());

                        // Return the result of the next function execution
                        return result;
                    }

                    export default customLoggerMiddleware;
                    ```
        - `Configure the Redux Store with Middleware`:
            - Register the custom middleware array inside our central configuration file using the `middleware` property in `configureStore`.
            - Store Properties:
                - `middleware` *(Optional but highly recommended)*:
                    - A callback function that takes getDefaultMiddleware as its argument and returns an array of middlewares.
                - `getDefaultMiddleware()`:
                    - Retrieves RTK's built-in default middlewares.
                    - We use `.concat()` or `.prepend()` to safely inject custom items without overwriting defaults like Thunk.
            - Example:
                -   ```js
                    // In reduc/store.js
                    import customLoggerMiddleware from "./middleware/customLoggerMiddleware";
                    const store = configureStore({
                        ... // other required code
                        middleware: (getDefaultMiddleware) => {
                            return getDefaultMiddleware().concat(usersApiSlice.middleware, customLoggerMiddleware);
                        },
                    });
                    ```