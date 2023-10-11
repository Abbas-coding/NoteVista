import React from "react";
import NoteContext from "../context/notes/NoteContext";
import { useContext } from "react";
import NoteItem from "./NoteItem";

const Notes = () => {
    const context = useContext(NoteContext)
    const {notes, setNotes} = context;
  return (
    <div>
      <div className="row my-3">
        <h1>Your Notes</h1>
        {notes.map((note) => {
          return <NoteItem note={note} />
        })}
      </div>
    </div>
  );
};

export default Notes;
