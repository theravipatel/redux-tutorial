import { useState } from "react";
import { useCreateNoteMutation } from "../redux/notesApiSlice";

function CreateNote() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // Use the useCreateNoteMutation hook to get the createNote function
    const [createNote, { isLoading, isError, isSuccess }] = useCreateNoteMutation();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content) {
            alert("Please fill in all fields.");
            return;
        }
        // Here you can handle the form submission, e.g., send the data to an API or update the state
        const response = await createNote({ title, content });
        console.log(response);

        // Reset the form fields
        setTitle("");
        setContent("");
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h4>Create Note</h4>
                </div>
            </div>
            {isError && <div className="alert alert-danger">Error creating note.</div>}
            {isSuccess && <div className="alert alert-success">Note created successfully.</div>}
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                placeholder="Enter title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Content</label>
                            <textarea
                                className="form-control"
                                id="content"
                                rows="3"
                                placeholder="Enter content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                disabled={isLoading}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary mt-2"
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating..." : "Create Note"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateNote;