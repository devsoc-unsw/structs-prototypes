import { motion } from "framer-motion";
import { forwardRef } from "react";

interface Position {
  x: number;
  y: number;
}

interface LinkedNodeProps {
  position: Position;
  color: string;
  delay: number;
  label: string;
  size: number;
}

const draw = {
  hidden: { opacity: 0 },
  visible: (i: number) => {
    const delay = 1 + i * 0.5;
    return {
      opacity: 1,
      transition: {
        delay,
        type: "spring",
        bounce: 0,
        duration: 0.5, // Set the duration to 0.5 seconds when created
      },
    };
  },
  x: {
    transition: { duration: 3 }, // Set the duration to 3 seconds for x changes
  },
  y: {
    transition: { duration: 3 }, // Set the duration to 3 seconds for y changes
  },
};

const LinkedNode = forwardRef<SVGSVGElement, LinkedNodeProps>(
  ({ position, color, delay, label, size }, ref) => {
    return (
      <motion.g
        ref={ref}
        initial={{ x: position.x, y: position.y }}
        animate={{ x: position.x, y: position.y }}
        transition={{ x: "x", y: "y" }}
      >
        <motion.circle
          cx={0}
          cy={0}
          r={size}
          stroke={color}
          variants={draw}
          initial="hidden"
          animate="visible"
          custom={delay}
        />
        <motion.text
          x={0}
          y={0}
          textAnchor="middle"
          fill={color}
          dy=".3em"
          fontSize="20px"
          initial="hidden"
          animate="visible"
          variants={draw}
          custom={delay}
        >
          {label}
        </motion.text>
      </motion.g>
    );
  }
);

export default LinkedNode;
