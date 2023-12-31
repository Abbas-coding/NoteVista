import React, { useEffect, useState , useRef} from "react";
import NoteContext from "../context/notes/NoteContext";
import { useContext } from "react";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import {useNavigate} from 'react-router-dom'

const Notes = (props) => {
    const context = useContext(NoteContext)
    const {notes, getNotes, editNote} = context;
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag : ""})
    const ref = useRef(null)
    const refClose = useRef(null)
    const history = useNavigate();

    useEffect(() => {
      if(localStorage.getItem('token') !== null){
        getNotes()
      }
      else{
        history("/login")
      }
      // eslint-disable-next-line
    }, [])
    
    const updateNote = (currentNote)=>{
      ref.current.click();
      setNote({
        id: currentNote._id,
        etitle : currentNote.title,
        edescription : currentNote.description,
        etag : currentNote.tag
      })
    }


    const handleUpdClick = (e)=>{
      editNote(note.id, note.etitle, note.edescription, note.etag)
      refClose.current.click();
      props.showAlert('Updated Successfully', 'success')
  }

  const onChange = (e)=>{
      setNote({...note, [e.target.name] : e.target.value })
  }
    

  return (
    <>
    <AddNote showAlert={props.showAlert} />
    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <form className="my-3">
          <div className="mb-3">
            <label htmlFor="etitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              name='etitle'
              id="etitle"
              aria-describedby="emailHelp"
              value={note.etitle}
              onChange={onChange}
              minLength={3}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="edescription" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              name='edescription'
              id="edescription"
              value={note.edescription}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="etag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              name='etag'
              id="etag"
              value={note.etag}
              onChange={onChange}
              minLength={3}
            />
          </div>
        </form>
          </div>
          <div className="modal-footer">
            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button disabled={note.etitle.length < 3 || note.edescription.length < 5} onClick={handleUpdClick} type="button" className="btn btn-primary">Update Note</button>
          </div>
        </div>
      </div>
    </div>

    <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container mx-2">
        {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
            return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
        })}
    </div>
    </>
  );
};

export default Notes;
