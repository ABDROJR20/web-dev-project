import React, { useEffect, useState } from 'react'

const COLORS = [
  'bg-white', 'bg-rose-100', 'bg-orange-100', 'bg-amber-100', 
  'bg-emerald-100', 'bg-teal-100', 'bg-sky-100', 'bg-indigo-100', 'bg-fuchsia-100'
];

const NoteModal = ({closeModel, addNote, currentNote, editNote}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [color, setColor] = useState('bg-white')
  const [isPinned, setIsPinned] = useState(false)

  useEffect(() => {
    if(currentNote){
      setTitle(currentNote.title)
      setDescription(currentNote.description)
      setColor(currentNote.color || 'bg-white')
      setIsPinned(currentNote.isPinned || false)
    }
  }, [currentNote])

  const handleSubmit = async (e) => {
        e.preventDefault();
        if(currentNote){
          editNote(currentNote._id, title, description, isPinned, color)
        }else{
          addNote(title, description, isPinned, color)
        }
    }

  return (
  <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center px-4 sm:px-6 z-50 animate-fadeIn">
    <div className={`w-full max-w-lg p-6 sm:p-8 rounded-[2rem] shadow-2xl relative transform transition-all duration-300 scale-100 ${color} border border-white/50 ring-1 ring-black/5`}>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-black tracking-tight text-gray-800">
            {currentNote ? "Edit Note" : "Create Note"}
        </h2>
        <button 
            type="button" 
            onClick={() => setIsPinned(!isPinned)} 
            className={`p-2.5 rounded-full transition-all duration-200 ${isPinned ? 'text-rose-600 bg-rose-200/50 shadow-inner' : 'text-gray-400 hover:bg-black/5'}`}
            title={isPinned ? "Unpin Note" : "Pin Note"}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isPinned ? 'transform rotate-45' : ''} transition-transform duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full bg-transparent border-b-2 border-black/5 focus:border-black/20 px-2 py-3 text-2xl font-bold text-gray-800 placeholder-gray-400 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Take a note..."
            rows="6"
            className="w-full bg-transparent border-none px-2 py-3 text-lg font-medium text-gray-700 placeholder-gray-400 focus:outline-none resize-none leading-relaxed"
          ></textarea>
        </div>
        
        <div className="flex flex-wrap gap-3 py-2">
            {COLORS.map((c, idx) => (
                <button 
                    key={idx} 
                    type="button" 
                    onClick={() => setColor(c)}
                    className={`w-8 h-8 rounded-full border-2 ${color === c ? 'border-gray-800 scale-125 shadow-md' : 'border-transparent hover:scale-110 shadow-sm'} transition-transform ${c}`}
                ></button>
            ))}
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            type="button"
            className="px-6 py-3 text-sm font-bold text-gray-600 hover:bg-black/5 rounded-2xl transition-all duration-200"
            onClick={closeModel}
          >
            Cancel
          </button>
          
          <button
            type="submit"
            className="bg-gray-900 hover:bg-black text-white font-bold py-3 px-8 rounded-2xl shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-900/20"
          >
            {currentNote ? "Save Changes" : "Add Note"}
          </button>
        </div>
      </form>
    </div>
  </div>
)
}

export default NoteModal
