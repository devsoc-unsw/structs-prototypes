import React, { useState } from 'react';
import DrawingBoard from './component/DrawingBoard';
import { generateArrayState } from './component/state/arrayDsParser';
import { State } from './component/state/state';

const App: React.FC = () => {
  const [entityData, setEntityData] = useState<State | null>(null);
  const [history, setHistory] = useState<State[]>([]);

  const onGenerateArray = () => {
    const randomArrayData = generateArrayState();
    setEntityData(randomArrayData);
  };

  const onResetArray = () => {
    setEntityData(null);
  };

  const onNextState = () => {
    if (entityData) {
      let variable = entityData.variables;
      
      let array = entityData.dataStructure;
      let arrayIndex = array.data.findIndex((element) => element.addr === variable[0].addr);
      
      if (arrayIndex !== -1 && arrayIndex + 1 < array.data.length) {
        variable[0].addr = array.data[arrayIndex + 1].addr;
      }
      console.log('Set entity', entityData.variables);
      setHistory([...history, entityData]);
      setEntityData(entityData);
    } 
  };

  const debug = () => {
    console.log(entityData);
  }

  const prevState = history.length > 1 ? history[history.length - 2] : null;
  const nextState = entityData;

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
        Playground
      </h1>
      <div style={{ flex: '0 0 80%', overflow: 'auto' }}>
        {nextState && (
          <DrawingBoard prevState={prevState} nextState={nextState} />
        )}
      </div>
      <div
        style={{
          flex: '0 0 20%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <button
          className="btn btn-primary"
          onClick={onGenerateArray}
          disabled={entityData !== null}
        >
          Generate Array
        </button>
        <button className="btn btn-warning" onClick={onResetArray}>
          Reset Array
        </button>
        <button className="btn btn-success" onClick={onNextState}>
          Next State
        </button>
        <button className="btn btn-secondary" onClick={debug}>
          Debug
        </button>
      </div>
    </div>
  );
};

export default App;
