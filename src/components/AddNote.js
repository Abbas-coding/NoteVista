import React from 'react'
import NoteContext from "../context/notes/NoteContext";
import { useContext, useState } from "react";

const AddNote = (props) => {
    const context = useContext(NoteContext)
    const { addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag : ""})

    const handleAddClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag : ""})
        props.showAlert('Added Successfully', 'success')
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
              value={note.title}
              onChange={onChange}
              minLength={3}
              required
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
              value={note.description}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              name='tag'
              id="tag"
              value={note.tag}
              onChange={onChange}
              minLength={3}
            />
          </div>

          <button type="submit" disabled={note.title.length < 3 || note.description.length < 5} className="btn btn-primary" onClick={handleAddClick}>
            Add Note
          </button>
        </form>
        </div>
  )
}

export default AddNote
