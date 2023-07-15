import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import LinkedNode from './motion-node/node';
import { Node } from '../component/linkedList';
import { UiState } from './motion-node/controlConfig';

export interface LinkedListState {
  graphState: Node[];
  settings: UiState;
}

const SIZE = 50;

const LinkedList: React.FC<LinkedListState> = ({ graphState, settings }) => {
  const [nodes, setNodes] = useState(graphState);
  const nodeRefs = useRef<(SVGSVGElement | null)[]>([]);
  const width = window.innerWidth;
  const height = window.innerHeight;

  useEffect(() => {
    nodeRefs.current = Array(nodes.length)
      .fill(null)
      .map((_, i) => nodeRefs.current[i] || null);
  }, [nodes]);

  useEffect(() => {
    console.log('GraphState changes!!!', graphState);
    setNodes(graphState);
  }, [graphState]);

  const renderNodes = () => {
    return nodes.map((node, index) => (
      <LinkedNode
        ref={(ref) => (nodeRefs.current[index] = ref)}
        key={node.id}
        position={{ x: node.x, y: node.y }}
        size={SIZE}
        label={node.label}
        color="#e6f7f6"
        delay={index + 1}
        config={settings}
      />
    ));
  };

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      initial="hidden"
      animate="visible"
    >
      {renderNodes()}
    </motion.svg>
  );
};

export default LinkedList;
