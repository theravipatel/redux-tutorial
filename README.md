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