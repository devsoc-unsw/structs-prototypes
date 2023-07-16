import { motion } from "framer-motion";
import { forwardRef, useState } from "react";
import { UiState } from "../types/uiState";

interface Position {
  x: number;
  y: number;
}

interface NodePros {
  position: Position;
  color: string;
  delay: number;
  label: string;
  size: number;
  config: UiState;
  onAddNode?: () => void;
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
        duration: 0.5,
      },
    };
  },
  x: {
    transition: { duration: 3 },
  },
  y: {
    transition: { duration: 3 },
  },
};

const LinkedNode = forwardRef<SVGSVGElement, NodePros>(
  ({ position, color, delay, label, size, onAddNode, config }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showAddButton, setShowAddButton] = useState(false);

    const showHover = () => {
      return config.showHover && isHovered && !showAddButton;
    }
    const showClick = () => {
      return config.showClick && showAddButton;
    }

    const dragProps: Partial<{ drag: boolean | "x" | "y"; dragConstraints: { left: number; right: number; top: number; bottom: number }, dragMomentum: boolean }> = config.canDrag ? {
      drag: true,
      dragConstraints: {
        left: 0,
        top: 0,
        right: 1000, // change to your desired area width
        bottom: 1000, // change to your desired area height
      },
      dragMomentum: false
    } : {}
  
    return (
      <motion.g
        ref={ref}
        initial={{ x: position.x, y: position.y }}
        animate={{ x: position.x, y: position.y }}
        transition={{ x: "x", y: "y" }}
        {...dragProps}
        onHoverStart={() => {
          setIsHovered(true);
        }}
        onHoverEnd={() => {
          setIsHovered(false);
        }}
        onClick={() => {
          setIsHovered(false);
          setShowAddButton(!showAddButton);
        }}
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

        
        {showHover() && ( // Refactor to according to uiState, to have different hover, click, etc. effects
          <motion.foreignObject
            width={250}
            height={350}
            x={size + 10}
            y={-50}
            style={{ zIndex: 1000 }}
          >
            <div
              style={{
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "250px",
                padding: "10px",
                overflow: "auto",
                boxSizing: "border-box",
                border: "2px solid black",
              }}
            >
              <pre style={{ margin: 0 }}>
                {JSON.stringify(
                  { position, color, delay, label, size },
                  null,
                  2
                )}
              </pre>
            </div>
          </motion.foreignObject>
        )}

        {showClick() && (
          <motion.a
            whileTap={{ scale: 0.9 }}
            onClick={(event) => {
              event.stopPropagation();
              setShowAddButton(false);
              onAddNode && onAddNode();
            }}
          >
            <motion.circle
              cx={size + 20}
              cy={0}
              r={20}
              fill="#727272"
              stroke="white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            ></motion.circle>
            <motion.text
              x={size + 20}
              y={0}
              textAnchor="middle"
              fill="white"
              dy=".3em"
              fontSize="20px"
            >
              +
            </motion.text>
          </motion.a>
        )}
      </motion.g>
    );
  }
);

export default LinkedNode;
