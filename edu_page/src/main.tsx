import React from 'react';
import { createRoot } from 'react-dom/client';
import { Question } from './types';
import LinkedLists from './edu_pages/linkedLists.mdx';
import CodeBlock from './CodeBlock';
import Roadmap from './Roadmap'

//wrapper component for all components. can add more.
const Wrapper = () => (
  <>
    <CodeBlock>int main</CodeBlock>
    <Roadmap />
    <LinkedLists />
  </>
);

//renders the wrapper component
const targetContainer = document.getElementById('root');
if (targetContainer) {
  const root = createRoot(targetContainer);
  root.render(<Wrapper />);
  
} else {
  console.error('Could not find targetContainer!');
}