import { motion } from 'framer-motion';
import React, { forwardRef } from 'react';
import { EdgeEntity } from '../types/graphState';

interface EdgeProps {
  edge: EdgeEntity;
  color: string;
  delay: number;
}

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: i * 0.2, duration: 0.5, ease: 'easeInOut' },
      opacity: { delay: i * 0.2, duration: 0.01 }
    }
  }),
};

const createArrowMarker = (id: string, color: string) => (
  <marker
    id={id}
    markerWidth="2.67" // 8 / 3 = 2.67
    markerHeight="2.67" // 8 / 3 = 2.67
    refX="0"
    refY="1" // 3 / 3 = 1
    orient="auto"
    markerUnits="strokeWidth"
  >
    <path d="M0,0 L0,2 L3,1 z" fill={color} />  // coordinates are divided by 3
  </marker>
);

const Edge = forwardRef<SVGSVGElement, EdgeProps>(
  ({ edge, color, delay }, ref) => {
    const markerId = `arrow-${edge.uid}`;

    return (
      <motion.g
        ref={ref}
        custom={delay}
        variants={draw}
        initial="hidden"
        animate="visible"
      >
        <defs>
          {createArrowMarker(markerId, '#DE3163')}
        </defs>
        <motion.line
          x1={edge.from.x + 60}
          y1={edge.from.y}
          x2={edge.to.x - 75}
          y2={edge.to.y}
          stroke={'#DE3163'}
          strokeWidth={6}
          custom={2}
          variants={draw}
          markerEnd={`url(#${markerId})`}
        />
      </motion.g>
    );
  }
);

export default Edge;