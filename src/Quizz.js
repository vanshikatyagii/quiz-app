import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { Typography, Button, Box, TextField } from "@mui/material";

function Quizz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [questionTimer, setQuestionTimer] = useState(30);
  const [animateKey, setAnimateKey] = useState(0);
  const [error, setError] = useState(""); 

  
  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setError(""); 
        const dbResponse = await axios.get("http://localhost:5000/quizzes");

        const dbQuestions = dbResponse.data.flatMap((quiz) => quiz.questions || []);

        if (dbQuestions.length === 0) {
          throw new Error("No questions available.");
        }

        setQuestions(dbQuestions);
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || "Failed to load questions. Please try again later.";
        setError(errorMessage);
        alert(errorMessage);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    let timer;
    if (quizStarted && !showResults) {
      timer = setInterval(() => {
        setQuestionTimer((prevTime) => {
          if (prevTime <= 1) {
            handleTimeout();
            return 30;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizStarted, currentQuestionIndex, showResults]);

  const handleTimeout = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setAnimateKey(animateKey + 1);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserInput("");
    } else {
      setShowResults(true);
    }
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);

    if (currentQuestionIndex + 1 < questions.length) {
      setAnimateKey(animateKey + 1);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestionTimer(30);
      setUserInput("");
    } else {
      setShowResults(true);
    }
  };

  const handleTextAnswer = () => {
    const correctAnswer = questions[currentQuestionIndex]?.correctAnswer?.toLowerCase() || "";
    if (userInput.trim().toLowerCase() === correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex + 1 < questions.length) {
      setAnimateKey(animateKey + 1);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestionTimer(30);
      setUserInput("");
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuestionTimer(30);
    setShowResults(false);
    setAnimateKey(animateKey + 1);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 to-blue-300 flex items-center justify-center">
      <Box sx={{ width: "80%" }}>
        <Box
          sx={{
            width: "90%",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          {error ? (
            <Box textAlign="center">
              <Typography variant="h5" color="error" gutterBottom>
                {error}
              </Typography>
              <Button variant="contained" color="primary" onClick={restartQuiz}>
                Try Again
              </Button>
            </Box>
          ) : !quizStarted ? (
            <Box textAlign="center">
              <Typography variant="h4">Welcome to the Quiz App</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setQuizStarted(true)}
              >
                Start Quiz
              </Button>
            </Box>
          ) : showResults ? (
            <Box textAlign="center">
              <Typography variant="h4">Quiz Completed!</Typography>
              <Typography variant="h6" className="mt-4">
                Your Score: {score}/{questions.length}
              </Typography>
              <Button variant="contained" color="primary" onClick={restartQuiz}>
                Restart Quiz
              </Button>
            </Box>
          ) : (
            <Box>
              <Typography variant="h6">
                Question {currentQuestionIndex + 1}/{questions.length}
              </Typography>
              <Typography variant="h5" className="mt-4">
                {questions[currentQuestionIndex]?.question || "No question available"}
              </Typography>
              <Typography variant="subtitle1" className="mt-4">
                Timer: {questionTimer}s
              </Typography>
              {questions[currentQuestionIndex]?.type === "mcq" ? (
                <Box className="mt-6 grid grid-cols-2 gap-4">
                  {questions[currentQuestionIndex].options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outlined"
                      onClick={() =>
                        handleAnswer(option === questions[currentQuestionIndex].correctAnswer)
                      }
                    >
                      {option}
                    </Button>
                  ))}
                </Box>
              ) : (
                <Box className="mt-6">
                  <TextField
                    label="Your Answer"
                    fullWidth
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                  />
                  <Button variant="contained" color="primary" onClick={handleTextAnswer}>
                    Submit Answer
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default Quizz;
