// src/lib/crypto.js
import CryptoJS from "crypto-js";

// Derive AES key using PBKDF2
export function deriveKey(passphrase) {
  if (!passphrase) throw new Error("Passphrase is missing!");
  return CryptoJS.PBKDF2(passphrase, CryptoJS.enc.Utf8.parse("notes-salt"), {
    keySize: 256 / 32,
    iterations: 1000,
  });
}

// Encrypt a note object -> returns a JSON string
export function encryptNoteObject(noteObj, key) {
  if (!noteObj) throw new Error("Missing note object");
  if (!key) throw new Error("Missing key in encryptNoteObject");

  const json = JSON.stringify(noteObj);
  const iv = CryptoJS.lib.WordArray.random(16);

  const encrypted = CryptoJS.AES.encrypt(json, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return JSON.stringify({
    iv: CryptoJS.enc.Hex.stringify(iv),
    data: encrypted.toString(), // Base64 encoded
  });
}

// Decrypt note JSON string
export function decryptNoteObject(cipherJson, key) {
  if (!cipherJson) throw new Error("Missing cipher data");
  if (!key) throw new Error("Missing key in decryptNoteObject");

  try {
    const { iv, data } = JSON.parse(cipherJson);

    const decrypted = CryptoJS.AES.decrypt(data, key, {
      iv: CryptoJS.enc.Hex.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const plainText = decrypted.toString(CryptoJS.enc.Utf8);
    if (!plainText) throw new Error("Invalid passphrase or corrupted data");

    return JSON.parse(plainText);
  } catch (e) {
    console.error("❌ Decryption error:", e.message);
    throw new Error("Malformed or corrupted encrypted data");
  }
}
