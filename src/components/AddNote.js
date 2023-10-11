import React from 'react'
import NoteContext from "../context/notes/NoteContext";
import { useContext, useState } from "react";

const AddNote = () => {
    const context = useContext(NoteContext)
    const { addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag : ""})

    const handleAddClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name] : e.target.value })
    }

  return (
      <div className="container my-3">
        <h1>Add a Note</h1>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              name='title'
              id="title"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              name='description'
              id="description"
              onChange={onChange}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleAddClick}>
            Add Note
          </button>
        </form>
        </div>
  )
}

export default AddNote
