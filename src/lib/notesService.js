import { deriveKey, encryptNoteObject, decryptNoteObject } from "./crypto";
import * as idb from "./idb";
import { v4 as uuidv4 } from "uuid";

export async function saveNote(plainNote, passphrase) {
  console.log("🔹 Saving note:", plainNote);
  const key = deriveKey(passphrase);
  const payload = { ...plainNote, updatedAt: Date.now() };
  const ciphertext = encryptNoteObject(payload, key);
  const record = {
    id: plainNote.id || crypto.randomUUID(),
    ciphertext,
    updatedAt: payload.updatedAt,
    pinned: !!plainNote.pinned,
    archived: !!plainNote.archived,
  };
  await idb.putNote(record);
  console.log("✅ Note saved to IndexedDB:", record);
  return record;
}


export async function loadAllNotes(passphrase) {
  const key = deriveKey(passphrase);
  const records = await idb.getAllNotes();
  const decrypted = [];
  for (const rec of records) {
    const obj = decryptNoteObject(rec.ciphertext, key);
    decrypted.push({ id: rec.id, ...obj, meta: { pinned: rec.pinned, archived: rec.archived } });
  }
  return decrypted;
}

export async function deleteNoteById(id) {
  await idb.deleteNote(id);
}
