import React, { useState, useContext } from "react";
import NoteContext from "../context/Notes/NoteContext";

const Addnote = () => {
  const { addNote } = useContext(NoteContext);
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: ""
  });
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await addNote(note.title, note.description, note.tag);
      setNote({ title: "", description: "", tag: "" });
    } catch (error) {
      console.error("Error adding note:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-3 mb-4">
      <h2 className="card-title mb-3">Add a New Note</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            onChange={handleChange}
            placeholder="Enter note title"
            required
            minLength={3}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            value={note.description}
            onChange={handleChange}
            placeholder="Enter note description"
            required
            minLength={5}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={handleChange}
            placeholder="Enter note tag (optional)"
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading || note.title.length < 3 || note.description.length < 5}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Adding...
            </>
          ) : (
            "Add Note"
          )}
        </button>
      </form>
    </div>
  );
};

export default Addnote;