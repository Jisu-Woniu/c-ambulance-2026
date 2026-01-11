'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Copy, Check, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language = 'c', className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const lines = code.split('\n');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className={cn(
        'group relative overflow-hidden rounded-xl bg-zinc-900 text-zinc-100 shadow-2xl ring-1 ring-white/10',
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-zinc-700/50 bg-zinc-800/80 px-4 py-2.5 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <motion.div 
              className="h-3 w-3 rounded-full bg-red-500" 
              whileHover={{ scale: 1.2 }}
            />
            <motion.div 
              className="h-3 w-3 rounded-full bg-yellow-500" 
              whileHover={{ scale: 1.2 }}
            />
            <motion.div 
              className="h-3 w-3 rounded-full bg-green-500" 
              whileHover={{ scale: 1.2 }}
            />
          </div>
          <Badge variant="secondary" className="text-[10px] font-mono uppercase">
            <Terminal className="h-3 w-3" />
            {language}
          </Badge>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleCopy}
              className="opacity-0 transition-opacity group-hover:opacity-100"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Check className="h-4 w-4 text-green-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Copy className="h-4 w-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{copied ? '已复制!' : '复制代码'}</TooltipContent>
        </Tooltip>
      </div>
      <div className="overflow-x-auto p-4">
        <pre className="text-sm leading-relaxed md:text-base">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.02, duration: 0.3 }}
              className="flex hover:bg-white/5"
            >
              <span className="mr-4 w-8 select-none text-right text-zinc-600">
                {i + 1}
              </span>
              <code className="flex-1 whitespace-pre">
                {highlightSyntax(line, language)}
              </code>
            </motion.div>
          ))}
        </pre>
      </div>
      <motion.div 
        className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      />
    </motion.div>
  );
}

function highlightSyntax(line: string, language: string): React.ReactNode {
  if (language === 'text') {
    return <span>{line}</span>;
  }

  const keywords = /\b(int|char|float|double|void|return|if|else|for|while|do|switch|case|break|continue|default|struct|static|const|sizeof|typedef|enum|long|short|unsigned|signed|auto|register|extern|include|define|ifdef|ifndef|endif|undef|NULL)\b/g;
  const strings = /(["'])(?:(?=(\\?))\2.)*?\1/g;
  const comments = /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm;
  const numbers = /\b(\d+\.?\d*|0x[0-9a-fA-F]+)\b/g;
  const preprocessor = /^(#\w+)/g;

  const segments: { start: number; end: number; type: string; text: string }[] = [];

  let match;
  while ((match = comments.exec(line)) !== null) {
    segments.push({ start: match.index, end: match.index + match[0].length, type: 'comment', text: match[0] });
  }

  while ((match = strings.exec(line)) !== null) {
    if (!isOverlapping(segments, match.index, match.index + match[0].length)) {
      segments.push({ start: match.index, end: match.index + match[0].length, type: 'string', text: match[0] });
    }
  }

  while ((match = preprocessor.exec(line)) !== null) {
    if (!isOverlapping(segments, match.index, match.index + match[0].length)) {
      segments.push({ start: match.index, end: match.index + match[0].length, type: 'preprocessor', text: match[0] });
    }
  }

  while ((match = keywords.exec(line)) !== null) {
    if (!isOverlapping(segments, match.index, match.index + match[0].length)) {
      segments.push({ start: match.index, end: match.index + match[0].length, type: 'keyword', text: match[0] });
    }
  }

  while ((match = numbers.exec(line)) !== null) {
    if (!isOverlapping(segments, match.index, match.index + match[0].length)) {
      segments.push({ start: match.index, end: match.index + match[0].length, type: 'number', text: match[0] });
    }
  }

  segments.sort((a, b) => a.start - b.start);

  if (segments.length === 0) {
    return <span>{line}</span>;
  }

  const parts: React.ReactNode[] = [];
  let lastEnd = 0;

  segments.forEach((seg, idx) => {
    if (seg.start > lastEnd) {
      parts.push(<span key={`text-${idx}`}>{line.slice(lastEnd, seg.start)}</span>);
    }
    const colorClass = getColorClass(seg.type);
    parts.push(<span key={`seg-${idx}`} className={colorClass}>{seg.text}</span>);
    lastEnd = seg.end;
  });

  if (lastEnd < line.length) {
    parts.push(<span key="text-end">{line.slice(lastEnd)}</span>);
  }

  return <>{parts}</>;
}

function isOverlapping(segments: { start: number; end: number }[], start: number, end: number): boolean {
  return segments.some(seg => 
    (start >= seg.start && start < seg.end) || 
    (end > seg.start && end <= seg.end) ||
    (start <= seg.start && end >= seg.end)
  );
}

function getColorClass(type: string): string {
  switch (type) {
    case 'keyword':
      return 'text-purple-400 font-medium';
    case 'string':
      return 'text-green-400';
    case 'comment':
      return 'text-zinc-500 italic';
    case 'number':
      return 'text-orange-400';
    case 'preprocessor':
      return 'text-cyan-400';
    case 'function':
      return 'text-yellow-400';
    default:
      return '';
  }
}
