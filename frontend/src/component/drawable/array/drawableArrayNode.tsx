import React from 'react';
import { ArrayNode } from '../../state/state';

type DrawableArrayNodeProps = {
  node: ArrayNode;
  x: number;
  y: number;
  width: number;
  height: number;
};

const DrawableArrayNode: React.FC<DrawableArrayNodeProps> = ({
  node,
  x,
  y,
  width,
  height,
}) => {
  const gridlineColor = 'black';
  const gridlineWidth = 2;

  return (
    <g>
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