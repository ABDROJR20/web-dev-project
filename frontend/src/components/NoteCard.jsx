import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

const NoteCard = ({ note , onEdit, deleteNote}) => {
  return (
  <div className="flex flex-col h-full justify-between font-sans antialiased text-slate-800 w-full max-w-md mx-auto">
    
    {/* Core Text Content Area */}
    <div className="space-y-2.5">
      <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-800 group-hover:text-rose-600 transition-colors duration-200 line-clamp-2">
        {note.title}
      </h2>
      <p className="text-slate-500 text-sm sm:text-base leading-relaxed line-clamp-4">
        {note.description}
      </p>
    </div>

    {/* Modern Isolated Action Dock */}
    <div className="flex justify-end items-center mt-6 pt-4 border-t border-slate-100 space-x-2">
      
      {/* Edit Action Button */}
      <button
        onClick={() => onEdit(note)}
        title="Edit Note"
        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
      >
        <FaEdit className="text-lg" />
      </button>

      {/* Delete Action Button */}
      <button
        onClick={() => deleteNote(note._id)}
        title="Delete Note"
        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
      >
        <FaTrash className="text-lg" />
      </button>

    </div>
  </div>
)
}

export default NoteCard
