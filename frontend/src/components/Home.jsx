import React, { useContext } from "react";
import NoteContext from "../context/Notes/NoteContext";
import Notes from "./Notes";
import Addnote from "./Addnote";

function Home() {
  const { notes, loading } = useContext(NoteContext);

  return (
    <div className="container my-3">
      <Addnote />
      
      <div className="row my-3">

        {loading ? (
          <div className="text-center my-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : notes.length === 0 ? (
          <div className="alert alert-info my-3">No notes to display. Add your first note!</div>
        ) : (
          <Notes />
        )}
      </div>
    </div>
  );
}

export default Home;