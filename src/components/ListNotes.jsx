import { useDeleteNoteMutation, useListNotesQuery } from "../redux/notesApiSlice";

function ListNotes() {
    const { data: notes = [], error, isLoading } = useListNotesQuery();
    const [deleteNote, { isLoading: isDeleting }] = useDeleteNoteMutation();

    const handleDelete = async (noteId) => {
        await deleteNote(noteId);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h4>List Notes</h4>
                </div>
            </div>
            {isLoading && <p>Loading notes...</p>}
            {error && <p className="text-danger">Unable to load notes.</p>}
            {!isLoading && !error && (
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Content</th>
                                    <th width="150">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {notes.map((note) => (
                                    <tr key={note.id}>
                                        <td>{note.title}</td>
                                        <td>{note.content}</td>
                                        <td>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(note.id)}
                                                disabled={isDeleting}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListNotes;