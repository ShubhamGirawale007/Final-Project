import React, { useState } from "react";
import { loadAllNotes } from "../lib/notesService";
import './LockScreen.css';

export default function LockScreen({ onUnlock }) {
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const unlock = async () => {
    try {
      const notes = await loadAllNotes(pass);
      onUnlock(pass, notes);
    } catch {
      setError("Wrong passphrase or no notes found.");
    }
  };

  return (
    <div className="lock-screen" style={{backgroundColor:"#23121548"}}>
      <h2 style={{color:"#ffffffff"}}>🔒 Enter Passphrase</h2>
      <input
  value={pass}
  onChange={e => setPass(e.target.value)}
  placeholder="Enter password"
  style={{
    width: "100%",
    padding: "12px 14px",
    marginBottom: "15px",
    border: "1px solid #334155",
    borderRadius: "8px",
    backgroundColor: "#8c76ddff",
    color: "#0e0d0eff",
    fontSize: "1rem",
    outline: "none",
    fontWeight:"700"
  }}
/>

      <button onClick={unlock}>Unlock</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
