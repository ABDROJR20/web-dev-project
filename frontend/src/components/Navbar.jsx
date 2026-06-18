import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/ContextProvider'

const Navbar = ({setQuery}) => {
    const {user , logout} = useAuth();
    
  return (
  <nav className="w-full py-4 bg-white/80 backdrop-blur-md flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b border-slate-100 font-sans antialiased text-slate-800 transition-all duration-300">
    
    {/* Brand Logo Identity */}
    <div className="text-2xl font-black tracking-tight hover:opacity-90 transition-opacity">
      <Link to="/" className="bg-gradient-to-r from-rose-600 to-rose-700 bg-clip-text text-transparent">
        NoteApp
      </Link>
    </div>

    {/* Integrated Modern Search Input */}
    <div className="w-full md:w-80 relative group">
      <input 
        type="text"
        placeholder="Search notes..."
        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all duration-200" 
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>

    {/* Right Navigation Element Workspace */}
    <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
      {/* <span className="mr-4">User name</span> */}
      {!user ? (
        <>
          <Link 
            to="/login" 
            className="w-full md:w-auto px-5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl text-center bg-white hover:bg-slate-50 transition-all duration-200 shadow-sm"
          >
            Login
          </Link>
          <Link 
            to="/signup" 
            className="w-full md:w-auto px-5 py-2 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-xl text-center transition-all duration-200 shadow-sm"
          >
            Signup 
          </Link>
        </>
      ) : (
        <>
          {/* Active Profile Identity Wrapper */}
          <div className="flex items-center gap-2 mr-0 md:mr-3 py-1 px-3 bg-slate-50 border border-slate-100 rounded-full text-sm font-medium text-slate-700 max-w-full truncate">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="truncate">{user.name}</span>
          </div>

          <button 
            className="w-full md:w-auto px-4 py-2 text-sm font-medium text-rose-600 hover:text-white border border-rose-200 hover:border-rose-600 hover:bg-rose-600 rounded-xl transition-all duration-200 ease-in-out" 
            onClick={logout}
          >
            Logout
          </button>
        </>
      )}

      {/* // <Link to="/login" className="bg-blue-500 px-4 py-2 rounded mr-4">
      // Login
      // </Link>
      // <Link to="/signup" className="bg-green-500 px-4 py-2 rounded mr-4">
      // Signup
      // </Link>

      // <button className="bg-red-500 px-4 py-2 rounded">Logout</button> */}
    </div>
  </nav>
)
}

export default Navbar