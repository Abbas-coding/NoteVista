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
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyNGU0YjE0ZTUzYTE2ODBmNDM1MmM4In0sImlhdCI6MTY5Njk0NzkwOX0.RjQi9Iccz46HGJBcTOreKABCnPHwdbPP7gfGewuIJOc"
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
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyNGU0YjE0ZTUzYTE2ODBmNDM1MmM4In0sImlhdCI6MTY5Njk0NzkwOX0.RjQi9Iccz46HGJBcTOreKABCnPHwdbPP7gfGewuIJOc"
          },
          body: JSON.stringify({title, description, tag}), 
        });
        const json = await response.json()
        console.log(json)

        //
        console.log("Adding a new note")
        let note = {
          "_id": "652s6389f7a248fdbfbc48f24wfd",
          "user": "6524e4b14e53a1680f435w2c8",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2023-10-11T05:54:39.876Z",
          "__v": 0
        };
        setNotes(notes.concat(note))
      }

      // Edit a note
      const editNote = async (id, title, description, tag)=>{
        // API call to Update a note in data base
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyNGU0YjE0ZTUzYTE2ODBmNDM1MmM4In0sImlhdCI6MTY5Njk0NzkwOX0.RjQi9Iccz46HGJBcTOreKABCnPHwdbPP7gfGewuIJOc"
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
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyNGU0YjE0ZTUzYTE2ODBmNDM1MmM4In0sImlhdCI6MTY5Njk0NzkwOX0.RjQi9Iccz46HGJBcTOreKABCnPHwdbPP7gfGewuIJOc"
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