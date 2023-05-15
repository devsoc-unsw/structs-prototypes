import React from 'react';
import { State } from '../../state/state';
import DrawableArrayNode from './drawableArrayNode';

type ArrayRendererProps = {
  prevState: State | null;
  nextState: State;
};

const ArrayRenderer: React.FC<ArrayRendererProps> = ({ prevState, nextState }) => {
  const padding = 20;
  const spaceBetweenNodes = 0;
  const rectWidth = 50;
  const rectHeight = 50;

  const renderArrayNodes = () => {
    return nextState.dataStructure.data.map((node, index) => {
      const x = padding + (rectWidth + spaceBetweenNodes) * index;
      const y = padding;
      return (
        <DrawableArrayNode
          key={node.addr}
          node={node}
          x={x}
          y={y}
          width={rectWidth}
          height={rectHeight}
        />
      );
    });
  };

  return (
    <div>
      <svg width="100%" height="100%">{renderArrayNodes()}</svg>
    </div>
  );
};

export default ArrayRenderer;