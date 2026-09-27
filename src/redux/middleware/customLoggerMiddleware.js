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