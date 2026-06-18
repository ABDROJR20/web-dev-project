import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    isPinned: {type: Boolean, default: false},
    color: {type: String, default: 'bg-white'},
    userId: {type:mongoose.Schema.Types.ObjectId, ref: 'User'},
}, { timestamps: true });

const Note = mongoose.model('Note', NoteSchema);
export default Note