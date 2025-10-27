# 📝 Privacy-Focused Notes App

A **secure, offline-first notes app** built with **React**, **CryptoJS**, and **IndexedDB**.  
Your notes are **encrypted client-side using AES-256**, ensuring complete privacy — even offline. 🔐  

---

## 🚀 Features

- 🔒 **Client-side AES encryption** — data stays private, locally encrypted  
- 💾 **Offline storage** — saved using IndexedDB via LocalForage  
- 🔐 **Password lock screen** — decrypt only with your passphrase  
- 🧠 **Simple CRUD** — create, view, and manage encrypted notes  
- 🎨 **Modern dark UI** — responsive and built with pure CSS  

---

## 🧠 Tech Stack

**React (Vite)** • **CryptoJS (AES + PBKDF2)** • **IndexedDB** • **CSS3**

---

## ⚙️ Setup

```bash
# Clone repo
git clone https://github.com/your-username/privacy-notes.git
cd privacy-notes

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🔐 How It Works

1. Enter your passphrase on the lock screen.  
2. Notes are **encrypted with AES** before saving.  
3. Re-enter the same passphrase to **decrypt** your data.  
   - (Wrong passphrase = unreadable notes 💡)

---



## ✨ Author

**Shubham Girawale**  
🔗 [GitHub](https://github.com/ShubhamGirawale007)
