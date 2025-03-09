import React, { useContext } from "react";
import NoteContext from "../context/Notes/NoteContext";
import NoteItem from "./NoteItem";

function Notes() {
  const { notes } = useContext(NoteContext);

  return (
    <div className="row my-3">
      <h2>Your Notes</h2>
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}
    </div>
  );
}

export default Notes;