import React, { useState } from 'react';
import DrawingBoard from '../DrawingBoard';
import { generateArrayState, generateIncreArrayState } from '../type/arrayDsParser';
import { ArrayDataState, State, VariableType } from '../type/state';
import "../../App.css"

const PlayGround: React.FC = () => {
  const [currState, setEntityData] = useState<ArrayDataState | null>(null);
  const [history, setHistory] = useState<ArrayDataState[]>([]);
  const [example, setExample] = useState<'traverse' | 'sum' | null>(null);

  const onGenerateArray = () => {
    const randomArrayData = generateArrayState();
    setEntityData(randomArrayData);
    setHistory([clone(randomArrayData)]);
  };

  const onIncreGenerateArray = () => {
    const randomArrayData = generateIncreArrayState();
    setEntityData(randomArrayData);
    setHistory([clone(randomArrayData)]);
  };

  const renderExampleButtons = () => {
    return (
      <div>
        <button
          className="btn btn-primary"
          onClick={() => setExample('traverse')}
        >
          Traverse Array Example
        </button>
        <button className="btn btn-primary" onClick={() => setExample('sum')}>
          Sum Example
        </button>
      </div>
    );
  };

  const onResetArray = () => {
    setEntityData(null);
    setHistory([]);
  };const clone = (a: any) => {
    return JSON.parse(JSON.stringify(a));
  }

  const onNextState = () => {
    if (currState) {
      let value = 0;
      for (let variable of currState.variables) {
        let array = currState.dataStructure;
        if (variable.type === VariableType.POINTER) {
          let addr = variable.addr;
          let arrayIndex = array.data.findIndex(
            element => element.addr === addr,
          );

          if (arrayIndex !== -1 && arrayIndex + 1 < array.data.length) {
            variable.addr = array.data[arrayIndex + 1].addr;
            variable.value = array.data[arrayIndex + 1].data as string;
            value = Number(array.data[arrayIndex + 1].data);
          } else {
            return;
          }
          setEntityData(currState);
        } else {
          // Sum up the value
          variable.value = (Number(variable.value) + value).toString();
          setEntityData(currState);
          setHistory([...history, clone(currState)]);
        }
      }
    }
  };

  const onPreviousState = () => {
    if (history.length > 1) {
      const previousHistory = history.slice(0, -1);
      setHistory(clone(previousHistory));
      console.log('Histroy state', previousHistory[previousHistory.length - 1])
      setEntityData(clone(previousHistory[previousHistory.length - 1]));
    }
  }

  const onDebug = () => {
    console.log(history);
  }

  const prevState = history.length > 1 ? history[history.length - 2] : null;
  const nextState = currState;

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
          style={{ padding: '10px' }}
          disabled={currState !== null}
        >
          Generate Traverse Array Example
        </button>
        <button
          className="btn btn-primary"
          onClick={onIncreGenerateArray}
          style={{ margin: '10px' }}
          disabled={currState !== null}
        >
          Generate Sum Example
        </button>
        <button className="btn btn-warning" onClick={onResetArray} style={{ margin: '10px' }}>
          Reset Array
        </button>
        <button className="btn btn-success" onClick={onNextState} style={{ margin: '10px' }}>
          Next State
        </button>
        <button className="btn btn-info" onClick={onPreviousState} style={{ margin: '10px' }}>
          Previous State
        </button>
        <button className="btn btn-info" onClick={onDebug} style={{ margin: '10px' }}>
          Debug
        </button>
      </div>
    </div>
  );
};

export default PlayGround;