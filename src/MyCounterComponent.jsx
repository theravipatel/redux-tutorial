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