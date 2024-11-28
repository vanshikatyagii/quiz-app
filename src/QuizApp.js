import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardActionArea, CardContent, CardHeader} from "@mui/material";


function QuizApp() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  {/*useEffect(() => {
    // Fetch questions from the JSON server
    axios
      .get("http://localhost:5000/0") 
      .then((response) => {
        setQuestions(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const handleAnswer = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];

    // Check if the answer is correct
    if (selectedOption === currentQuestion.answer) {
      setScore(score + 1);
    }
    setUserAnswer(selectedOption);

    // Move to the next question after a delay
    setTimeout(() => {
      setUserAnswer(null);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }, 1000);
  };

  if (isLoading) {
    return <div>Loading questions...</div>;
  }

  if (currentQuestionIndex >= questions.length) {
    return (
      <div>
        <h1>Quiz Complete!</h1>
        <p>
          Your score is {score}/{questions.length}.
        </p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];*/}

  return (
    <div className="quiz-container">
      <Card className="w-500px h-100px"> 
            <CardHeader><h1>Create a Quiz!</h1></CardHeader>
            <CardContent>bleh</CardContent>
        </Card>
    </div>
  );
}

export default QuizApp;
