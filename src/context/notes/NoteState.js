import React, {useState} from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "652565dc787a4b608c71562f",
          "user": "6524e4b14e53a1680f4352c8",
          "title": "My title",
          "description": "complete backend today",
          "tag": "work",
          "date": "2023-10-10T14:55:24.462Z",
          "__v": 0
        },
        {
          "_id": "652565dc787a4b608c71562f",
          "user": "6524e4b14e53a1680f4352c8",
          "title": "My title",
          "description": "complete backend today",
          "tag": "work",
          "date": "2023-10-10T14:55:24.462Z",
          "__v": 0
        },
        {
          "_id": "652565dc787a4b608c71562f",
          "user": "6524e4b14e53a1680f4352c8",
          "title": "My title",
          "description": "complete backend today",
          "tag": "work",
          "date": "2023-10-10T14:55:24.462Z",
          "__v": 0
        },
        {
          "_id": "652565dc787a4b608c71562f",
          "user": "6524e4b14e53a1680f4352c8",
          "title": "My title",
          "description": "complete backend today",
          "tag": "work",
          "date": "2023-10-10T14:55:24.462Z",
          "__v": 0
        },
        {
          "_id": "652565dc787a4b608c71562f",
          "user": "6524e4b14e53a1680f4352c8",
          "title": "My title",
          "description": "complete backend today",
          "tag": "work",
          "date": "2023-10-10T14:55:24.462Z",
          "__v": 0
        },
        {
          "_id": "652565dc787a4b608c71562f",
          "user": "6524e4b14e53a1680f4352c8",
          "title": "My title",
          "description": "complete backend today",
          "tag": "work",
          "date": "2023-10-10T14:55:24.462Z",
          "__v": 0
        },
        {
          "_id": "6526389f7a248bfbc48f24fd",
          "user": "6524e4b14e53a1680f4352c8",
          "title": "Daily Goal",
          "description": "complete till video 67 today",
          "tag": "work",
          "date": "2023-10-11T05:54:39.876Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial)

    return(
        <NoteContext.Provider value={{notes, setNotes}} >
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;