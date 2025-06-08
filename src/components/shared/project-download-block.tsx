"use client";

import { motion } from 'framer-motion';
import { Download, FileArchive, FileText } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export function ProjectDownloadBlock({ fileName, manifestJson }: { fileName: string, manifestJson: string }) {
  let files = [];
  try {
    files = JSON.parse(manifestJson);
    if (!Array.isArray(files)) throw new Error("Manifest is not an array.");
  } catch (error) {
    return <div className="p-4 border border-red-500 rounded-md">Error parsing project files from LLM output.</div>;
  }

  const handleDownloadAll = async () => {
    const zip = new JSZip();
    files.forEach((file: any) => {
      const filePath = `${file.path.replace(/^\//, '')}${file.fileName}`;
      zip.file(filePath, file.content);
    });
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, fileName);
  };

  return (
    <motion.div
      className="p-4 my-4 border-2 border-dashed shape-chamfer"
      style={{ borderColor: 'rgb(var(--color-accent-green) / 0.5)', background: 'rgb(var(--color-accent-green) / 0.05)' }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <FileArchive className="text-green-300" />
          <div>
            <p className="font-bold text-gradient" style={{backgroundImage: 'var(--gradient-text-primary)'}}>{fileName}</p>
            <p className="text-xs text-gradient" style={{backgroundImage: 'var(--gradient-text-secondary)'}}>{files.length} files</p>
          </div>
        </div>
        <motion.button onClick={handleDownloadAll} className="px-4 py-2 text-white font-semibold shape-chamfer flex items-center gap-2"
          style={{ background: 'var(--gradient-success)' }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Download size={20}/> Download .zip
        </motion.button>
      </div>
      <div className="max-h-60 overflow-y-auto space-y-1 pr-2 -mr-2 text-sm">
        {files.map((file: any, index: number) => (
          <div key={index} className="flex items-center gap-2 p-1 rounded hover:bg-black/5">
            <FileText size={14} className="flex-shrink-0" />
            <span className="font-mono truncate">{file.path}{file.fileName}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}