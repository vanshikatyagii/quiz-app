import React, { useState } from "react";
import CreateQuiz from "./CreateQuiz";
import Read from "./Read";
import UpdateQuiz from "./UpdateQuiz";
import DeleteQuiz from "./DeleteQuiz";

function Crud() {
  const [activeOperation, setActiveOperation] = useState(""); // Tracks the active operation selected
  const [quizzes, setQuizzes] = useState([]); // State to store all quizzes

  // Add a new quiz
  const handleCreateQuiz = (newQuiz) => {
    setQuizzes([...quizzes, newQuiz]);
  };

  // Update an existing quiz
  const handleUpdateQuiz = (updatedQuiz) => {
    setQuizzes(
      quizzes.map((quiz) =>
        quiz.quizName === updatedQuiz.quizName ? updatedQuiz : quiz
      )
    );
  };

  // Delete a quiz
  const handleDeleteQuiz = (quizToDelete) => {
    setQuizzes(quizzes.filter((quiz) => quiz !== quizToDelete));
  };

  // Render the appropriate component based on the selected operation
  const renderOperationComponent = () => {
    switch (activeOperation) {
      case "Create Quiz":
        return <CreateQuiz onCreate={handleCreateQuiz} />;
      case "Read Quiz":
        return <Read quizzes={quizzes} />;
      case "Update Quiz":
        return <UpdateQuiz quizzes={quizzes} onUpdate={handleUpdateQuiz} />;
      case "Delete Quiz":
        return <DeleteQuiz quizzes={quizzes} onDelete={handleDeleteQuiz} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 flex flex-col items-center justify-center p-8">
      {!activeOperation && (
        <>
          <h2 className="text-center text-blue-900 font-bold text-5xl mb-12">
            Welcome to Quiz App!
          </h2>
          <h3 className="text-center text-blue-900 font-semi-bold text-xl mb-12">
            Select any one below:
          </h3>
        </>
      )}

      {!activeOperation && (
        <div className="grid grid-cols-2 gap-8 mb-8">
          <button
            className="w-72 h-32 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold text-3xl p-8 rounded-lg transform transition-transform duration-300 hover:scale-105"
            onClick={() => setActiveOperation("Create Quiz")}
          >
            Create Quiz
          </button>

          <button
            className="w-72 h-32 bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold text-3xl p-8 rounded-lg transform transition-transform duration-300 hover:scale-105"
            onClick={() => setActiveOperation("Read Quiz")}
          >
            Read Quiz
          </button>

          <button
            className="w-72 h-32 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-3xl p-8 rounded-lg transform transition-transform duration-300 hover:scale-105"
            onClick={() => setActiveOperation("Update Quiz")}
          >
            Update Quiz
          </button>

          <button
            className="w-72 h-32 bg-gradient-to-r from-red-500 to-yellow-500 text-white font-bold text-3xl p-8 rounded-lg transform transition-transform duration-300 hover:scale-105"
            onClick={() => setActiveOperation("Delete Quiz")}
          >
            Delete Quiz
          </button>
        </div>
      )}

      {activeOperation && (
        <div className="w-full max-w-3xl p-6 bg-white shadow-lg rounded-lg">
          <button
            className="mb-4 text-blue-500 underline"
            onClick={() => setActiveOperation("")} // Go back to main menu
          >
            Back to Main Menu
          </button>
          {renderOperationComponent()}
        </div>
      )}
    </div>
  );
}

export default Crud;
