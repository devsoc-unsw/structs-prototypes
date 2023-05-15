import React from 'react';
import './drawableVariable.css';

type DrawableVariableProps = {
  x: number;
  y: number;
  label: string;
};

const DrawableVariable: React.FC<DrawableVariableProps> = ({ x, y, label }) => {
  const arrowSize = 10;
  const labelYOffset = 20;

  return (
    <g className="variable" transform={`translate(${x}, ${y})`}>
      <path
        className="arrow"
        d={`M 0 ${arrowSize} L ${
          arrowSize / 2
        } 0 L ${arrowSize} ${arrowSize} Z`}
        fill="#000"
      />
      <text
        x={arrowSize / 2}
        y={labelYOffset}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="14"
      >
        {label}
      </text>
    </g>
  );
};

export default DrawableVariable;
