import React, { useState } from 'react';
import { LinkedListDataState, VariableType } from '../type/state';
import "../../App.css"
import { generateStateHistory } from './stateGenerator/linkedListGenerator';
import { parseLinkedListState } from '../stateParser/parser';
import drawableFactory, { DrawableComponent, DrawableElement } from '../drawable/drawable';
import { element } from 'prop-types';

const PlayGround: React.FC = () => {
  const [currState, setCurrState] = useState<LinkedListDataState | null>(null);
  const [history, setHistory] = useState<LinkedListDataState[]>([]);

  let [data, setData] = useState<LinkedListDataState[]>([]);
  let [idx, setIdx] = useState<number>(0);
  const onResetLinkedList = () => {
    setCurrState(null);
    setHistory([]);
    setDrawables(new Map());

    setData(generateStateHistory(5, 5));
    setIdx(0);
    console.log(data);
  };

  const onParse = () => {
    debugger;
    console.log(parseLinkedListState(data[idx]));
  }

  const [drawables, setDrawables] = useState<Map<string, DrawableComponent>>(new Map());
  const onRender = () => {
    let drawableNodes = parseLinkedListState(data[idx]);
    if (drawableNodes === null) {
      return;
    }
  
    // Create a copy of drawables
    let updatedDrawables = new Map(drawables);
    console.log(updatedDrawables, drawableNodes);
  
    for (let node of drawableNodes) {
      if (updatedDrawables.has(node.uid)) {
        let currDrawable = updatedDrawables.get(node.uid);
        if (currDrawable === undefined) {
          continue;
        }
        currDrawable.nextState(node);
      } else {
        let element = drawableFactory(node);
        updatedDrawables.set(node.uid, element);
        element.create(node);
      }
    }
  
    // Update the state using setDrawables
    setDrawables(updatedDrawables);
    console.log(drawables);
    setIdx((idx) => idx++);
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
      {/* Render the DrawableComponents */}
      <svg style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {Array.from(drawables.values()).map((component, index) => (
          <React.Fragment key={index}>{component.ownRender()}</React.Fragment>
        ))}
      </svg>
    </div>
  );
};

export default PlayGround;