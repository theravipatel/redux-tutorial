import { Spinner } from "react-bootstrap";
import { useFetchUsersQuery } from "./redux/usersApiSlice";

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

export default GetApiCallWithRtkQuery;