import React, { useState } from "react";
import { Stack, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function StartQuiz() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (name.trim()) {
      navigate("/quiz", { state: { userName: name } });
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // background: "linear-gradient(135deg, #23303c, #1a2734)",
        color: "#fff",
      }}
    >
      <Stack
        spacing={4}
        alignItems="center"
        justifyContent="center"
        sx={{
          padding: 4,
          borderRadius: 3,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          background: "#1a2734",
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", color: "#61dafb", textAlign: "center" }}
        >
          The Random Facts Quiz!
        </Typography>
        <TextField
          label="Enter your name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{
            width: "100%",
            maxWidth: 400,
            backgroundColor: "white",
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#61dafb",
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleStart}
          sx={{
            padding: "12px 24px",
            fontSize: "1.5rem",
            fontWeight: "bold",
            borderRadius: 3,
            background: "#61dafb",
            color: "#23303c",
            "&:hover": {
              background: "#ff9800",
            },
          }}
        >
          Start Quiz
        </Button>
      </Stack>
    </Box>
  );
}

export default StartQuiz;
