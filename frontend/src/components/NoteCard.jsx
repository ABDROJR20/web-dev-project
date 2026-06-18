import React from 'react'
import { FaEdit, FaTrash, FaThumbtack } from 'react-icons/fa'

const NoteCard = ({ note , onEdit, deleteNote}) => {
  return (
  <div className={`flex flex-col h-full justify-between font-sans antialiased w-full max-w-md mx-auto rounded-2xl p-6 ${note.color ? note.color : 'bg-white'} shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300 border border-black/5 group`}>
    
    {/* Core Text Content Area */}
    <div className="space-y-3 relative flex-grow">
      {note.isPinned && (
        <div className="absolute -top-2 -right-2 text-rose-500 bg-white/50 p-1.5 rounded-full backdrop-blur-sm shadow-sm">
           <FaThumbtack className="transform rotate-45 text-sm" />
        </div>
      )}
      <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${note.color && note.color !== 'bg-white' ? 'text-gray-900' : 'text-slate-800'} line-clamp-2`}>
        {note.title}
      </h2>
      <p className={`${note.color && note.color !== 'bg-white' ? 'text-gray-800' : 'text-slate-600'} text-base font-medium leading-relaxed whitespace-pre-wrap line-clamp-6`}>
        {note.description}
      </p>
      {note.createdAt && (
        <p className="text-[11px] font-bold uppercase tracking-wider opacity-50 mt-4">
            {new Date(note.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
        </p>
      )}
    </div>

    {/* Modern Isolated Action Dock */}
    <div className="flex justify-end items-center mt-6 pt-4 border-t border-black/5 space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      
      <button
        onClick={() => onEdit(note)}
        title="Edit Note"
        className="p-2.5 text-gray-500 hover:text-gray-900 bg-white/40 hover:bg-white rounded-full transition-all duration-200 shadow-sm"
      >
        <FaEdit className="text-base" />
      </button>

      <button
        onClick={() => deleteNote(note._id)}
        title="Delete Note"
        className="p-2.5 text-gray-500 hover:text-rose-600 bg-white/40 hover:bg-white rounded-full transition-all duration-200 shadow-sm"
      >
        <FaTrash className="text-base" />
      </button>

    </div>
  </div>
)
}

export default NoteCard
