import React, { useState } from "react";
import { saveNote } from "../lib/notesService";

export default function NoteEditor({ currentPass, onSaved, initial }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [body, setBody] = useState(initial?.body || "");
  const [pinned, setPinned] = useState(initial?.pinned || false);

  const handleSave = async () => {
    const plain = { id: initial?.id, title, body, pinned, archived: false };
    const saved = await saveNote(plain, currentPass);
    onSaved(saved);
  };

  return (
    <div className="editor" 
    style={{
       backgroundColor:"#b255558f"
    }}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Note title" 
      style={{
    width: "100%",
    padding: "12px 14px",
    marginBottom: "15px",
    border: "1px solid #334155",
    borderRadius: "8px",
    backgroundColor: "#472bb0ae",
    color: "#0e0d0eff",
    fontSize: "1rem",
    outline: "none",
  }} />
      <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Write your note..." />
      <label
      style={{
        color:"black",
        fontSize:"17px",
        marginRight:"5px"
      }}
      >
        <input type="checkbox" checked={pinned} onChange={e => setPinned(e.target.checked)}
        style={{
          padding:"15px"
        }}
        /> Pin
      </label>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
