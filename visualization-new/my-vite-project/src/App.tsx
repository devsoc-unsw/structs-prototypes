import React from 'react';
import ForceDirectedGraph, { Node, Link } from './component/linkedList';


// In app.ts, it manages the node's data
// If there's an update, it will update the frontend node's data
// and pass it into your component
const App: React.FC = () => {
  const nodes: Node[] = [
    // add your nodes here
    { id: "1", label: "Node 1", x: 0, y: 0 },
    { id: "2", label: "Node 2", x: 100, y: 100 },
    // ...
  ];

  const links: Link[] = [
    // add your links here
    { source: "1", target: "2", strength: 0.7 },
  ];

  const width = 800; // specify width here
  const height = 600; // specify height here

  return (
    <ForceDirectedGraph nodes={nodes} links={links} width={width} height={height} />
  );
}

export default App;