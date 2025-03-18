import React, { useState } from "react";
import CreateQuiz from "./CreateQuiz";
import Read from "./Read";
import Quizz from "./Quizz";

function Crud() {
  const [activeOperation, setActiveOperation] = useState(); 
  const [quizzes, setQuizzes] = useState([]); 

  const handleCreateQuiz = (newQuiz) => {
    setQuizzes([...quizzes, newQuiz]);
  };

  const renderOperationComponent = () => {
    switch (activeOperation) {
      case "Create Quiz":
        return <CreateQuiz onCreate={handleCreateQuiz} />;
      case "Read Quiz":
        return <Read quizzes={quizzes} />;
      case "Take Quiz":
        return <Quizz quizzes={quizzes} />;
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
          <h3 className="text-center text-blue-900 font-semibold text-xl mb-12">
            Select an option below:
          </h3>
          <div className="grid grid-cols-3 gap-8 mb-8">
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
              View Quizzes
            </button>
            <button
              className="w-72 h-32 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-3xl p-8 rounded-lg transform transition-transform duration-300 hover:scale-105"
              onClick={() => setActiveOperation("Take Quiz")}
            >
              Take Quiz!
            </button>
          </div>
        </>
      )}

      {activeOperation && (
        <div className="w-full max-w-3xl p-6 bg-white shadow-lg rounded-lg">
          <button
            className="mb-4 text-blue-600 underline hover:text-blue-800 transition-colors"
            onClick={() => setActiveOperation("")} 
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
