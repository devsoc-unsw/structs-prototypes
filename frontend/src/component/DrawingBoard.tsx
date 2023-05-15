// Import necessary components and types
import React from 'react';
import { DataStructure, SupportDataType } from './state/state'; // Replace with the actual file name containing your types
import ArrayRenderer from './drawable/drawableArray';
import { State } from './state/state';
// import LinkedListRenderer from './LinkedListRenderer';

type DrawingBoardProps = {
  state: State;
};

const DrawingBoard: React.FC<DrawingBoardProps> = ({state}) => {
  const renderDataStructure = () => {
    switch (state.dataStructure.type) {
      case SupportDataType.ARRAY:
        return <ArrayRenderer arrayData={state.dataStructure} />;
      default:
        return <div>Unsupported data structure type</div>;
    }
  };

  return <div>{renderDataStructure()}</div>;
};

export default DrawingBoard;