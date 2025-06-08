"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SmartCodeBlock } from './smart-code-block';
import { StyledTable } from './styled-table';

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className="prose prose-sm max-w-none text-gradient"
      style={{ backgroundImage: 'var(--gradient-text-primary)' }}
      components={{
        code: (props) => <SmartCodeBlock {...props} />,
        table: (props) => <StyledTable {...props} />,
        a: ({node, ...props}) => <a {...props} className="font-bold text-gradient" style={{backgroundImage: 'var(--gradient-text-accent)'}}/>
      }}
    >
      {content || '​'}
    </ReactMarkdown>
  );
}