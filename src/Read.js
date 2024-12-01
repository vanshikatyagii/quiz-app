import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

function Read({ goBack }) {
  const [quizzes, setQuizzes] = useState([]);
  const [editQuestionId, setEditQuestionId] = useState(null);
  const [editedAnswer, setEditedAnswer] = useState("");

  // Fetch quizzes data from JSON Server
  useEffect(() => {
    axios
      .get("http://localhost:5000/quizzes")
      .then((response) => {
        console.log("Quizzes fetched successfully!", response.data);
        setQuizzes(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the quizzes!", error);
      });
  }, []);

  // Handle delete question
  const handleDelete = async (quizIndex, questionIndex) => {
    // Confirm deletion
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this question? This action cannot be undone."
    );

    if (!confirmDelete) return;

    // Clone quizzes to avoid directly mutating state
    const updatedQuizzes = [...quizzes];
    const quiz = updatedQuizzes[quizIndex];

    // Remove the question locally
    const [deletedQuestion] = quiz.questions.splice(questionIndex, 1);

    // If no questions remain, remove the entire quiz
    if (quiz.questions.length === 0) {
      updatedQuizzes.splice(quizIndex, 1);
    }

    // Optimistically update the state
    setQuizzes(updatedQuizzes);

    try {
      // Update or delete the quiz on the server
      if (quiz.questions.length > 0) {
        await axios.put(`http://localhost:5000/quizzes/${quiz.id}`, quiz);
      } else {
        await axios.delete(`http://localhost:5000/quizzes/${quiz.id}`);
      }
      console.log("Question deleted successfully!");
    } catch (error) {
      console.error("Failed to delete the question!", error);

      // Rollback state update in case of error
      if (quiz.questions.length === 0) {
        updatedQuizzes.splice(quizIndex, 0, quiz); // Restore the removed quiz
      } else {
        quiz.questions.splice(questionIndex, 0, deletedQuestion); // Restore the deleted question
      }
      setQuizzes([...quizzes]);

      alert("There was an error deleting the question. Please try again.");
    }
  };

  // Handle save edited answer
  const handleSaveAnswer = (quizIndex, questionIndex) => {
    const updatedQuizzes = [...quizzes];
    const quiz = updatedQuizzes[quizIndex];
    const question = quiz.questions[questionIndex];

    // Update only the correctAnswer field
    question.correctAnswer = editedAnswer;

    axios
      .put(`http://localhost:5000/quizzes/${quiz.id}`, quiz)
      .then(() => {
        console.log("Answer updated successfully!");
        setQuizzes(updatedQuizzes);
        setEditQuestionId(null); // Exit edit mode
      })
      .catch((error) => {
        console.error("Failed to update answer!", error);
      });
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditQuestionId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-blue-100 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-lg">
        <Typography variant="h4" align="center" className="mb-8">
          Quizzes Overview
        </Typography>

        {quizzes.length === 0 ? (
          <Typography variant="body1" align="center">
            Nothing to show!
          </Typography>
        ) : (
          quizzes.map((quiz, quizIndex) => (
            <Box key={quizIndex} className="mb-6">
              <Typography variant="h5" className="mb-4">
                {quiz.quizName}
              </Typography>

              {quiz.questions &&
                quiz.questions.map((item, questionIndex) => (
                  <Accordion key={questionIndex} className="mb-4">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${quizIndex}-${questionIndex}-content`}
                      id={`panel${quizIndex}-${questionIndex}-header`}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <Typography>{item.question}</Typography>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(quizIndex, questionIndex);
                          }}
                          edge="end"
                          aria-label="delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      {editQuestionId === item.id ? (
                        <>
                          <Typography variant="body2" className="mb-2">
                            <strong>Editing Answer:</strong>
                          </Typography>
                          <TextField
                            fullWidth
                            value={editedAnswer}
                            onChange={(e) => setEditedAnswer(e.target.value)}
                            placeholder="Edit correct answer"
                            className="mb-2"
                          />
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleSaveAnswer(quizIndex, questionIndex)}
                          >
                            Save
                          </Button>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleCancelEdit}
                            className="ml-2"
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          {item.type === "mcq" && (
                            <>
                              <Typography variant="body1" className="mb-2">
                                <strong>Options:</strong>{" "}
                                {item.options.join(", ")}
                              </Typography>
                              <Typography
                                variant="body2"
                                className="text-green-600"
                              >
                                <strong>Correct Answer:</strong>{" "}
                                {item.correctAnswer}
                              </Typography>
                            </>
                          )}

                          {item.type === "text" && (
                            <Typography
                              variant="body2"
                              className="text-green-600"
                            >
                              <strong>Correct Answer:</strong>{" "}
                              {item.correctAnswer}
                            </Typography>
                          )}
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                              setEditQuestionId(item.id);
                              setEditedAnswer(item.correctAnswer);
                            }}
                            className="mt-4"
                          >
                            Edit Answer
                          </Button>
                        </>
                      )}
                    </AccordionDetails>
                  </Accordion>
                ))}
            </Box>
          ))
        )}
      </div>
    </div>
  );
}

export default Read;
