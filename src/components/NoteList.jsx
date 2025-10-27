import React from "react";
import { deleteNoteById } from "../lib/notesService";

export default function NoteList({ notes, onDelete, onSelect }) {
  return (
    <div className="note-list" 
    style={{
       backgroundColor:"#b255558f",
       color:"black"
    }}
    >
      {notes.map(n => (
        <div key={n.id} className={`note ${n.meta?.pinned ? "pinned" : ""}`}>
          <h3 onClick={() => onSelect(n)}>{n.title}</h3>
          <p>{n.body.slice(0, 100)}...</p>
          <button onClick={() => { deleteNoteById(n.id); onDelete(n.id); }}>Delete</button>
        </div>
      ))}
    </div>
  );
}
