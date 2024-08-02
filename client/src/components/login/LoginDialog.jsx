import React, { useState } from 'react';
import { Button, Dialog, Box, styled } from '@mui/material';
import FarmerLogin from './FarmerLogin';
import ExpertLogin from './ExpertLogin';


const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    background-color: #f0f0f0;
    border-radius: 10px;
  }
`;


const ContentBox = styled(Box)`
  background-color: #D76F30;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;

const StyledButton = styled(Button)`
  && {
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: #ffffff;
    color: #D76F30;
    font-weight: bold;
  }
`;

const LoginDialog = ({ open, setOpen }) => {
  const [farmerLogin, setFarmerLogin] = useState(false);
  const [expertLogin, setExpertLogin] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setFarmerLogin(false); // Reset farmer login state when dialog is closed
  };

  const handleFarmerLoginClose = () => {
    setFarmerLogin(false);
    setOpen(false);
  };

  const handleExpertLoginClose = () => {
    setExpertLogin(false);
    setOpen(false);
  };

  const openFarmerLoginDialog = () => {
    setFarmerLogin(true);
  };

  const openExperLoginDialog = () => {
    setExpertLogin(true);
  };

  return (
    <StyledDialog open={open} onClose={handleClose}>
      <ContentBox>
        <StyledButton variant='contained' onClick={openFarmerLoginDialog}>Farmer Login</StyledButton>
        <StyledButton variant='contained' onClick={openExperLoginDialog} onCl>Expert Login</StyledButton>
      </ContentBox>
      <FarmerLogin open={farmerLogin} onClose={handleFarmerLoginClose} />
      <ExpertLogin open = {expertLogin} onClose={handleExpertLoginClose} />
    </StyledDialog>
  );
};

export default LoginDialog;
