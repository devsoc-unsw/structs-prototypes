import React from 'react';
import { State } from '../../state/state';
import DrawableArrayNode from './drawableArrayNode';
import DrawableVariable from './drawableVaraible';

type ArrayRendererProps = {
  prevState: State | null;
  nextState: State;
};

const ArrayRenderer: React.FC<ArrayRendererProps> = ({
  prevState,
  nextState,
}) => {
  const padding = 20;
  const spaceBetweenNodes = 0;
  const rectWidth = 50;
  const rectHeight = 50;

  const renderArrayNodes = () => {
    return nextState.dataStructure.data.map((node, index) => {
      const x = padding + (rectWidth + spaceBetweenNodes) * index;
      const y = padding;
      const delay = index * 100; // Adjust this value to change the delay between nodes
      return (
        <DrawableArrayNode
          key={node.addr}
          node={node}
          x={x}
          y={y}
          width={rectWidth}
          height={rectHeight}
          delay={delay}
        />
      );
    });
  };

  const renderVariable = () => {
    const variable = nextState.variables[0];
    if (!variable) return null;

    const targetNode = nextState.dataStructure.data.find(
      node => node.addr === variable.addr,
    );
    if (!targetNode) return null;

    const index = nextState.dataStructure.data.indexOf(targetNode);
    const x = padding + (rectWidth + spaceBetweenNodes) * index + rectWidth / 2 - 5;
    const y = 1.5 * padding + rectHeight;

    return <DrawableVariable x={x} y={y} label={variable.name} />;
  };

  return (
    <div>
      <svg width="100%" height="100%">
        {renderArrayNodes()}
        {renderVariable()}
      </svg>
    </div>
  );
};

export default ArrayRenderer;
