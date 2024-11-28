import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

function UpdateQuiz({ quizzes, onUpdate }) {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizName, setQuizName] = useState(""); // Current quiz name
  const [questions, setQuestions] = useState([]); // Current questions list

  // Handle quiz selection for editing
  const handleSelectQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setQuizName(quiz.quizName);
    setQuestions(quiz.questions);
  };

  // Handle updating a specific question
  const handleQuestionChange = (index, updatedQuestion) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = updatedQuestion;
    setQuestions(updatedQuestions);
  };

  // Handle saving the updated quiz
  const handleSaveQuiz = () => {
    if (quizName && questions.length > 0) {
      const updatedQuiz = {
        ...selectedQuiz,
        quizName,
        questions,
      };
      onUpdate(updatedQuiz); // Pass updated quiz to parent
      alert("Quiz updated successfully!");
      setSelectedQuiz(null); // Reset to initial state
    } else {
      alert("Please complete the quiz details and add at least one question.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 flex flex-col items-center justify-center p-8">
      {!selectedQuiz ? (
        // If no quiz is selected, display the list of quizzes
        <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-center text-blue-900 font-bold text-3xl mb-8">
            Update Quiz
          </h2>
          {quizzes.map((quiz, index) => (
            <button
              key={index}
              className="w-full mb-4 p-4 bg-blue-500 text-white rounded-lg"
              onClick={() => handleSelectQuiz(quiz)}
            >
              {quiz.quizName}
            </button>
          ))}
        </div>
      ) : (
        // If a quiz is selected, display the editing form
        <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-center text-blue-900 font-bold text-3xl mb-8">
            Editing: {selectedQuiz.quizName}
          </h2>
          <TextField
            label="Quiz Name"
            variant="outlined"
            fullWidth
            className="mb-6"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
          />

          {/* Render questions for editing */}
          <div className="mb-6">
            {questions.map((q, index) => (
              <div key={index} className="p-4 mb-4 border rounded-lg">
                <TextField
                  label={`Question ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  className="mb-2"
                  value={q.question}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                />
                <p className="text-gray-500">Answer: {q.answer}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <Button variant="contained" color="primary" onClick={handleSaveQuiz}>
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setSelectedQuiz(null)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateQuiz;
