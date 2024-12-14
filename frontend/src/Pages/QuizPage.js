import React, { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(900);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const userName = location.state?.userName || "User";

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/get-questions/")
      .then((response) => setQuestions(response.data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          handleSubmit();
          clearInterval(timer);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerChange = (option) => {
    setAnswers({ ...answers, [currentQuestionIndex]: option });
  };

  const handleSubmit = () => {
    const score = questions.reduce(
      (acc, question, index) => {
        if (answers[index] === question.correct_option) acc.correct++;
        else acc.incorrect++;
        return acc;
      },
      { correct: 0, incorrect: 0 }
    );

    navigate("/result", { state: { userName, score, questions, answers } });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <Stack spacing={4} sx={{ padding: 5 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" >
        <Box p={1.5}>
          <Typography variant="h5" color="#61dafb">
            {userName}
          </Typography>
        </Box>
        <Box p={1.5} sx={{ background: "#23303c", borderRadius: 3 }}>
          <Typography color="#61dafb">
            Time Left: {formatTime(timeLeft)}
          </Typography>
        </Box>
      </Stack>

      {questions.length > 0 && (
        <Stack spacing={2}>
          <Stack p={4} sx={{ background: "#1a2734", borderRadius: 3 }}>
            <Typography variant="body" fontSize="2rem">{`${
              currentQuestionIndex + 1
            }. ${questions[currentQuestionIndex].text}`}</Typography>
          </Stack>
          <RadioGroup
            onChange={(e) => handleAnswerChange(e.target.value)}
            value={answers[currentQuestionIndex] || ""}
          >
            <FormControlLabel
              value="A"
              control={
                <Radio
                  sx={{
                    color: "#61dafb",
                    margin:"0 2rem",
                    "&.Mui-checked": {
                      color: "#ff9800",
                    },
                  }}
                />
              }
              label={
                <Typography fontSize="1.2rem" sx={{ color: "#fff" }}>
                  {questions[currentQuestionIndex].option_a}
                </Typography>
              }
            />
            <FormControlLabel
              value="B"
              control={
                <Radio
                  sx={{
                    color: "#61dafb",
                    margin:"0 2rem",
                    "&.Mui-checked": {
                      color: "#ff9800",
                    },
                  }}
                />
              }
              label={
                <Typography fontSize="1.2rem" sx={{ color: "#fff" }}>
                  {questions[currentQuestionIndex].option_b}
                </Typography>
              }
            />
            <FormControlLabel
              value="C"
              control={
                <Radio
                  sx={{
                    color: "#61dafb",
                    margin:"0 2rem",
                    "&.Mui-checked": {
                      color: "#ff9800",
                    },
                  }}
                />
              }
              label={
                <Typography fontSize="1.2rem" sx={{ color: "#fff" }}>
                  {questions[currentQuestionIndex].option_c}
                </Typography>
              }
            />
            <FormControlLabel
              value="D"
              control={
                <Radio
                  sx={{
                    color: "#61dafb",
                    margin:"0 2rem",
                    "&.Mui-checked": {
                      color: "#ff9800",
                    },
                  }}
                />
              }
              label={
                <Typography fontSize="1.2rem" sx={{ color: "#fff" }}>
                  {questions[currentQuestionIndex].option_d}
                </Typography>
              }
            />
          </RadioGroup>
        </Stack>
      )}

      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Button
          variant="contained"
          onClick={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        <Stack direction="row" gap={2}>
          <Button
            variant="contained"
            onClick={goToNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next
          </Button>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Submit Quiz
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default QuizPage;
