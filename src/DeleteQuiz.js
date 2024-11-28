import React from "react";
import { Button } from "@mui/material"; // Ensure Button is imported from Material-UI

function DeleteQuiz({ quizzes, onDelete }) {
  // Handle the delete action
  const handleDeleteQuiz = (quiz) => {
    if (window.confirm(`Are you sure you want to delete "${quiz.quizName}"?`)) {
      onDelete(quiz); // Notify parent component about the quiz to delete
      alert(`Quiz "${quiz.quizName}" deleted successfully!`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-blue-900 font-bold text-3xl mb-8">
          Delete Quiz
        </h2>
        {/* Display quizzes or a message if none are available */}
        {quizzes.length > 0 ? (
          quizzes.map((quiz, index) => (
            <div
              key={index}
              className="flex justify-between items-center mb-4 p-4 border rounded-lg"
            >
              <span>{quiz.quizName}</span>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteQuiz(quiz)}
              >
                Delete
              </Button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700">
            No quizzes available to delete.
          </p>
        )}
      </div>
    </div>
  );
}

export default DeleteQuiz;
