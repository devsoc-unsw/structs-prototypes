import React from 'react';
import { State, VariableType } from '../../type/state';
import DrawableArrayNode from './drawableArrayNode';
import DrawableVariable from './drawableVaraible';
import DrawableIntVariable from './textVariable';



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

  let nonPointerVarY = 140;
  const renderVariable = () => {
    return nextState.variables.map((variable) => {
      switch (variable.type) {
        case VariableType.POINTER:
          const targetNode = nextState.dataStructure.data.find(
            (node) => node.addr === variable.addr
          );
          if (!targetNode) return null;
      
          const index = nextState.dataStructure.data.indexOf(targetNode);
          const x =
            padding + (rectWidth + spaceBetweenNodes) * index + rectWidth / 2 - 5;
          const y = 1.5 * padding + rectHeight;
      
          return <DrawableVariable key={variable.name} x={x} y={y} label={variable.name} />;
        case VariableType.INT:
          const intX = 2.5 * padding;
          const intY = 2 * padding + nonPointerVarY;
          nonPointerVarY += 20
  
          console.log('Here', `${variable.name}: ${variable.value}`);
          return (
            <DrawableIntVariable
              key={variable.name}
              x={intX}
              y={intY}
              label={variable.name}
              value={variable.value}
            />
          );
      }
    });
  };

  const svgHeight = 3 * padding + rectHeight + nonPointerVarY;
  let userVarHeaderY = 150;
  const renderUserVarTitle = () => (
    <text
      x={padding}
      y={userVarHeaderY}
      fontSize="19"
      textAnchor="start"
      dominantBaseline="central"
      fill="black"
    >
      User Variables:
    </text>
  );

  return (
    <div>
      <svg width="100%" height={svgHeight}>
        {renderArrayNodes()}
        {renderUserVarTitle()}
        {renderVariable()}
      </svg>
    </div>
  );
};

export default ArrayRenderer;