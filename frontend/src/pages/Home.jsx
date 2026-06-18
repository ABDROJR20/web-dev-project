import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import NoteModal from '../components/NoteModal'
import NoteCard from '../components/NoteCard'
import axios from 'axios'
import { useAuth } from '../context/ContextProvider'
import { toast } from 'react-toastify'
import { API_BASE_URL } from '../constants/Constants'
import { FaTwitter, FaGithub, FaLinkedin, FaInstagram, FaHeart, FaBookOpen, FaRegSmile, FaLightbulb } from 'react-icons/fa'

const Home = () => {
  const [isModelOpen, setModelOpen] = useState(false)
  const [filteredNotes, setFilterNote] = useState([]) //save the filtered notes
  const [notes, setNotes] = useState([])
  const { user } = useAuth()
  const navigate = useNavigate()
  const [currentNote, setCurrentNote] = useState(null)
  const [query, setQuery] = useState('') //search query

  // // Redirect if not logged in
  // useEffect(() => {
  //   if (!user) {
  //     navigate('/login')
  //   }
  // }, [user, navigate])

  //use effect for query search
  useEffect(() => {
    setFilterNote(
      notes.filter((note) => 
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, notes])

  // Extracted fetchNotes so we can reuse it
  const fetchNotes = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}note`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      setNotes(data.notes)
    } catch (error) {
      console.log(error)
    }
  }

  //  Fetch notes on component mount if user exists
  useEffect(() => {
    if (user) {
      fetchNotes()
    }
  }, [user])

  const closeModel = () => {
    setModelOpen(false)
    setCurrentNote(null)
  }

  const onEdit = (note) => {
    setCurrentNote(note)
    setModelOpen(true)
  }

  //add note fucntion
  const addNote = async (title, description, isPinned, color) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}note/add`,
        { title, description, isPinned, color },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      if (response.data.success) {
        closeModel()
        fetchNotes() //  Reuse function here
      }
    } catch (error) {
      console.log(error)
    }
  }

  //edit function
  const editNote = async (id, title, description, isPinned, color) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}note/${id}`,
        { title, description, isPinned, color },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      if (response.data.success) {
         fetchNotes() //  Reuse function here
        closeModel()
        toast.success("Note Updated Succesfully")
      }
    } catch (error) {
      console.log(error)
    }
  }

  //delete function
  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      if (response.data.success) {
         fetchNotes() // ✅ Reuse function here
         toast.success("Note Deleted Succesfully")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

return (
  <div className="bg-gradient-to-br from-indigo-50/50 via-white to-cyan-50/50 min-h-screen text-slate-800 selection:bg-indigo-200 selection:text-indigo-900 font-sans antialiased flex flex-col justify-between">
    
    {/* Global Header Wrapper */}
    <div className="border-b border-gray-200/50 bg-white/60 backdrop-blur-2xl sticky top-0 z-40 px-4 sm:px-8 transition-all duration-300">
      <div className="max-w-[90rem] mx-auto">
        <Navbar setQuery={setQuery} />
      </div>
    </div>

    {/* Main Content Workspace Container */}
    <div className="max-w-[90rem] mx-auto w-full px-4 sm:px-8 flex-grow flex flex-col">
      {user ? (
        <div className="py-10">
          
          {/* Authenticated Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-2 flex items-center gap-3">
                Welcome back, {user.name.split(' ')[0]} <FaRegSmile className="text-indigo-500" />
              </h1>
              <p className="text-gray-500 font-medium">
                You have {sortedNotes.length} notes in your workspace.
              </p>
            </div>
            
            <button
              onClick={() => setModelOpen(true)}
              className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold shadow-lg shadow-gray-900/20 hover:shadow-xl transition-all duration-300 active:scale-95"
            >
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              Create New Note
            </button>
          </div>

          {/* Main Notes Grid */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-fr">
            {sortedNotes.length > 0 ? (
              sortedNotes.map(note => (
                <div 
                  key={note._id} 
                  className="group relative flex flex-col justify-between hover:-translate-y-1.5 overflow-hidden transition-all duration-300 h-full"
                >
                  <NoteCard 
                    note={note} 
                    onEdit={onEdit}
                    deleteNote={deleteNote} 
                  />
                </div>
              ))
            ) : (
              /* Premium Empty State */
              <div className="col-span-full flex flex-col items-center justify-center py-24 px-4 border-2 border-dashed border-indigo-100 rounded-[2rem] bg-white/40 text-center">
                <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mb-6 text-indigo-500 shadow-inner">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">It's quiet here...</h3>
                <p className="text-base text-gray-500 max-w-sm mb-6">Start organizing your thoughts, tasks, and ideas by creating your first note.</p>
                <button
                  onClick={() => setModelOpen(true)}
                  className="px-6 py-2.5 bg-white border-2 border-gray-200 hover:border-gray-900 text-gray-900 rounded-xl font-bold transition-all duration-300"
                >
                  Create Note
                </button>
              </div>
            )}
          </div>

          {/* Modal Overlay Layer wrapper */}
          {isModelOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn">
              <NoteModal
                closeModel={closeModel}
                addNote={addNote}
                currentNote={currentNote}
                editNote={editNote}
                deleteNote={deleteNote}
              />
            </div>
          )}
        </div>
      ) : (
        /* Stunning Landing Page for Unauthenticated Users */
        <div className="flex flex-col items-center justify-center py-20 lg:py-32 text-center px-4 flex-grow relative">
          
          {/* Decorative background blobs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-200/40 to-purple-200/40 blur-[100px] rounded-full -z-10 pointer-events-none"></div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 text-indigo-600 text-sm font-bold mb-8 shadow-sm">
            <FaLightbulb className="text-indigo-500" /> Your Second Brain
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight mb-6 max-w-4xl mx-auto leading-[1.1]">
            Capture your thoughts, <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              organize your life.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            The beautifully simple note-taking website designed to help you focus on what matters. 
            No clutter, just your ideas synced securely.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
            <Link 
              to="/register" 
              className="px-8 py-4 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl shadow-gray-900/20 hover:shadow-2xl hover:-translate-y-1 w-full sm:w-auto"
            >
              Start for free
            </Link>
            <Link 
              to="/login" 
              className="px-8 py-4 bg-white border-2 border-gray-200 hover:border-gray-900 text-gray-900 rounded-2xl font-bold text-lg transition-all duration-300 w-full sm:w-auto hover:bg-gray-50"
            >
              Log in to account
            </Link>
          </div>

          {/* Feature Grid Demo */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl text-left">
            <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-xl shadow-indigo-100/50">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-500 font-medium">Capture ideas the moment they arrive. Our interface is built for speed and efficiency.</p>
            </div>
            <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-xl shadow-purple-100/50">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Colorize & Pin</h3>
              <p className="text-gray-500 font-medium">Organize visually. Color code your notes and pin the most important ones to the top.</p>
            </div>
            <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-xl shadow-pink-100/50">
              <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-500 font-medium">Your thoughts belong to you. Everything is safely stored and only accessible by you.</p>
            </div>
          </div>

        </div>
      )}
    </div>

    {/* Human-Friendly Proper Footer */}
    <footer className="w-full bg-white border-t border-gray-100 mt-auto pt-16 pb-8 px-4 sm:px-8 z-10">
      <div className="max-w-[90rem] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 mb-12 text-center md:text-left">
          
          {/* Brand & Description */}
          <div className="max-w-sm">
            <Link to="/" className="text-2xl font-black tracking-tighter flex items-center justify-center md:justify-start gap-2 mb-4 hover:opacity-80 transition-opacity text-gray-900">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-2 rounded-xl shadow-sm">
                <FaBookOpen className="text-xl" />
              </div>
              Note<span className="text-indigo-600">Sync</span>
            </Link>
            <p className="text-gray-500 leading-relaxed font-medium">
              Your friendly space to jot down ideas, plan your university projects, and organize your daily life without any distractions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex gap-12 sm:gap-20">
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-gray-900 mb-2">Platform</h4>
              <Link to="/" className="text-gray-500 hover:text-indigo-600 font-medium transition-colors">Home</Link>
              <Link to="/login" className="text-gray-500 hover:text-indigo-600 font-medium transition-colors">Log in</Link>
              <Link to="/register" className="text-gray-500 hover:text-indigo-600 font-medium transition-colors">Sign up</Link>
            </div>
          </div>
        </div>

        {/* Bottom Socials & Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-gray-100 gap-6">
          <div className="text-gray-500 font-medium flex flex-col sm:flex-row items-center gap-3 text-sm text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} NoteSync Inc. All rights reserved.</span>
          
          </div>
          
          <div className="flex items-center gap-6 text-gray-400">
            <a href="#" className="hover:text-indigo-600 hover:-translate-y-1 transition-all duration-300"><FaTwitter className="text-2xl" /></a>
            <a href="#" className="hover:text-gray-900 hover:-translate-y-1 transition-all duration-300"><FaGithub className="text-2xl" /></a>
            <a href="#" className="hover:text-indigo-600 hover:-translate-y-1 transition-all duration-300"><FaLinkedin className="text-2xl" /></a>
            <a href="#" className="hover:text-rose-600 hover:-translate-y-1 transition-all duration-300"><FaInstagram className="text-2xl" /></a>
          </div>
        </div>
      </div>
    </footer>

  </div>
)
}

export default Home