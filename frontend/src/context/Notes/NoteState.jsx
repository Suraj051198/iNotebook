import React, { useState, useEffect } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5001";
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get all notes
  const getNotes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      
      const data = await response.json();
      if (response.ok) {
        setNotes(data);
      } else {
        console.error("Failed to fetch notes:", data);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to add a new note
  const addNote = async (title, description, tag) => {
    try {
      setLoading(true);
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });
      
      const data = await response.json();
      if (response.ok) {
        setNotes([...notes, data]);
      } else {
        console.error("Failed to add note:", data);
      }
    } catch (error) {
      console.error("Error adding note:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a note
  const deleteNote = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      
      const data = await response.json();
      if (response.ok) {
        setNotes(notes.filter((note) => note._id !== id));
      } else {
        console.error("Failed to delete note:", data);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to edit a note
  const editNote = async (id, title, description, tag) => {
    try {
      setLoading(true);
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });
      
      const data = await response.json();
      if (response.ok) {
        // Update the notes state
        const updatedNotes = notes.map((note) =>
          note._id === id ? { ...note, title, description, tag } : note
        );
        setNotes(updatedNotes);
      } else {
        console.error("Failed to update note:", data);
      }
    } catch (error) {
      console.error("Error updating note:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load notes when component mounts
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    }
  }, []);

  return (
    <NoteContext.Provider value={{ notes, loading, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;