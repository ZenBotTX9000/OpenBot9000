"use client";

import { FileDownloadBlock } from './file-download-block';
import { ProjectDownloadBlock } from './project-download-block';
import { StyledCodeBlock } from './styled-code-block';

export function SmartCodeBlock(props: any) {
  const { className } = props;
  const projectMatch = /language-project:(\S+\.zip)/.exec(className || '');
  const fileMatch = /language-file:(\S+)/.exec(className || '');

  const content = String(props.children).replace(/\n$/, '');

  if (projectMatch) {
    return <ProjectDownloadBlock fileName={projectMatch[1]} manifestJson={content} />;
  }
  if (fileMatch) {
    return <FileDownloadBlock fileName={fileMatch[1]} content={content} />;
  }
  
  return <StyledCodeBlock {...props} />;
}