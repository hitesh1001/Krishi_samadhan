import React from 'react'
import {AppBar, Toolbar, Box, Typography, styled} from '@mui/material';
import Search from './Search';
import CustomButtons from './CustomButtons';


const header = () => {

    const StyledHeader = styled(AppBar)`
    background: #008000;
    height: 55px;
`;
    const Image = styled('img')({
        width: 30,
        height: 30
    })


  return (
    <StyledHeader>
        <Toolbar>
            <Box style={{display:'flex'}}>
                <Typography>Krishi-Samadhan</Typography>
                <Image src='https://png.pngtree.com/png-clipart/20230710/original/pngtree-shetkari-raja-png-image_9290533.png' alt='logo' />
            </Box>
                <Search />
            <Box>
                <CustomButtons />
            </Box>
        </Toolbar>
        
    </StyledHeader>
  )
}

export default header;