import React, { useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./Question.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Question = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  score,
  setQuestions,
}) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);

  const handleSelect = (i) => {
    if (selected === i && selected === correct) {
      return "select";
    } else if (selected === i && selected !== correct) {
      return "wrong";
    } else if (i === correct) {
      return "select";
    }
  };

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) setScore(score + 1);
    setError(false);
  };

  const navigate = useNavigate();

  const handleNext = () => {
    if (currQues > 8) {
      navigate("/result"); // Corrected navigate call
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected();
    } else setError("Please select an option first");
  };

  const handleQuit = () => {
    setCurrQues(0);
    setQuestions(); // Resetting questions (ensure setQuestions is a valid function)
  };

  return (
    <div className="question">
      <h1>Question {currQues + 1}</h1>

      <div className="singleQuestion">
        <h2>{questions[currQues].question}</h2>

        <div className="options">
          {error && <ErrorMessage>{error}</ErrorMessage>}

          {options &&
            options.map((i) => (
              <button
                onClick={() => handleCheck(i)} // Fixed onClick here
                className={`singleOption ${selected && handleSelect(i)}`}
                key={i}
                disabled={selected}
              >
                {i}
              </button>
            ))}
        </div>

        <div className="controls">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            href="/"
            onClick={handleQuit}
          >
            Quit
          </Button>

          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={handleNext}
          >
            Next Question
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Question;
