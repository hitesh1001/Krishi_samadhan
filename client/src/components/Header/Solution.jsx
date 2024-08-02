import React, { useContext, useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Box, styled, Dialog } from '@mui/material';
import axios from 'axios';
import { DataContext } from '../../context/DataProvider';
import { authenticateGetSolution } from '../../service/api';

const URL = 'http://localhost:8000';  // Replace with your server URL

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    background-color: #f0f0f0;
    border-radius: 10px;
    width: 80%; /* Adjusted width */
    max-width: 800px; /* Added max-width for responsiveness */
    height: 80%; /* Adjusted height */
    max-height: 600px; /* Added max-height for responsiveness */
  }
`;

const Solution = ({ openSolution, setSolutionDialog }) => {
    const { user } = useContext(DataContext);
    const [problems, setProblems] = useState([]);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                if (user) {
                    const response = await authenticateGetSolution(user.email);
                    console.log('Response:', response);  // Optional: Log response to inspect

                    if (response && response.data) {
                        setProblems(response.data);
                        setError(null);
                    } else {
                        setError('Error loading problems: No response data');
                    }
                }
            } catch (error) {
                console.error("Error occurred while fetching problems:", error);
                setError('Error loading problems: Network error');
            }
        };

        if (openSolution && user) {  // Only fetch problems if the dialog is open and user is defined
            fetchProblems();
        }
    }, [openSolution, user]);

    const handleOpenImage = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const handleCloseImage = () => {
        setSelectedImage(null);
    };

    const handleClose = () => {
        setSolutionDialog(false);
    };

    return (
        <StyledDialog open={openSolution} onClose={handleClose}>
            <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                        <TableRow>
                            <TableCell>User Email</TableCell>
                            <TableCell>Problem</TableCell>
                            <TableCell>Solution</TableCell>
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
                            problems.map(problem => (
                                <TableRow key={problem._id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                                    <TableCell>{problem.email}</TableCell>
                                    <TableCell>{problem.problem}</TableCell>
                                    <TableCell>{problem.answer}</TableCell>
                                    <TableCell>{problem.img && (
                                        <>
                                            <Button
                                                variant='contained'
                                                onClick={() => handleOpenImage(`${URL}/${problem.img}`)}
                                            >
                                                Open image
                                            </Button>
                                            {selectedImage === `${URL}/${problem.img}` && (
                                                <Box mt={2}>
                                                    <img
                                                        src={`${URL}/${problem.img}`}
                                                        alt="Problem Image"
                                                        style={{ maxWidth: '100%', height: 'auto' }}
                                                    />
                                                    <Button onClick={handleCloseImage}>Close image</Button>
                                                </Box>
                                            )}
                                        </>
                                    )}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </StyledDialog>
    );
};

export default Solution;
