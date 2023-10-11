import React, {useState} from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "6d52565dc787a4b608c7d1562fd",
          "user": "6524e4b14e53a1680f4352c8",
          "title": "My title",
          "description": "complete backend today",
          "tag": "work",
          "date": "2023-10-10T14:55:24.462Z",
          "__v": 0
        },
        {
          "_id": "652aa565dc787a4b608c71562fa",
          "user": "6524e4b14e53a1680f4352c8",
          "title": "My title",
          "description": "complete backend today",
          "tag": "work",
          "date": "2023-10-10T14:55:24.462Z",
          "__v": 0
        },
        {
          "_id": "652d5s65dc787a4dab608c715f62f",
          "user": "6524e4b14e53a1680f4352c8",
          "title": "My title",
          "description": "complete backend today",
          "tag": "work",
          "date": "2023-10-10T14:55:24.462Z",
          "__v": 0
        },
        {
          "_id": "65a2565dc7s87a4bd608c71562f",
          "user": "6524e4b14e53a1680f4352c8",
          "title": "My title",
          "description": "complete backend today",
          "tag": "work",
          "date": "2023-10-10T14:55:24.462Z",
          "__v": 0
        },
        {
          "_id": "652565dc7s87a4b6g08c7d1562f",
          "user": "6524e4b14e53a1680f4352c8",
          "title": "My title",
          "description": "complete backend today",
          "tag": "work",
          "date": "2023-10-10T14:55:24.462Z",
          "__v": 0
        },
        {
          "_id": "6525s65dc7d87a4b608dc71562f",
          "user": "6524e4b14e53a1680f4352c8",
          "title": "My title",
          "description": "complete backend today",
          "tag": "work",
          "date": "2023-10-10T14:55:24.462Z",
          "__v": 0
        },
        {
          "_id": "652s6389f7a248fdbfbc48f24fd",
          "user": "6524e4b14e53a1680f4352c8",
          "title": "Daily Goal",
          "description": "complete till video 67 today",
          "tag": "work",
          "date": "2023-10-11T05:54:39.876Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial)

      // Add a note
      const addNote = (title, description , tag)=>{
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
      const editNote = ()=>{

      }

      // Delete a note
      const deleteNote = (id)=>{
        const newNotes = notes.filter((note)=> {return note._id !== id})
        setNotes(newNotes);
      }

    return(
        <NoteContext.Provider value={{notes, addNote, editNote, deleteNote}} >
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;