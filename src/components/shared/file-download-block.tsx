"use client";

import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';

export function FileDownloadBlock({ fileName, content }: { fileName: string, content: string }) {
  const handleDownload = () => {
    const blob = new Blob([content], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      className="p-4 my-4 border-2 border-dashed flex items-center justify-between shape-chamfer"
      style={{ borderColor: 'rgb(var(--color-accent-blue) / 0.5)', background: 'rgb(var(--color-accent-blue) / 0.05)' }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="flex items-center gap-3">
        <FileText className="text-blue-300" />
        <div>
          <p className="font-bold text-gradient" style={{backgroundImage: 'var(--gradient-text-primary)'}}>{fileName}</p>
          <p className="text-xs text-gradient" style={{backgroundImage: 'var(--gradient-text-secondary)'}}>{content.length} bytes</p>
        </div>
      </div>
      <motion.button onClick={handleDownload} className="px-4 py-2 text-white font-semibold shape-chamfer"
        style={{ background: 'var(--gradient-action)' }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Download size={20}/>
      </motion.button>
    </motion.div>
  );
}