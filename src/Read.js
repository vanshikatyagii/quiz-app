import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";

function Read({ goBack }) {
  const [quizzes, setQuizzes] = useState([]);

  // Fetch quizzes data from JSON Server
  useEffect(() => {
    axios
      .get("http://localhost:3001/quizzes")
      .then((response) => {
        console.log("Quizzes fetched successfully!", response.data);
        setQuizzes(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the quizzes!", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-blue-100 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-lg">
        <Typography variant="h4" align="center" className="mb-8">
          Quizzes Overview
        </Typography>

        {quizzes.length === 0 ? (
          <Typography variant="body1" align="center">
            No quizzes available!
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
                      <Typography>{item.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {item.type === "mcq" && (
                        <>
                          <Typography variant="body1" className="mb-2">
                            <strong>Options:</strong> {item.options.join(", ")}
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
                    </AccordionDetails>
                  </Accordion>
                ))}
            </Box>
          ))
        )}

        <Box mt={4} textAlign="center">
          <Button
            variant="contained"
            color="primary"
            onClick={goBack}
          >
            Go Back
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default Read;
