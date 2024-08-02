import React, { useContext, useState } from 'react';
import { Box, Typography, TextField, Button, styled, Dialog } from '@mui/material';
import { authenticateProblem } from '../../service/api.js';
import DataProvider, { DataContext } from '../../context/DataProvider.jsx';
import ProblemList from './ProblemList.jsx';




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

const Problem = ({ openProblem, setProblemDialog }) => {
    const { user } = useContext(DataContext);
    const [problem, setProblem] = useState({ name: '', email: '', problem: '', img: '' });
    const [error, setError] = useState('');
    
    const onFileChange = (e) => {
      setProblem({ ...problem, img: e.target.files[0] });
    };
  
    const onValueChange = (e) => {
      setProblem({ ...problem, [e.target.name]: e.target.value });
    };
    const onProblemChange = (e) => {
      setProblem({ ...problem, problem: e.target.value });
    };

    const handleClose = () => {
      setProblemDialog(false);
      setError('');
      setProblem({ name: '', email: '', problem: '', img: '' });
    };
  
    const addProblem = async () => {
      try {
          const formData = new FormData();
          formData.append('name', problem.name);
          formData.append('email', problem.email);
          formData.append('problem', problem.problem); // Ensure problem is appended
          formData.append('img', problem.img);
  
          const response = await authenticateProblem(formData);
          console.log(response.data);
          if (response.status === 200) {
              handleClose();
              console.log(response.data);
          } else {
              setError(response.data.message || 'Error adding problem');
          }
      } catch (error) {
          console.error('Error occurred while adding problem:', error);
          setError('Error adding problem');
      }
  };
  
    return (
      <StyledDialog open={openProblem} onClose={handleClose}>
        {user === 'farmer' ? (
          <ContentBox>
            <TextField variant="standard" onChange={onValueChange} name="name" label="Enter name" />
            <TextField variant="standard" onChange={onValueChange} name="email" label="Enter email" />
            <TextField variant="standard" onChange={onProblemChange} name="problem" label="Describe your problem" multiline rows={8} />
            <input type="file" name="img" onChange={onFileChange} />
            {error && <Error>{error}</Error>}
            <LoginButton onClick={addProblem}>Continue</LoginButton>
          </ContentBox>
        ) : (
          <ContentBox>
            <Box>
              <ProblemList />
            </Box>
          </ContentBox>
        )}
      </StyledDialog>
    );
  };
  
  export default Problem;
