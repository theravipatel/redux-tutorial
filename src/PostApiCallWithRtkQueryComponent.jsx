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