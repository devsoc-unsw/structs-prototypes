import React, { useState } from 'react';
import { LinkedListDataState, VariableType } from '../type/state';
import "../../App.css"
import { generateStateHistory } from './stateGenerator/linkedListGenerator';

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
      <button onClick={onResetLinkedList}>Reset</button>
    </div>
  );
};

export default PlayGround;