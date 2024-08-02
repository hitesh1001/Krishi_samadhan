import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema({
    id: {
        type: String, // Assuming id is a string
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
    problem: {
        type: String,
        required: true,
        unique: true 
    },
    img: {
        type: String,
        default: '' 
    },
    answer: {
        type: String,
        default: '' // Optional answer field
    }
});

const Problem = mongoose.model('problem', ProblemSchema);

export default Problem;
