import React, {useState} from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{
    const host = "http://localhost:5000"
    const notesInitial = []
      const [notes, setNotes] = useState(notesInitial)

      // Get all notes
      const getNotes = async ()=>{
        // API call to fetch notes
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: "GET", 
          headers: {
            "auth-token": localStorage.getItem('token')
          } 
        });
        const json = await response.json()
        setNotes(json)
      }
      // Add a note
      const addNote = async (title, description , tag)=>{
        // API call to Add a note
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag}), 
        });
        const note = await response.json()
        setNotes(notes.concat(note))
      }

      // Edit a note
      const editNote = async (id, title, description, tag)=>{
        // API call to Update a note in data base
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag}), 
        });
        const json = await response.json()
        console.log(json)

        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to update a note
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if (element._id === id){
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
        }
        setNotes(newNotes)

      }

      // Delete a note
      const deleteNote = async (id)=>{
        // API call to Delete a note in data base
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE", 
          headers: {
            "auth-token": localStorage.getItem('token')
          }
        });
        const json = await response.json()
        console.log(json)
        const newNotes = notes.filter((note)=> {return note._id !== id})
        setNotes(newNotes);
      }

    return(
        <NoteContext.Provider value={{notes, addNote, editNote, deleteNote, getNotes}} >
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;