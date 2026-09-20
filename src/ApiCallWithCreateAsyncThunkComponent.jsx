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