import React, { useEffect, useState } from 'react';
import { ArrayNode } from '../../state/state';
import './drawableArrayNode.css';

type DrawableArrayNodeProps = {
  node: ArrayNode;
  x: number;
  y: number;
  width: number;
  height: number;
  delay: number;
};

const DrawableArrayNode: React.FC<DrawableArrayNodeProps> = ({
  node,
  x,
  y,
  width,
  height,
  delay,
}) => {
  const gridlineColor = 'black';
  const gridlineWidth = 2;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay]);

  return (
    <g className={`arrayNode ${visible ? 'visible' : ''}`}
    style={{
      transitionDelay: `${delay}ms`,
    }}>
      <line
        x1={x}
        y1={y}
        x2={x + width}
        y2={y}
        stroke={gridlineColor}
        strokeWidth={gridlineWidth}
      />
      <line
        x1={x}
        y1={y + height}
        x2={x + width}
        y2={y + height}
        stroke={gridlineColor}
        strokeWidth={gridlineWidth}
      />
      <line
        x1={x}
        y1={y}
        x2={x}
        y2={y + height}
        stroke={gridlineColor}
        strokeWidth={gridlineWidth}
      />
      <line
        x1={x + width}
        y1={y}
        x2={x + width}
        y2={y + height}
        stroke={gridlineColor}
        strokeWidth={gridlineWidth}
      />
      <rect x={x} y={y} width={width} height={height} fill="#9eaded" />
      <text
        x={x + width / 2}
        y={y + height / 2}
        fontSize="14"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {node.data.toString()}
      </text>
    </g>
  );
};

export default DrawableArrayNode;