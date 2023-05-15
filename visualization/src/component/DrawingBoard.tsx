// Import necessary components and types
import React, { useEffect } from 'react';
import { SupportDataType } from './state/state'; // Replace with the actual file name containing your types
import ArrayRenderer from './drawable/array/drawableArray';
import { State } from './state/state';

type DrawingBoardProps = {
  prevState: State | null;
  nextState: State;
};

const DrawingBoard: React.FC<DrawingBoardProps> = ({
  prevState,
  nextState,
}) => {
  const renderDataStructure = () => {
    switch (nextState.dataStructure.type) {
      case SupportDataType.ARRAY:
        return <ArrayRenderer prevState={prevState} nextState={nextState} />;
      default:
        return <div>Unsupported data structure type</div>;
    }
  };

  return <div>{renderDataStructure()}</div>;
};

export default DrawingBoard;
