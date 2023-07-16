import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import LinkedNode from './linked-list/node';
import { UiState } from './types/uiState';
import { EntityType, FrontendLinkedListGraph } from './types/graphState';

export interface LinkedListState {
  linkedListState: FrontendLinkedListGraph;
  settings: UiState;
}

const SIZE = 50;

const LinkedList: React.FC<LinkedListState> = ({ linkedListState, settings }) => {
  const [nodes, setNodes] = useState(linkedListState);
  const nodeRefs = useRef<{
    [uid: string]: SVGSVGElement | null;
  }>({});
  const width = window.innerWidth;
  const height = window.innerHeight;

  useEffect(() => {
    if (Object.keys(nodeRefs.current).length === 0) {
      // Initialize it
    } else {
      // First remove the edge, node being removed from graph
      for (const key of Object.keys(nodeRefs.current)) {
        if (nodes.cacheEntity[key] === undefined) {
          delete nodeRefs.current[key];
        }
      }

      // Then add the node, edge to it
      for (const key of Object.keys(nodes.cacheEntity)) {
        if (nodeRefs.current[key] === undefined) {
          nodeRefs.current[key] = null;
        }
      }
    }
  }, [nodes]);

  useEffect(() => {
    console.log('GraphState changes!!!', linkedListState);
    setNodes(linkedListState);
  }, [linkedListState]);

  useEffect(() => {
    console.log('settings changes!!!', settings);
    setDrawables(renderNodes());
  }, [settings]);

  const renderNodes = () => {
    return Object.values(nodes.cacheEntity).map((node, index) => {
      switch (node.type) {
        case EntityType.NODE:
          return <LinkedNode
                  ref={(ref) => (nodeRefs.current[index] = ref)}
                  key={node.uid}
                  position={{ x: node.x, y: node.y }}
                  size={SIZE}
                  label={node.title}
                  color="#e6f7f6"
                  delay={index + 1}
                  config={settings}
                />;
        case EntityType.EDGE:
          return <></>;
      }
    });
  };

  const [drawables, setDrawables] = useState<JSX.Element[]>(renderNodes());

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      initial="hidden"
      animate="visible"
    >
      {drawables}
    </motion.svg>
  );
};

export default LinkedList;
