import React from 'react';
import { ArrayDataState, SupportDataType } from './type/state';
import ArrayRenderer from './drawable/array/drawableArray';
import { State } from './type/state';

type DrawingBoardProps = {
  prevState: State | null;
  nextState: State;
};

const DrawingBoard: React.FC<DrawingBoardProps> = ({ prevState, nextState }) => {
  const renderDataStructure = () => {
    switch (nextState.dataStructure.type) {
      case SupportDataType.ARRAY:
        return <ArrayRenderer prevState={prevState as ArrayDataState} nextState={nextState as ArrayDataState} />;
      default:
        return <div>Unsupported data structure type</div>;
    }
  };

  const prettifyJSON = (state: State | null) => {
    return state ? JSON.stringify(state, null, 2) : '';
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flexGrow: 1 }}>{renderDataStructure()}</div>
      <pre style={{ flexGrow: 1, backgroundColor: '#f8f8f8', padding: '1rem' }}>
        {prettifyJSON(nextState)}
      </pre>
    </div>
  );
};

export default DrawingBoard;
