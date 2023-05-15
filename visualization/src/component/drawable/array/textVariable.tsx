import React, { useState, useEffect } from 'react';
import './appearingText.css';

type DrawableIntVariableProps = {
  x: number;
  y: number;
  label: string;
  value: string;
};

const DrawableIntVariable: React.FC<DrawableIntVariableProps> = ({
  x,
  y,
  label,
  value,
}) => {
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    setChanged(true);
    const timer = setTimeout(() => setChanged(false), 1000);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <g className="variable">
      <text
        x={x}
        y={y}
        fontSize="16"
        textAnchor="middle"
        dominantBaseline="central"
        fill="black"
      >
        <tspan>{`${label}: `}</tspan>
        <tspan className={`text-value${changed ? ' changed' : ''}`}>{value}</tspan>
      </text>
    </g>
  );
};

export default DrawableIntVariable;