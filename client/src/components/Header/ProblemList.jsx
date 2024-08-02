import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Box } from '@mui/material';
import { authenticateGetProblem } from '../../service/api.js';
import AnswerProblem from '../Header/AnswerProblem.jsx';

const ProblemList = () => {
    const [problems, setProblems] = useState([]);
    const [error, setError] = useState(null);
    const [openAnswerDialog, setOpenAnswerDialog] = useState(false); // State to control the visibility of the AnswerQuestion dialog
    const [selectedProblem, setSelectedProblem] = useState({ email: '', problem: '' }); // State to store the selected question
    const [selectedImage, setSelectedImage] = useState(null); // State to store the selected image URL

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await authenticateGetProblem();
                if (response.status === 200) {
                    setProblems(response.data.data);
                } else {
                    setError('Error loading problems');
                }
            } catch (error) {
                console.error("Error occurred while fetching problems :", error);
                setError('Error loading problems');
            }
        };

        fetchProblems();
    }, []); // Empty dependency array ensures useEffect runs only once

    // Function to handle opening the AnswerQuestion dialog
    const handleOpenAnswerDialog = (email, problem) => {
        setSelectedProblem({ email, problem }); // Set the selected question
        setOpenAnswerDialog(true); // Open the AnswerQuestion dialog
    };

    // Function to handle opening the image
    const handleOpenImage = (imageUrl) => {
        setSelectedImage(imageUrl); // Set the selected image URL
    };

    // Function to close the image view
    const handleCloseImage = () => {
        setSelectedImage(null); // Reset selected image URL
    };

    return (
        <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
            <Table>
                <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                    <TableRow>
                        <TableCell>User Email</TableCell>
                        <TableCell>Problem</TableCell>
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
                        problems.map(problem => (
                            <TableRow key={problem._id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                                <TableCell>{problem.email}</TableCell>
                                <TableCell>{problem.problem}</TableCell>
                                <TableCell>
                                    <Button
                                        variant='contained'
                                        onClick={() => handleOpenImage(`http://localhost:8000/${problem.img}`)} // Replace with your actual server URL
                                    >
                                        Open image
                                    </Button>
                                    {selectedImage === `http://localhost:8000/${problem.img}` && (
                                        <Box mt={2}>
                                            <img
                                                src={`http://localhost:8000/${problem.img}`}
                                                alt="Problem Image"
                                                style={{ maxWidth: '100%', height: 'auto' }}
                                            />
                                            <Button onClick={handleCloseImage}>Close image</Button>
                                        </Box>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => handleOpenAnswerDialog(problem.email, problem.problem)}
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
            <AnswerProblem
                open={openAnswerDialog}
                onClose={() => setOpenAnswerDialog(false)}
                email={selectedProblem.email}
                problem={selectedProblem.problem}
                selectedProblem={selectedProblem} // Ensure to pass selectedQuestion prop
            />
        </TableContainer>
    );
};

export default ProblemList;
