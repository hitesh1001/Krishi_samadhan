import React, { useState } from 'react';
import { Dialog, TextField, Box, Button, styled } from '@mui/material';
import { authenticateAddProblemAnswer } from '../../service/api.js';

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const answerInitialValue = {
    body: ''
};

const AnswerProblem = ({ open, onClose, email, problem , selectedProblem}) => {

    const [answer,setAnswer] = useState(answerInitialValue);

    const onValueChange = (e) => {
        setAnswer({...answer,[e.target.name]:e.target.value})
    }

    const handleClose = () => {
        onClose(); // Close the dialog
        setAnswer(answerInitialValue); // Reset login form fields
    };

    const submitAnswer = async () => {
        try {
            const response = await authenticateAddProblemAnswer({
                body: answer.body,
                problem: problem 
            });
            if (response.status === 200) {
                handleClose(); // Close the dialog on successful submission
                console.log(response.data);
            } 
        } catch (error) {
            console.error("Error occurred while adding answer:", error);
        }
    };

  return (
    <Dialog open={open} onClose={handleClose} >
            <Wrapper>
                <TextField
                    variant="standard"
                    onChange={(e) => onValueChange(e)}
                    name='body'
                    label='Enter answer'
                />
                <LoginButton onClick={submitAnswer}>Submit</LoginButton>
            </Wrapper>
        </Dialog>
    
  )
}

export default AnswerProblem;