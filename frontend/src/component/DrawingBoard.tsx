// Import necessary components and types
import React, { useEffect } from 'react';
import { SupportDataType } from './state/state'; // Replace with the actual file name containing your types
import ArrayRenderer from './drawable/drawableArray';
import { State } from './state/state';


type DrawingBoardProps = {
  prevState: State | null;
  nextState: State;
};

const DrawingBoard: React.FC<DrawingBoardProps> = ({ prevState, nextState }) => {
  useEffect(() => {
    if (prevState && nextState) {
      // Perform the necessary actions when the state changes
      console.log('Previous state:', prevState);
      console.log('Next state:', nextState);
    }
  }, [prevState, nextState]);

  const renderDataStructure = () => {
    switch (nextState.dataStructure.type) {
      case SupportDataType.ARRAY:
        return <ArrayRenderer arrayData={nextState.dataStructure} />;
      default:
        return <div>Unsupported data structure type</div>;
    }
  };

  return <div>{renderDataStructure()}</div>;
};

export default DrawingBoard;
