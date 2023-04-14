export interface Question {
    question: string;
    options: string[];
    answerIndex: number;
    answerExplanation: string;
  }
  
  export interface MCQuestionProps {
    question: Question;
  }