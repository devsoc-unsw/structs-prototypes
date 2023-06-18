import React, { useState } from 'react';
import { LinkedListDataState, VariableType } from '../type/state';
import "../../App.css"
import { generateStateHistory } from './stateGenerator/linkedListGenerator';
import { parseLinkedListState } from '../stateParser/parser';
import drawableFactory, { DrawableComponent, DrawableElement } from '../drawable/drawable';
import { element } from 'prop-types';
import ReactJson from 'react-json-view'

const PlayGround: React.FC = () => {
  let [liveHistory, setData] = useState<LinkedListDataState[]>([]);
  let [idx, setIdx] = useState<number>(0);
  const onResetLinkedList = () => {
    setData(generateStateHistory(5, 5));
    setIdx(0);
  };

  let getHistroyJson = () => {
    return liveHistory.map((historyState) => {
      let dup = JSON.parse(JSON.stringify(historyState)) as any;
      dup.dataStructure.data = Array.from(historyState.dataStructure.data);
      return dup;
    })
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

      {/* JSON viewer */}
      <div>
        <h2>State History:</h2>
        <ReactJson src={getHistroyJson()} theme="monokai" />
      </div>
    </div>
  );
};

export default PlayGround;