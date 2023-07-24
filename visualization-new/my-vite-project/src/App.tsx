import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForceDirectedGraph, { Link, Node } from "./component/linkedList";
import { useState, useEffect } from "react";
import { DrawingMotions } from "./framer-component/drawingMotion";
import { BackendLinkedList } from "./framer-component/types/graphState";
import { IMAGINARY_STATE_1 } from "./imaginaryState";

const initialNodes: Node[] = [
  // add your nodes here
  { id: "1", label: "Node 1", x: 50, y: 100 },
  { id: "2", label: "Node 2", x: 200, y: 100 },
];

const nodesHistory: Node[][] = [
  [
    // add your nodes here
    { id: "1", label: "Node 1", x: 50, y: 100 },
    { id: "2", label: "Node 2", x: 200, y: 100 },
  ],
  [
    // add your nodes here
    { id: "1", label: "Node 1", x: 50, y: 100 },
    { id: "2", label: "Node 2", x: 350, y: 150 },
  ],
  [
    // add your nodes here
    { id: "1", label: "Node 1", x: 50, y: 100 },
    { id: "2", label: "Node 2", x: 450, y: 150 },
    { id: "3", label: "Node 3", x: 200, y: 100 },
  ],
  [
    // add your nodes here
    { id: "1", label: "Node 1", x: 50, y: 100 },
    { id: "2", label: "Node 2", x: 450, y: 100 },
    { id: "3", label: "Node 3", x: 200, y: 100 },
  ],
];

const links: Link[] = [
  // add your links here
  { source: "1", target: "2", strength: 0.7 },
];

const width = 800; // specify width here
const height = 600; // specify height here

const initialBackendState: BackendLinkedList = {
  nodes: [
    {
      nodeId: "0x000001",
      value: "Node 1",
      next: "0x000002",
    },
    {
      nodeId: "0x000002",
      value: "Node 2",
      next: "0x000003",
    },
    {
      nodeId: "0x000003",
      value: "Node 3",
      next: "0x000004",
    },
    {
      nodeId: "0x000004",
      value: "Node 4",
      next: null,
    },
  ],
};

const states: BackendLinkedList[] = [
  {
    nodes: [
      {
        nodeId: "0x000001",
        value: "Node 1",
        next: "0x000002",
      },
      {
        nodeId: "0x000002",
        value: "Node 2",
        next: "0x000003",
      },
      {
        nodeId: "0x000003",
        value: "Node 3",
        next: "0x000004",
      },
      {
        nodeId: "0x000004",
        value: "Node 4",
        next: null,
      },
    ],
  },
  {
    nodes: [
      {
        nodeId: "0x000001",
        value: "Node 1",
        next: "0x000002",
      },
      {
        nodeId: "0x000002",
        value: "Node 2",
        next: "0x000003",
      },
      {
        nodeId: "0x000003",
        value: "Node 3",
        next: "0x000004",
      },
      {
        nodeId: "0x000004",
        value: "Node 4",
        next: null,
      },
    ],
  },
]

const RoutesComponent = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [framerNodes, setFramerNodes] = useState(initialBackendState);

  useEffect(() => {
    const timeout = setTimeout(() => {
      for (let i = 0; i < nodesHistory.length; i++) {
        setTimeout(() => {
          setNodes(nodesHistory[i]);
        }, i * 1000);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  let idx = 0;
  const handleButtonClick = () => {
    // logic to update framerNodes
    idx += 1;
    setFramerNodes(IMAGINARY_STATE_1[idx]);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ForceDirectedGraph
              nodes={nodes}
              links={links}
              width={width}
              height={height}
            />
          }
        />
        <Route
          path="/linked-node"
          element={
            <DrawingMotions state={framerNodes} nextState={handleButtonClick}/>
          }
        />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
