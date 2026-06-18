# NoteSync 📝✨

NoteSync is a modern, premium MERN-stack (MongoDB, Express, React, Node.js) web application designed for students and professionals to capture, organize, and manage their daily thoughts and tasks.

Designed with a stunning **glassmorphism** UI, it provides a seamless and distraction-free workspace.

## 🚀 Features

- **User Authentication:** Secure JWT-based Login and Registration.
- **Premium UI/UX:** A beautiful Apple-style responsive interface using Tailwind CSS and modern design tokens (gradients, blurs, interactive hovers).
- **CRUD Operations:** Create, read, update, and delete notes instantly.
- **Pin Notes:** Pin important notes to the top of your workspace.
- **Color Coding:** Visually organize notes using a built-in color picker (pastel colors).
- **Instant Search:** Find your notes quickly using the real-time search bar in the navigation.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop screens with dynamic grid layouts.

## 🛠️ Tech Stack

### Frontend
- **React.js** (v18)
- **Tailwind CSS** (v3) for styling and responsive design
- **Axios** for API requests
- **React Router Dom** for navigation
- **React Icons** for UI iconography
- **React Toastify** for toast notifications

### Backend
- **Node.js & Express.js** for the REST API
- **MongoDB & Mongoose** for the database schema and models
- **JSON Web Tokens (JWT)** for secure authentication
- **Bcrypt** for password hashing
- **Cors** for cross-origin resource sharing

## 📂 Project Structure

```text


├── frontend/          # React Frontend application
│   ├── src/
│   │   ├── components/  # Reusable UI components (Navbar, NoteCard, NoteModal)
│   │   ├── context/     # React Context for state management
│   │   ├── pages/       # Application routes (Home, Login, Signup)
│   │   └── ...
│   └── package.json
│
└── server/            # Node.js/Express Backend application
    ├── models/          # MongoDB Schemas (User.js, Note.js)
    ├── routes/          # Express Routes (auth.js, note.js)
    ├── middleware/      # JWT verification middleware
    ├── index.js         # Entry point of the server
    └── package.json
```

## ⚙️ Installation & Setup

To run this project locally on your machine, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or local MongoDB server

### 1. Setup the Backend
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory and add your credentials:
```env
MONGO_URI=your_mongodb_connection_string
JWT_KEY=your_secret_key
PORT=5000
```
Start the backend server:
```bash
npm start
# Server will run on http://localhost:5000
```

### 2. Setup the Frontend
Open a new terminal tab and navigate to the frontend directory:
```bash
cd frontend
npm install
```
Start the frontend development server:
```bash
npm run dev
# Frontend will run on http://localhost:5173
```

## 🎨 Design Philosophy
The design language of NoteSync focuses on **Human-Friendly Aesthetics**. We moved away from industrial, flat designs to incorporate **glassmorphism**, soft dynamic gradients (`indigo-50` to `cyan-50`), and smooth micro-animations. It is crafted to feel lightweight, premium, and welcoming for university projects and daily use.

---
*Made for students and creatives.*
