import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, styled } from '@mui/material';
import { authenticateGetQuestion } from '../../service/api.js';
import AnswerQuestion from './AnswerQuestion.jsx';

const QuestionList = () => {
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState(null);
    const [openAnswerDialog, setOpenAnswerDialog] = useState(false); // State to control the visibility of the AnswerQuestion dialog
    const [selectedQuestion, setSelectedQuestion] = useState({ email: '', question: '' }); // State to store the selected question

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await authenticateGetQuestion();
                if (response.status === 200) {
                    setQuestions(response.data.data);
                } else {
                    setError('Error loading questions');
                }
            } catch (error) {
                console.error("Error occurred while fetching questions :", error);
                setError('Error loading questions');
            }
        };

        fetchQuestions();
    }, []); // Empty dependency array ensures useEffect runs only once

    // Function to handle opening the AnswerQuestion dialog
    const handleOpenAnswerDialog = (email, question) => {
        setSelectedQuestion({ email, question }); // Set the selected question
        setOpenAnswerDialog(true); // Open the AnswerQuestion dialog
    };

    return (
        <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
            <Table>
                <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                    <TableRow>
                        <TableCell>User Email</TableCell>
                        <TableCell>Question</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {error ? (
                        <TableRow>
                            <TableCell colSpan={3}>
                                <Typography>{error}</Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        questions.map(question => (
                            <TableRow key={question._id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                                <TableCell>{question.email}</TableCell>
                                <TableCell>{question.question}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => handleOpenAnswerDialog(question.email, question.question)} // Call handleOpenAnswerDialog with email and question parameters
                                        variant="contained"
                                        color="primary"
                                    >
                                        Answer
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            {/* Render AnswerQuestion dialog if openAnswerDialog is true */}
            <AnswerQuestion
    open={openAnswerDialog}
    onClose={() => setOpenAnswerDialog(false)}
    email={selectedQuestion.email}
    question={selectedQuestion.question}
    selectedQuestion={selectedQuestion} // Ensure to pass selectedQuestion prop
/>

        </TableContainer>
    );
};

export default QuestionList;
