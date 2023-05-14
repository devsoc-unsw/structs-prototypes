// Quiz.tsx
import React, { useState } from 'react';
import './global.css';

export interface Question {
  text: string;
  options: string[];
  answerIndex: number;
  answerExplanation: string;
}

type MCQuestionProps = {
  question: Question;
  selectedOption: number;
  onOptionSelect: (optionIndex: number) => void;
  submitted: boolean;
};

const MCQuestion: React.FC<MCQuestionProps> = ({ question, selectedOption, onOptionSelect, submitted }) => {
  const handleOptionSelect = (optionIndex: number) => {
    onOptionSelect(optionIndex);
  };

  const getButtonClassName = (optionIndex: number) => {
    if (submitted) {
      if (optionIndex === selectedOption) {
        return optionIndex === question.answerIndex ? 'MCquestion__option--correct' : 'MCquestion__option--incorrect';
      }
    } else {
      return optionIndex === selectedOption ? 'MCquestion__option--selected' : '';
    }
  };

  return (
    <div>
      <h2>{question.text}</h2>
      <div>
        {question.options.map((option, index) => (
          <div key={index}>
            <label className={`MCquestion__option ${getButtonClassName(index)}`}>
              <input
                type="radio"
                name="option"
                value={index}
                checked={selectedOption === index}
                onChange={() => handleOptionSelect(index)}
                disabled={submitted}
              />
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

type QuizProps = {
  questions: Question[];
};

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>(Array(questions.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);

  const handleOptionSelect = (questionIndex: number, optionIndex: number) => {
    setSelectedOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[questionIndex] = optionIndex;
      return newOptions;
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelectedOptions(Array(questions.length).fill(-1));
    setSubmitted(false);
  };

  const score = selectedOptions.reduce(
    (acc, option, idx) => (option === questions[idx].answerIndex ? acc + 1 : acc),
    0
  );

  return (
    <div className="quiz">
      {questions.map((question, idx) => (
        <MCQuestion
          key={idx}
          question={question}
          selectedOption={selectedOptions[idx]}
          onOptionSelect={(optionIndex) => handleOptionSelect(idx, optionIndex)}
          submitted={submitted}
        />
      ))}
      <button onClick={handleSubmit} disabled={submitted}>
        Submit
      </button>
      <button onClick={handleReset} className="reset-button">
        Reset
      </button>
      {submitted && (
        <div className="results">
          <p>your score: {score} / {questions.length}</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;