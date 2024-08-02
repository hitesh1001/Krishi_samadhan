import React, { useContext, useState } from 'react';
import { Box, Typography, TextField, Button, styled, Dialog } from '@mui/material';
import { authenticateQuestion } from '../../service/api.js';
import DataProvider, { DataContext } from '../../context/DataProvider.jsx';
import QuestionList from './QuestionList.jsx';
const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    background-color: #f0f0f0;
    border-radius: 10px;
    width: 60%;
    height: 50%;
  }
`;

const ContentBox = styled(Box)`
  background-color: #FFFFFF;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #FB641B;
  color: #fff;
  height: 48px;
  border-radius: 2px;
  margin-top: 20px;
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  margin-top: 5px;
`;

const Question = ({ openQuestion, setQuestionDialog }) => {
    const {user} = useContext(DataContext);
    const [question, setQuestion] = useState({ name: '', email: '', question: '' });
    const [error, setError] = useState('');

    const onValueChange = (e) => {
        setQuestion({ ...question, [e.target.name]: e.target.value });
    }

    const handleClose = () => {
        setQuestionDialog(false);
        setError('');
        setQuestion({ name: '', email: '', question: '' });
    }

    const addQuestion = async () => {
        try {
            const response = await authenticateQuestion(question);
            if (response.status === 200) {
                handleClose();
                console.log(response.data);
            } else {
                setError(response.data.message || 'Error adding question');
            }
        } catch (error) {
            console.error("Error occurred while adding question:", error);
            setError('Error adding question');
        }
    };

    return (
        
        <StyledDialog open={openQuestion} onClose={handleClose}>
           {  user === "farmer" ? (
             <ContentBox>
             <TextField variant='standard' onChange={onValueChange} name='name' label='Enter name' />
             <TextField variant='standard' onChange={onValueChange} name='email' label='Enter email' />
             <TextField variant='standard' onChange={onValueChange} name='question' label='Enter question' multiline rows={8} />
             {error && <Error>{error}</Error>}
             <LoginButton onClick={addQuestion}>Continue</LoginButton>
         </ContentBox>
           ) : 
           <ContentBox>
             <Box>
              <QuestionList />
             </Box>
         </ContentBox>

           }
        </StyledDialog>
    );
}

export default Question;
