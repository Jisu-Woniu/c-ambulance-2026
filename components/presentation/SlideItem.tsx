'use client';

import { motion } from 'framer-motion';
import { CodeBlock } from './CodeBlock';
import { DataTable } from './DataTable';
import type { SlideItem as SlideItemType } from '@/lib/slides-data';
import { Lightbulb, CheckCircle2, HelpCircle, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SlideItemProps {
  item: SlideItemType;
  index: number;
  isVisible: boolean;
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    filter: 'blur(0px)',
    transition: { 
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  },
};

export function SlideItemComponent({ item, isVisible }: SlideItemProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {renderItem(item)}
    </motion.div>
  );
}

function renderItem(item: SlideItemType) {
  switch (item.type) {
    case 'text':
      return (
        <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 md:text-xl">
          {item.content}
        </p>
      );

    case 'bullet':
      return (
        <div className="space-y-2">
          <div className="flex items-start gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <span className="text-lg text-zinc-700 dark:text-zinc-300 md:text-xl">
              {item.content}
            </span>
          </div>
          {item.items && item.items.length > 0 && (
            <div className="ml-5 space-y-1.5">
              {item.items.map((subItem, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="flex items-start gap-2 text-base text-zinc-600 dark:text-zinc-400 md:text-lg"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
                  <span>{subItem}</span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      );

    case 'code':
      return <CodeBlock code={item.content} language={item.language} />;

    case 'table':
      if (item.headers && item.rows) {
        return <DataTable headers={item.headers} rows={item.rows} />;
      }
      return null;

    case 'heading':
      return (
        <h3 className="flex items-center gap-2 text-xl font-bold text-zinc-900 dark:text-zinc-100 md:text-2xl">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="inline-block h-1.5 w-8 rounded-full bg-primary"
          />
          {item.content}
        </h3>
      );

    case 'subheading':
      return (
        <h4 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 md:text-xl">
          {item.content}
        </h4>
      );

    case 'tip':
      return (
        <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 dark:border-amber-800/50 dark:from-amber-950/50 dark:to-orange-950/50">
          <CardContent className="flex items-start gap-3 p-4">
            <motion.div
              initial={{ rotate: -20, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Lightbulb className="h-5 w-5 shrink-0 text-amber-500" />
            </motion.div>
            <div className="flex-1">
              <Badge variant="outline" className="mb-2 border-amber-300 text-amber-600 dark:border-amber-700 dark:text-amber-400">
                提示
              </Badge>
              <p className="text-base text-amber-800 dark:text-amber-200 md:text-lg">
                {item.content}
              </p>
            </div>
          </CardContent>
        </Card>
      );

    case 'example':
      return (
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:border-blue-800/50 dark:from-blue-950/50 dark:to-indigo-950/50">
          <CardContent className="flex items-start gap-3 p-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <HelpCircle className="h-5 w-5 shrink-0 text-blue-500" />
            </motion.div>
            <div className="flex-1">
              <Badge variant="outline" className="mb-2 border-blue-300 text-blue-600 dark:border-blue-700 dark:text-blue-400">
                例题
              </Badge>
              <p className="text-base font-medium text-blue-800 dark:text-blue-200 md:text-lg">
                {item.content}
              </p>
            </div>
          </CardContent>
        </Card>
      );

    case 'answer':
      return (
        <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 dark:border-green-800/50 dark:from-green-950/50 dark:to-emerald-950/50">
          <CardContent className="flex items-start gap-3 p-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
            </motion.div>
            <div className="flex-1">
              <Badge className="mb-2 bg-green-500 text-white">
                正确答案
              </Badge>
              <p className="text-base font-bold text-green-800 dark:text-green-200 md:text-lg">
                {item.content}
              </p>
            </div>
          </CardContent>
        </Card>
      );

    case 'analysis':
      return (
        <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-violet-50 dark:border-purple-800/50 dark:from-purple-950/50 dark:to-violet-950/50">
          <CardContent className="flex items-start gap-3 p-4">
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FileText className="h-5 w-5 shrink-0 text-purple-500" />
            </motion.div>
            <div className="flex-1">
              <Badge variant="outline" className="mb-2 border-purple-300 text-purple-600 dark:border-purple-700 dark:text-purple-400">
                解析
              </Badge>
              <pre className="whitespace-pre-wrap text-base text-purple-800 dark:text-purple-200 md:text-lg">
                {item.content}
              </pre>
            </div>
          </CardContent>
        </Card>
      );

    default:
      return (
        <p className="text-lg text-zinc-700 dark:text-zinc-300">
          {item.content}
        </p>
      );
  }
}
