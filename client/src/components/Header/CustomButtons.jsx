import React, { useState, useContext } from 'react';
import { Box, Button, Typography, styled } from '@mui/material';
import LoginDialog from '../login/LoginDialog';
import { DataContext } from '../../context/DataProvider';
import Profile from './Profile';
import Question from './Question.jsx';
import Problem from './Problem.jsx';
import Solution from './Solution.jsx';
const LoginButton = styled(Button)`
    color: #008000;
    background: #F3CA52;
    text-transform: none;
    font-weight: 600;
    border-radius: 2px;
    padding: 5px 40px;
    height: 32px;
    box-shadow: none;
`;

const Wrapper = styled(Box)`
    margin: 0 3% 0 auto;
    display: flex;
    justify-content: space-between;
    border-radius: 100%;
    align-items: center;
    width: 100%;

    & > * {
        margin-right: 40px !important;
        text-decoration: none;
        display: flex;
        justify-content: space-between;
        color: #FFFFFF;
        font-size: 12px;
        align-items: center;
    }
`;

const CustomButtons = () => {
    const { account, setAccount } = useContext(DataContext);
    const {user} = useContext(DataContext);
    const [open, setOpen] = useState(false);
    const [openQuestion, setOpenQuestion] = useState(false);
    const [openProblem, setOpenProblem] = useState(false);
    const [openSolution, setOpenSolution] = useState(false);

    const openDialog = () => {
        setOpen(true);
    }

    const openQuestionDialog = () => {
        setOpenQuestion(true);
    }

    const openProblemDialog = () => {
        setOpenProblem(true);
    }

    const openSolutionDialog = () => {
        setOpenSolution(true);
    }



    return (
        <Wrapper>
            {
                account ? <Profile style={{ marginLeft: 30 }} account={account} setAccount={setAccount} /> :
                    <LoginButton variant='contained' onClick={() => openDialog()} style={{ marginLeft: 30 }}> Login/Sign-up </LoginButton>
            }

            {user && <LoginButton variant='contained' onClick={() => openQuestionDialog()} style={{ marginLeft: 30 }}>{user==="farmer" ? <Typography style={{display: 'flex'}}>Ask a question</Typography> : <Typography style={{display: 'flex'}}>Answer a question</Typography>} </LoginButton>}
            {user && <LoginButton variant='contained' onClick={() => openProblemDialog()} style={{ marginLeft: 30 }}>{user==="farmer" ? <Typography style={{display: 'flex'}}>Ask a Problem</Typography> : <Typography style={{display: 'flex'}}>Answer a problem</Typography>} </LoginButton>}
            {user && <LoginButton variant='contained' onClick={() => openSolutionDialog()} style={{ marginLeft: 30 }}>{user==="farmer" ? <Typography style={{display: 'flex'}}>Solutions</Typography> : null} </LoginButton>}
            <LoginDialog open={open} setOpen={setOpen} />
            <Question openQuestion={openQuestion} setQuestionDialog={setOpenQuestion} />
            <Problem openProblem={openProblem} setProblemDialog={setOpenProblem} />
            <Solution openSolution={openSolution} setSolutionDialog={setOpenSolution} />
        </Wrapper>
    )
}

export default CustomButtons;
