import axios from 'axios'
import React, { useEffect, useState } from 'react'

const NoteModal = ({closeModel, addNote, currentNote, editNote}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if(currentNote){
      setTitle(currentNote.title)
      setDescription(currentNote.description)
    }
  }, [currentNote])


  const handleSubmit = async (e) => {
        e.preventDefault();
        if(currentNote){
          editNote(currentNote._id, title, description)
        }else{
          addNote(title,description)
        }
    }

  return (
  <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-md flex items-center justify-center px-4 sm:px-6 z-50 animate-fadeIn">
    <div className="bg-white w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 relative transform transition-all duration-300 scale-100">
      
      {/* Structural Modal Header */}
      <h2 className="text-2xl font-extrabold tracking-tight text-slate-800 mb-6 text-center">
        {currentNote ? "✏️ Edit Note" : "📝 Add New Note"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Title Input Element Frame */}
        <div>
          <label className="block text-slate-600 font-medium text-sm mb-1.5">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your note a title..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all duration-200"
          />
        </div>

        {/* Description Textarea Element Frame */}
        <div>
          <label className="block text-slate-600 font-medium text-sm mb-1.5">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write out your structural details or workflows..."
            rows="5"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all duration-200 resize-none leading-relaxed"
          ></textarea>
        </div>

        {/* Modal Action Layout Footer */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-8 pt-4 border-t border-slate-100">
          
          {/* Cancel Close Trigger */}
          <button
            type="button"
            className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all duration-200 text-center"
            onClick={closeModel}
          >
            Cancel
          </button>
          
          {/* Main Form Action Submission Trigger */}
          <button
            type="submit"
            className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-medium py-2.5 px-6 rounded-xl shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-rose-500/20 text-center"
          >
            {currentNote ? "Update Note" : "Save Note"}
          </button>

        </div>
      </form>
    </div>
  </div>
)
}

export default NoteModal
