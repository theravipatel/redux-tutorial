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