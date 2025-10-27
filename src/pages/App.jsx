import React, { useState } from "react";
import LockScreen from "../components/LockScreen";
import NoteEditor from "../components/NoteEditor";
import NoteList from "../components/NoteList";
import { loadAllNotes } from "../lib/notesService";

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [pass, setPass] = useState("");
  const [notes, setNotes] = useState([]);

  const handleUnlock = (p, n) => {
    setPass(p);
    setNotes(n);
    setUnlocked(true);
  };

  const handleSaved = async () => {
    const n = await loadAllNotes(pass);
    setNotes(n);
  };

  const handleDelete = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  if (!unlocked) return <LockScreen onUnlock={handleUnlock} />;

  return (
    <div className="app">
      <h1>🧠 Privacy Notes</h1>
      <NoteEditor currentPass={pass} onSaved={handleSaved} />
      <NoteList notes={notes} onDelete={handleDelete} onSelect={() => {}} />
    </div>
  );
}
