import React from "react";
import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Accordion expand icon
import { Button } from "@mui/material";

function Read({ quizzes, goBack }) {
  // Example `quizzes` data format:
  // [
  //   {
  //     quizName: "Sample Quiz",
  //     questions: [
  //       {
  //         question: "What is 2+2?",
  //         type: "mcq",
  //         options: ["2", "3", "4"],
  //         correctAnswer: "4",
  //       },
  //       {
  //         question: "What is the capital of France?",
  //         type: "text",
  //         correctAnswer: "Paris",
  //       },
  //     ],
  //   },
  // ]

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-blue-100 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-lg">
        <Typography variant="h4" align="center" className="mb-8">
          Quizzes Overview
        </Typography>

        {/* Iterate through all quizzes */}
        {quizzes.map((quiz, quizIndex) => (
          <Box key={quizIndex} className="mb-6">
            <Typography variant="h5" className="mb-4">
              {quiz.quizName}
            </Typography>

            {/* Display questions */}
            {quiz.questions.map((item, questionIndex) => (
              <Accordion key={questionIndex} className="mb-4">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${quizIndex}-${questionIndex}-content`}
                  id={`panel${quizIndex}-${questionIndex}-header`}
                >
                  <Typography>{item.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {/* If question type is MCQ */}
                  {item.type === "mcq" && (
                    <>
                      <Typography variant="body1" className="mb-2">
                        <strong>Options:</strong> {item.options.join(", ")}
                      </Typography>
                      <Typography variant="body2" className="text-green-600">
                        <strong>Correct Answer:</strong> {item.correctAnswer}
                      </Typography>
                    </>
                  )}

                  {/* If question type is Text */}
                  {item.type === "text" && (
                    <Typography variant="body2" className="text-green-600">
                      <strong>Correct Answer:</strong> {item.correctAnswer}
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        ))}
      </div>
    </div>
  );
}

export default Read;
