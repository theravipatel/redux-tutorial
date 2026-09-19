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