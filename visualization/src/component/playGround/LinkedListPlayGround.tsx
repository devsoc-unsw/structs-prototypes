import React, { useState } from 'react';
import { LinkedListDataState, VariableType } from '../type/state';
import "../../App.css"
import { generateStateHistory } from './stateGenerator/linkedListGenerator';
import { parseLinkedListState } from '../stateParser/parser';

const PlayGround: React.FC = () => {
  const [currState, setCurrState] = useState<LinkedListDataState | null>(null);
  const [history, setHistory] = useState<LinkedListDataState[]>([]);

  let data = generateStateHistory();
  let idx = 0;

  const onResetLinkedList = () => {
    setCurrState(null);
    setHistory([]);

    data = generateStateHistory();
    idx = 0;
    console.log(data);
  };

  const onParse = () => {
    parseLinkedListState(data[idx]);
  }

  const onRender = () => {
    parseLinkedListState(data[idx]);
  }

  // Clone function here
  const clone = (a: any) => {
    return JSON.parse(JSON.stringify(a));
  }

  return (
    <div
      className="App"
      style={{
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ebe8f4',
        margin: '0',
        padding: '0',
      }}
    >
      <h1 style={{ margin: '0', padding: '1rem', color: 'black' }}>
        LinkedList Playground
      </h1>
      <button onClick={onResetLinkedList}>Start</button>
      <button onClick={onParse}>Parse</button>
      <button onClick={onRender}>Render</button>
    </div>
  );
};

export default PlayGround;