import React, { useState } from 'react';
import './global.css';

//question structure
export interface Question {
  question: string;
  options: string[];
  answerIndex: number;
  answerExplanation: string;
}
export interface MCQuestionProps {
  question: Question;
}

//input: question struct (asking question, options, correct index, explanation)
//output: multiple choice question component
//features: click option to check right/wrong/explanation. click same option again to reset
function MCQuestion({ question }: MCQuestionProps) {

  //initialises state of question (asking, correct, incorrect)
  //initialises state of chosen index (-1 (none), 0, 1, 2, ...)
  const [questionState, setQuestionState] = useState('asking');
  const [chosenOption, setChosenOption] = useState(-1);


  //checks if chosen answer is correct. sets state as required.
  function handleOptionSelect(optionIndex: number) {
    if (optionIndex === question.answerIndex) {
      setQuestionState('correct');
    } else {
      setQuestionState('incorrect');
    }
    setChosenOption(optionIndex);
  }

  //resets to no selected options.
  function handleReset() {
    setQuestionState('asking');
    setChosenOption(-1);
  }

  return (
    <div>
      <h2>{question.question}</h2>
      <div>
        {question.options.map((option, index) => (
          <div key={index}>
            <label
              className={`MCquestion__option 
                ${index === chosenOption 
                ? (index === question.answerIndex 
                ? 'MCquestion__option--correct' 
                : 'MCquestion__option--incorrect') : ''}`}
            >
              <input
                type="radio"
                name="option"
                value={index}
                checked={chosenOption === index}
                onChange={() => handleOptionSelect(index)}
                onClick={handleReset}
              />
              {option}
            </label>
          </div>
        ))}
      </div>
      {questionState === 'correct' && (
        <div>
          <h3>You are correct!</h3>
          <p className="MCquestion__answerExplanation">
            {question.answerExplanation}
          </p>
        </div>
      )}
      {questionState === 'incorrect' && (
        <div>
          <h3>Sorry, that's incorrect. The correct answer is: </h3>
          <p className="MCquestion__answerExplanation">
            {question.answerExplanation}
          </p>
        </div>
      )}
    </div>
  );
}

export default MCQuestion;