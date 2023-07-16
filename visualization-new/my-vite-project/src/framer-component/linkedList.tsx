import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import LinkedNode from './linked-list/node';
import { UiState } from './types/uiState';
import { EntityType, FrontendLinkedListGraph } from './types/graphState';
import Edge from './linked-list/edge';

export interface LinkedListState {
  linkedListState: FrontendLinkedListGraph;
  settings: UiState;
}

const SIZE = 50;

const LinkedList: React.FC<LinkedListState> = ({ linkedListState, settings }) => {
  const [state, setNodes] = useState(linkedListState);
  const nodeRefs = useRef<{
    [uid: string]: SVGSVGElement | null;
  }>({});
  const localGlobalSetting = settings;
  const width = window.innerWidth;
  const height = window.innerHeight;
  useEffect(() => {
    console.log('GraphState changes!!!', linkedListState);
    setNodes(linkedListState);
  }, [linkedListState]);
    
  useEffect(() => {
    console.log('Node update!!');
    if (Object.keys(nodeRefs.current).length === 0) {
      // Initialize it
    } else {
      // First remove the edge, node being removed from graph
      for (const key of Object.keys(nodeRefs.current)) {
        if (state.cacheEntity[key] === undefined) {
          delete nodeRefs.current[key];
        }
      }
  
      // Then add the node, edge to it
      for (const key of Object.keys(state.cacheEntity)) {
        if (nodeRefs.current[key] === undefined) {
          nodeRefs.current[key] = null;
        }
      }
    }
  }, [state]);

  useEffect(() => {
    console.log('settings changes!!!', settings);
    
    ['showHover', 'showClick', 'canDrag', 'debug'].forEach((key) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (settings[key] !== localGlobalSetting[key]) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        localGlobalSetting[key] = settings[key];
      }
    });
    setDrawables(renderNodes());
  }, [settings]);

  const onReload = () => {
    console.log('Reload called? Node should updated?');
    setDrawables(renderNodes());
  }
  const renderNodes = () => {
    return Object.values(state.cacheEntity).map((entity, index) => {
      switch (entity.type) {
        case EntityType.NODE:
          return <LinkedNode
                  ref={(ref) => (nodeRefs.current[index] = ref)}
                  key={entity.uid}
                  nodeUid={entity.uid}
                  graph={state}
                  delay={index + 1}
                  config={settings}
                  onReload={onReload}
                />;
        case EntityType.EDGE:
          return <Edge
                  ref={(ref) => (nodeRefs.current[index] = ref)}
                  key={entity.uid}
                  color="#h122f6"
                  delay={index + 1}
                  graph={state}
                  edgeUid={entity.uid}
                />;
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
