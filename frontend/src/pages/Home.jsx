import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import NoteModal from '../components/NoteModal'
import NoteCard from '../components/NoteCard'
import axios from 'axios'
import { useAuth } from '../context/ContextProvider'
import { toast } from 'react-toastify'
import { API_BASE_URL } from '../constants/Constants'

const Home = () => {
  const [isModelOpen, setModelOpen] = useState(false)
  const [filteredNotes, setFilterNote] = useState(false) //save the filtered notes
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
  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}note/add`,
        { title, description },
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
  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}note/${id}`,
        { title, description },
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

return (
  <div className="bg-[#f9f9fb] min-h-screen text-slate-800 selection:bg-rose-200 selection:text-rose-900 font-sans antialiased flex flex-col justify-between">
    
    {/* Global Header Wrapper */}
    <div className="border-b border-slate-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 shadow-sm transition-all duration-300">
      <Navbar setQuery={setQuery} />
    </div>

    {/* Main Content Workspace Container */}
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 pt-8 pb-16 flex-grow flex flex-col justify-center">
      {user ? (
        <>
          {/* Main Notes Grid with Responsive Heights & Layout */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
            {filteredNotes.length > 0 ? (
              filteredNotes.map(note => (
                <div 
                  key={note._id} 
                  className="group relative bg-white rounded-xl border border-slate-200/70 p-6 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.1)] hover:border-rose-500/30 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 overflow-hidden"
                >
                  {/* Subtle decorative top-accent on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-rose-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  
                  <NoteCard 
                    note={note} 
                    onEdit={onEdit}
                    deleteNote={deleteNote} 
                  />
                </div>
              ))
            ) : (
              /* Upgraded Empty State Graphic Concept */
              <div className="col-span-full flex flex-col items-center justify-center py-20 px-4 border-2 border-dashed border-slate-200 rounded-2xl bg-white/50 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-1">Your canvas is blank</h3>
                <p className="text-sm text-slate-500 max-w-sm">Capture your system workflows, architectural maps, or daily thoughts. Click the action button below to start.</p>
              </div>
            )}
          </div>

          {/* Active Workspace Footer Info block */}
          <div className="mt-16 border-t border-slate-200/60 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-4">
              <span>Total Records: <strong className="text-slate-600 font-semibold">{filteredNotes.length}</strong></span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
              <span>Storage: <strong className="text-slate-600 font-semibold">Local MongoDB Engine</strong></span>
            </div>
            <div>
              <span>Tip: Use the top search index bar to filter notes instantly</span>
            </div>
          </div>

          {/* Upgraded Floating Action Button */}
          <button
            onClick={() => setModelOpen(true)}
            aria-label="Create new note"
            className="fixed right-6 bottom-6 md:right-10 md:bottom-10 z-50 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-rose-600 hover:bg-rose-700 text-white rounded-full shadow-[0_8px_24px_-6px_rgba(225,29,72,0.5)] hover:shadow-[0_12px_32px_-4px_rgba(225,29,72,0.7)] hover:scale-110 active:scale-95 active:translate-y-0 transition-all duration-300 group ease-out focus:outline-none focus:ring-4 focus:ring-rose-500/30"
          >
            <span className="text-3xl font-light tracking-tight transition-transform duration-300 group-hover:rotate-90">＋</span>
          </button>

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
        </>
      ) : (
        /* Hand-Crafted Studio Guest Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full my-auto py-8">
          
          {/* Left Column: Bold Editorial Typography */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 border border-rose-100 rounded-full text-xs font-semibold text-rose-600 uppercase tracking-wider">
              Local Workspace v1.0
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
              Organize your thoughts <br />
              <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 bg-clip-text text-transparent">
                without the noise.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              A streamlined interface for structural planning, clean code snippets, and daily notes. Completely local, fast, and secure.
            </p>
          </div>

          {/* Right Column: Clean Floating Authentication Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-8 shadow-[0_15px_40px_-12px_rgba(0,0,0,0.04)] relative overflow-hidden group">
              {/* Abstract structural alignment lines to look engineered */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-full -z-10 transition-colors group-hover:bg-rose-50/50" />
              
              <div className="w-11 h-11 bg-rose-50 rounded-xl flex items-center justify-center mb-5 text-rose-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              
              <h2 className="text-xl font-extrabold text-slate-800 mb-2">Access Protected</h2>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Please authenticate your active workspace session to map records to your system database.
              </p>
              
              <Link 
                to="/login" 
                className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.99] focus:outline-none"
              >
                Sign In to Dashboard
              </Link>
            </div>
          </div>

        </div>
      )}
    </div>

    {/* Minimalist Fixed Industrial Footer */}
    <div className="w-full border-t border-slate-200/50 py-4 px-4 sm:px-8 bg-white/40">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-[10px] sm:text-xs font-bold tracking-widest text-slate-400 uppercase gap-2">
        <div>© {new Date().getFullYear()} NoteApp Architecture</div>
        <div className="flex gap-4">
          <span>React 18</span>
          <span>Tailwind v3</span>
          <span>MongoDB Local</span>
        </div>
      </div>
    </div>

  </div>
)
}

export default Home