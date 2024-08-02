import User from '../model/user-schema.js';
import Expert from '../model/expert-schema.js';
import Question from '../model/question-schema.js';
import { ObjectId } from 'mongodb';
import Problem from '../model/problem-schema.js';
import user from '../model/user-schema.js';



export const userSignup = async (request, response) => {
    try {
        const exist = await User.findOne({ username: request.body.username })
        if (exist) {
            return response.status(401).json({ message: `Username already exists` });
        }
        const user = request.body;
        const newUser = new User(user);
        await newUser.save();

        response.status(200).json({ message: user });
       
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

export const userLogIn = async (request, response) => {
    try {
        let user = await User.findOne({ email: request.body.username, password: request.body.password });
        if (user) {
            // Update this line to use res.status(status).json(obj) instead of res.json(status, obj)
            return response.status(200).json(`${request.body.username} login successfull`);
        } else {
            // Update this line to use res.status(status).json(obj) instead of res.json(status, obj)
            return response.status(401).json('Invalid Login');
        }

    } catch (error) {
        // Use res.status(status).json(obj) here as well
        response.status(500).json({ message: error.message });        
    }
}

export const expertLogIn = async (request, response) => {
    try {
        let expert = await Expert.findOne({ username: request.body.username, password: request.body.password });
        if (expert) {
            return response.status(200).json(`${request.body.username} login successful`);

        } else {
            return response.status(401).json('Invalid Login');
        }

    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}


export const addQuestion = async (request, response) => {
    const generateUniqueId = () => {
        return new ObjectId().toHexString();
    }
    try {
        const { name, email, question } = request.body;
        const existQuestion = await Question.findOne({ question });
        if (existQuestion) {
            return response.status(409).json({ message: `Question already exists` });
        }
        
        // Ensure unique id value
        const id = generateUniqueId(); // You need to implement this function to generate unique ids
        
        const newQuestion = new Question({ id, name, email, question });
        await newQuestion.save();
        response.status(200).json({ message: "Question added successfully" });
    } catch (error) {
        if (error.code === 11000) {
            // Handle duplicate key error
            return response.status(500).json({ message: "Error adding question: Duplicate key error" });
        } else {
            console.error("Error occurred while adding question:", error);
            response.status(500).json({ message: "Error adding question" });
        }
    }
}

export const getQuestion = async (request,response) => {
    try {
        const questions = await Question.find({});
        return response.status(200).json({
            data: questions
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
}

export const addAnswer = async (request, response) => {
    try {
        // Extract answer data from the request body
        const { body , question} = request.body;

        // Find the question to which the answer will be added
        const existingQuestion = await Question.findOne({ question: question });

        // If the question exists, update it with the answer
        if (existingQuestion) {
            existingQuestion.answer = body; // Add the answer to the question
            await existingQuestion.save(); // Save the updated question
            return response.status(200).json({ message: 'Answer added successfully' });
        } else {
            // If the question does not exist, return an error
            return response.status(404).json({ message: 'Question not found' });
        }
    } catch (error) {
        console.error("Error occurred while adding answer:", error);
        response.status(500).json({ message: "Error adding answer" });
    }
};

export const getAnswer = async (request, response) => {
    try {
        const answers = await Question.find({});
        return response.status(200).json({
            data: answers
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};


export const addProblem = async (req, res) => {
    const generateUniqueId = () => {
        return new ObjectId().toHexString();
    }
    try {
      const { name, email, problem } = req.body;
      // Modify to get img from req.file
      const img = req.file ? req.file.path : '';
      if (!problem || !problem.trim()) {
        return res.status(400).json({ message: 'Problem description is required' });
      }
      
      const id = generateUniqueId();
      const newProblem = new Problem({id, name, email, problem, img });
      await newProblem.save();
      res.status(200).json({ message: 'Problem added successfully' });
    } catch (error) {
      console.error('Error occurred while adding problem:', error);
      res.status(500).json({ message: 'Error adding problem' });
    }
  };
  

export const getProblem = async (request,response) => {
    try {
        const problems = await Problem.find({});
        return response.status(200).json({
            data: problems
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
}

export const addProblemAnswer = async (request, response) => {
    try {
        // Extract answer data from the request body
        const { body , problem} = request.body;

        // Find the question to which the answer will be added
        const existingProblem = await Problem.findOne({ problem: problem });

        // If the question exists, update it with the answer
        if (existingProblem) {
            existingProblem.answer = body; // Add the answer to the question
            await existingProblem.save(); // Save the updated question
            return response.status(200).json({ message: 'Answer added successfully' });
        } else {
            // If the question does not exist, return an error
            return response.status(404).json({ message: 'Problem not found' });
        }
    } catch (error) {
        console.error("Error occurred while adding answer:", error);
        response.status(500).json({ message: "Error adding answer" });
    }
};

export const getSolution = async (request, response) => {
    try {
        const problems = await Problem.find({ email: request.query.email });  // Use request.query.email to get email parameter
        return response.status(200).json({
            data: problems
        });
    } catch (error) {
        console.error('Error fetching problems:', error.message);
        return response.status(500).json({ message: error.message });
    }
}