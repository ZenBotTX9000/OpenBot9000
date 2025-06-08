"use client";

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export function StyledCodeBlock({ node, inline, className, children, ...props }: any) {
  const [isCopied, setIsCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  const textToCopy = String(children).replace(/\n$/, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return !inline && match ? (
    <div className="relative group my-4 shape-chamfer overflow-hidden">
      <div className="flex justify-between items-center px-4 py-1.5 text-xs text-gray-300" style={{ background: '#21232A' }}>
        <span>{language}</span>
        <button onClick={handleCopy} className="flex items-center gap-1">
          {isCopied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
          {isCopied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        style={oneDark}
        language={language}
        PreTag="div"
        customStyle={{ margin: 0, background: '#282C34' }}
        {...props}
      >
        {textToCopy}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code className="px-1 py-0.5 rounded-sm text-sm" style={{ background: 'rgb(var(--color-grey-800)/0.1)', color: 'rgb(var(--color-accent-gold))' }} {...props}>
      {children}
    </code>
  );
}