import React, { useRef, useEffect } from 'react';
import { SVG } from '@svgdotjs/svg.js';
import { ArrayDataStructure } from '../state/state'; // Replace with the actual file name containing your types

type ArrayRendererProps = {
  arrayData: ArrayDataStructure;
};

const ArrayRenderer: React.FC<ArrayRendererProps> = ({ arrayData }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const draw = SVG().addTo(containerRef.current).size('100%', '100%');
    const arrayDataNodes = arrayData.data;
    const padding = 10;
    const rectWidth = 50;
    const rectHeight = 50;

    arrayDataNodes.forEach((element, index) => {
      const x = padding + (rectWidth + padding) * index;
      const y = padding;

      // Draw a rectangle for each array element
      const rect = draw.rect(rectWidth, rectHeight).move(x, y).fill('#f06');

      // Add the element value as text inside the rectangle
      draw.text(element.data.toString()).move(x + rectWidth / 2, y + rectHeight / 2).font({ anchor: 'middle', size: 14 });
    });
  }, [arrayData]);

  return <div ref={containerRef}></div>;
};

export default ArrayRenderer;