import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    id: {
        type: String, // Assuming id is a string
        required: true,
        unique: true // Ensure uniqueness of id field
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true,
        unique: true // Ensure uniqueness of question field
    },
    answer: {
        type: String,
        default: '' // Optional answer field
    }
});

const Question = mongoose.model('question', questionSchema);

export default Question;
