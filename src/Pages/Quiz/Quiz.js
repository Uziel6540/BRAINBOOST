import { useEffect, useState } from "react";
import Question from "../../components/Question/Question";
import "./Quiz.css";

const Quiz = ({ name, questions, score, setScore, setQuestions }) => {
  const [options, setOptions] = useState([]);
  const [currQues, setCurrQues] = useState(0);

  useEffect(() => {
    if (questions && questions[currQues]) {
      setOptions(
        handleShuffle([
          questions[currQues]?.correct_answer,
          ...questions[currQues]?.incorrect_answers,
        ])
      );
    }
  }, [currQues, questions]);

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  if (!questions || questions.length === 0) {
    return <div className="quiz">Loading Questions...</div>; // Display a message if questions are not available yet
  }

  return (
    <div className="quiz">
      <span className="subtitle">Welcome, {name}</span>

      <div className="quizInfo">
        <span>{questions[currQues].category}</span>
        <span>Score: {score}</span>
      </div>

      <Question
        currQues={currQues}
        setCurrQues={setCurrQues}
        questions={questions}
        options={options}
        correct={questions[currQues]?.correct_answer}
        score={score}
        setScore={setScore}
        setQuestions={setQuestions}
      />
    </div>
  );
};

export default Quiz;
