import React, { useState } from 'react';
import { Stack, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function StartQuiz() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (name.trim()) {
      navigate('/quiz', { state: { userName: name } });
    }
  };

  return (
    <Stack spacing={3} alignItems="center" justifyContent="center" sx={{ height: "100vh" }}>
      <Typography variant="h3">Welcome to the Quiz!</Typography>
      <TextField
        label="Enter your name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ backgroundColor: "white", borderRadius: 1 }}
      />
      <Button variant="contained" onClick={handleStart}>
        <Typography variant='button' fontSize="1.5rem">Start Quiz</Typography>
      </Button>
    </Stack>
  );
}

export default StartQuiz;
