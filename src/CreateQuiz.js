import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Accordion expand icon
import axios from "axios";

function CreateQuiz() {
  const [quizName, setQuizName] = useState(""); // Quiz name state
  const [questions, setQuestions] = useState([]); // Questions array state
  const [currentQuestion, setCurrentQuestion] = useState(""); // Current question input
  const [questionType, setQuestionType] = useState("mcq"); // Type of the question (MCQ or Text)
  const [currentAnswer, setCurrentAnswer] = useState(""); // Current answer input for MCQ
  const [currentOptions, setCurrentOptions] = useState([]); // Options for current MCQ
  const [correctAnswer, setCorrectAnswer] = useState(""); // Correct answer for the question

  // Handle adding an option to the current MCQ question
  const handleAddOption = () => {
    if (currentAnswer) {
      setCurrentOptions([...currentOptions, currentAnswer]); // Add the new option to the list
      setCurrentAnswer(""); // Clear the answer input for the next option
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    
    if (quizName && questions.length > 0) {
      const newQuiz = {
        quizName: quizName,
        questions: questions,
      };
      try {
        const response = await axios.post('http://localhost:3001/quizzes', newQuiz, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 201) {
          alert('Quiz saved successfully!');
        } else {
          alert('Failed to save quiz.');
        }
      } catch (error) {
        console.error('Error saving quiz:', error);
        alert('An error occurred while saving the quiz.');
      }
    } else {
      alert('Please complete the quiz details and add at least one question.');
    }
  };

  // Handle adding a question
  const handleAddQuestion = () => {
    if (
      currentQuestion &&
      ((questionType === "mcq" && currentOptions.length > 1 && correctAnswer) ||
        (questionType === "text" && correctAnswer))
    ) {
      setQuestions([
        ...questions,
        {
          question: currentQuestion,
          type: questionType,
          options: questionType === "mcq" ? currentOptions : [],
          correctAnswer: correctAnswer,
        },
      ]);
      // Reset inputs for the next question
      setCurrentQuestion("");
      setCurrentOptions([]);
      setCorrectAnswer("");
      setQuestionType("mcq");
    } else {
      alert("Please complete the question and ensure it meets the requirements.");
    }
  };

  // Handle saving the quiz
  const handleSaveQuiz = () => {
    if (quizName && questions.length > 0) {
      const newQuiz = {
        quizName: quizName,
        questions: questions,
      };
      console.log("Quiz Saved:", newQuiz); // Log the quiz to the console
      alert("Quiz saved successfully!");
      handleSubmit();
    } else {
      alert("Please complete the quiz details and add at least one question.");
    }
  };

  // Cancel quiz creation
  const handleCancel = () => {
    setQuizName("");
    setQuestions([]);
    setCurrentQuestion("");
    setCurrentAnswer("");
    setCurrentOptions([]);
    setCorrectAnswer("");
    setQuestionType("mcq");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <Typography variant="h4" align="center" className="mb-8">
          Create a New Quiz
        </Typography>

        {/* Quiz Name Input */}
        <TextField
          label="Quiz Name"
          variant="outlined"
          fullWidth
          className="mb-6"
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
          placeholder="Enter the name of your quiz"
        />

        {/* Accordion for adding a question */}
        <Accordion className="mb-6">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6">Add a Question</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              label="Question"
              variant="outlined"
              fullWidth
              className="mb-4"
              value={currentQuestion}
              onChange={(e) => setCurrentQuestion(e.target.value)}
              placeholder="Enter your question"
            />

            {/* Select Question Type */}
            <FormControl fullWidth className="mb-4">
              <FormLabel>Question Type</FormLabel>
              <Select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
              >
                <MenuItem value="mcq">Multiple Choice</MenuItem>
                <MenuItem value="text">Text Answer</MenuItem>
              </Select>
            </FormControl>

            {/* Question Type Specific Inputs */}
            {questionType === "mcq" && (
              <>
                {/* Add Options */}
                <TextField
                  label="Option"
                  variant="outlined"
                  fullWidth
                  className="mb-4"
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  placeholder="Enter an option"
                />
                <Box className="flex justify-end mt-4">
                  <Button variant="contained" onClick={handleAddOption} color="primary">
                    Add Option
                  </Button>
                </Box>

                {/* Display added options */}
                <Box className="mt-4">
                  {currentOptions.map((option, index) => (
                    <Chip key={index} label={option} className="mr-2 mb-2" color="primary" />
                  ))}
                </Box>

                {/* Select correct answer */}
                <FormControl component="fieldset" className="mt-4">
                  <FormLabel component="legend">Correct Answer</FormLabel>
                  <RadioGroup
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                  >
                    {currentOptions.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        value={option}
                        control={<Radio />}
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </>
            )}

            {questionType === "text" && (
              <TextField
                label="Correct Answer"
                variant="outlined"
                fullWidth
                className="mt-4"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                placeholder="Enter the correct answer"
              />
            )}

            <Box className="flex justify-end mt-4">
              <Button variant="contained" onClick={handleAddQuestion} color="primary">
                Add Question
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Display added questions */}
        <Box className="mb-6">
          <Typography variant="h6" className="mb-4">
            Questions Added:
          </Typography>
          <Box>
            {questions.map((item, index) => (
              <Box key={index} className="mb-2 p-2 border rounded-md">
                <Typography variant="h6">{item.question}</Typography>
                {item.type === "mcq" && (
                  <>
                    <Typography variant="body1" className="mt-2">
                      <strong>Options:</strong> {item.options.join(", ")}
                    </Typography>
                    <Typography variant="body2" className="mt-1 text-green-600">
                      Correct Answer: {item.correctAnswer}
                    </Typography>
                  </>
                )}
                {item.type === "text" && (
                  <Typography variant="body2" className="mt-1 text-green-600">
                    Correct Answer: {item.correctAnswer}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box className="flex justify-between">
          <Button variant="outlined" onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSaveQuiz} color="primary">
            Save Quiz
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default CreateQuiz;
