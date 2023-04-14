import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaCopy } from 'react-icons/fa';

interface Props {
  children: string;
}

function CodeBlock({ children }: Props): JSX.Element {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => setCopied(true);

  return (
    <div style={{ position: 'relative' }}>
      <CopyToClipboard text={children} onCopy={handleCopy}>
        <button
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
            border: 'none',
            background: 'none',
            padding: '0.5rem',
            cursor: 'pointer',
          }}
        >
          {!copied && <FaCopy />}
        </button>
      </CopyToClipboard>
      <SyntaxHighlighter language='c' style={dracula}>
        {children}
      </SyntaxHighlighter>
      {copied && (
        <span style={{ position: 'absolute', top: '0', right: '0', color: 'white', paddingTop: '2px', paddingRight: '2px' }}>Copied!</span>
      )}
    </div>
  );
}

export default CodeBlock;
