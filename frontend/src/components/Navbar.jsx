import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/ContextProvider'
import { FaBookOpen } from 'react-icons/fa'

const Navbar = ({setQuery}) => {
    const {user , logout} = useAuth();
    
  return (
  <nav className="w-full py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4 font-sans antialiased text-slate-800 transition-all duration-300">
    
    {/* Brand Logo Identity */}
    <div className="text-2xl font-black tracking-tighter hover:opacity-80 transition-opacity flex items-center gap-2">
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-2 rounded-xl shadow-lg shadow-indigo-500/30">
        <FaBookOpen className="text-xl" />
      </div>
      <Link to="/" className="text-gray-900">
        Note<span className="text-indigo-600">Sync</span>
      </Link>
    </div>

    {/* Integrated Modern Search Input */}
    {user && (
      <div className="w-full md:w-96 relative group">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input 
          type="text"
          placeholder="Search your notes..."
          className="w-full pl-11 pr-4 py-2.5 bg-white border-2 border-transparent focus:border-indigo-100 text-gray-800 placeholder-gray-400 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 shadow-[0_2px_10px_rgb(0,0,0,0.02)]" 
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    )}

    {/* Right Navigation Element Workspace */}
    <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
      {!user ? (
        <div className="flex gap-3 w-full md:w-auto">
          <Link 
            to="/login" 
            className="w-full md:w-auto px-6 py-2.5 text-sm font-bold text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-50 rounded-xl text-center transition-all duration-200 shadow-sm border border-gray-200"
          >
            Log in
          </Link>
          <Link 
            to="/register" 
            className="w-full md:w-auto px-6 py-2.5 text-sm font-bold text-white bg-gray-900 hover:bg-black rounded-xl text-center transition-all duration-200 shadow-lg shadow-gray-900/20"
          >
            Sign up
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          {/* Active Profile Identity Wrapper */}
          <div className="flex items-center gap-2.5 py-1.5 px-4 bg-white rounded-full text-sm font-bold text-gray-700 shadow-sm border border-gray-100">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="truncate max-w-[100px]">{user.name}</span>
          </div>

          <button 
            className="w-auto px-5 py-2 text-sm font-bold text-rose-600 hover:text-white border-2 border-rose-100 hover:border-rose-500 hover:bg-rose-500 rounded-xl transition-all duration-200 ease-in-out" 
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  </nav>
)
}

export default Navbar