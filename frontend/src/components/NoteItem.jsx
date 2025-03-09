import React, { useState, useContext } from "react";
import NoteContext from "../context/Notes/NoteContext";

function NoteItem({ note }) {
  const { deleteNote, editNote } = useContext(NoteContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({
    title: note.title,
    description: note.description,
    tag: note.tag || ""
  });
  const [loading, setLoading] = useState(false);

  // Handle input changes for editing
  const handleChange = (e) => {
    setEditedNote({ ...editedNote, [e.target.name]: e.target.value });
  };

  // Handle form submission for editing
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await editNote(
        note._id, 
        editedNote.title, 
        editedNote.description, 
        editedNote.tag
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating note:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete with confirmation
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      await deleteNote(note._id);
    }
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card h-100">
        <div className="card-body">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor={`title-${note._id}`} className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id={`title-${note._id}`}
                  name="title"
                  value={editedNote.title}
                  onChange={handleChange}
                  required
                  minLength={3}
                />
              </div>
              <div className="mb-3">
                <label htmlFor={`description-${note._id}`} className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id={`description-${note._id}`}
                  name="description"
                  rows="3"
                  value={editedNote.description}
                  onChange={handleChange}
                  required
                  minLength={5}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor={`tag-${note._id}`} className="form-label">Tag</label>
                <input
                  type="text"
                  className="form-control"
                  id={`tag-${note._id}`}
                  name="tag"
                  value={editedNote.tag}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex justify-content-between">
                <button 
                  type="submit" 
                  className="btn btn-success btn-sm"
                  disabled={loading || editedNote.title.length < 3 || editedNote.description.length < 5}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary btn-sm"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="card-title mb-0">{note.title}</h5>
                <span className="badge bg-primary">{note.tag || "General"}</span>
              </div>
              <p className="card-text">{note.description}</p>
              <p className="card-text">
                <small className="text-muted">
                  {new Date(note.date).toLocaleString()}
                </small>
              </p>
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NoteItem;