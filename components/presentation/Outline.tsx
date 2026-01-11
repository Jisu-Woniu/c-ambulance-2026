'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Code, Lightbulb, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { usePresentationStore } from '@/lib/presentation-store';
import { slides, type Slide } from '@/lib/slides-data';

interface OutlineProps {
  isOpen: boolean;
  onClose: () => void;
}

// 生成幻灯片缩略图预览
function SlideThumbnail({ slide, isActive }: { slide: Slide; isActive: boolean }) {
  const getThemeColor = () => {
    switch (slide.theme) {
      case 'accent': return 'from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10';
      case 'code': return 'from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900';
      case 'dark': return 'from-zinc-700 to-zinc-800';
      default: return 'from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950';
    }
  };

  const hasCode = slide.items.some(item => item.type === 'code');
  const hasExample = slide.items.some(item => item.type === 'example');
  const hasAnswer = slide.items.some(item => item.type === 'answer');
  const hasTip = slide.items.some(item => item.type === 'tip');
  const hasTable = slide.items.some(item => item.type === 'table');
  const codeCount = slide.items.filter(item => item.type === 'code').length;
  const bulletCount = slide.items.filter(item => item.type === 'bullet').length;

  // 获取第一个文本内容作为预览
  const firstTextItem = slide.items.find(item => 
    item.type === 'text' || item.type === 'bullet' || item.type === 'example'
  );
  const previewText = firstTextItem?.content?.slice(0, 30) || '';

  return (
    <div className={cn(
      'relative aspect-[16/10] w-full overflow-hidden rounded-md border-2 transition-all',
      `bg-gradient-to-br ${getThemeColor()}`,
      isActive ? 'border-primary shadow-md' : 'border-zinc-200 dark:border-zinc-700'
    )}>
      {/* 标题预览 */}
      <div className="absolute inset-x-1.5 top-1.5">
        <p className={cn(
          'truncate text-[8px] font-bold leading-tight',
          slide.theme === 'accent' 
            ? 'text-primary' 
            : 'text-zinc-700 dark:text-zinc-300'
        )}>
          {slide.title}
        </p>
        {slide.subtitle && (
          <p className="truncate text-[6px] text-zinc-400 dark:text-zinc-500">
            {slide.subtitle}
          </p>
        )}
      </div>
      
      {/* 内容预览区域 */}
      <div className="absolute inset-x-1.5 top-6 bottom-4">
        {slide.theme === 'accent' ? (
          // 标题页显示主题标识
          <div className="flex h-full items-center justify-center">
            <div className="rounded bg-primary/20 px-1.5 py-0.5">
              <span className="text-[7px] font-medium text-primary">章节标题</span>
            </div>
          </div>
        ) : hasCode ? (
          // 代码页显示代码块预览
          <div className="space-y-0.5">
            <div className="rounded bg-zinc-800 p-1">
              <div className="h-0.5 w-3/4 rounded bg-green-400/60" />
              <div className="mt-0.5 h-0.5 w-1/2 rounded bg-zinc-500" />
              <div className="mt-0.5 h-0.5 w-2/3 rounded bg-blue-400/60" />
            </div>
            {codeCount > 1 && (
              <span className="text-[6px] text-zinc-400">+{codeCount - 1} 代码块</span>
            )}
          </div>
        ) : hasTable ? (
          // 表格页显示表格预览
          <div className="rounded border border-zinc-200 dark:border-zinc-700 p-0.5">
            <div className="grid grid-cols-3 gap-0.5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={cn(
                  'h-1 rounded-sm',
                  i < 3 ? 'bg-zinc-300 dark:bg-zinc-600' : 'bg-zinc-200 dark:bg-zinc-700'
                )} />
              ))}
            </div>
          </div>
        ) : bulletCount > 0 ? (
          // 列表页显示列表预览
          <div className="space-y-0.5">
            {[...Array(Math.min(bulletCount, 3))].map((_, i) => (
              <div key={i} className="flex items-center gap-0.5">
                <div className="h-1 w-1 rounded-full bg-primary/50" />
                <div className={cn(
                  'h-0.5 rounded bg-zinc-300 dark:bg-zinc-600',
                  i === 0 ? 'w-full' : i === 1 ? 'w-4/5' : 'w-3/5'
                )} />
              </div>
            ))}
            {bulletCount > 3 && (
              <span className="text-[6px] text-zinc-400">+{bulletCount - 3} 项</span>
            )}
          </div>
        ) : previewText ? (
          // 文本预览
          <p className="text-[6px] leading-tight text-zinc-500 line-clamp-2">
            {previewText}...
          </p>
        ) : null}
      </div>

      {/* 底部内容类型标签 */}
      <div className="absolute bottom-0.5 left-1 right-1 flex items-center justify-between">
        <div className="flex gap-0.5">
          {hasCode && (
            <span className="flex items-center gap-0.5 rounded bg-zinc-800/80 px-1 py-0.5">
              <Code className="h-2 w-2 text-green-400" />
              <span className="text-[6px] text-zinc-300">{codeCount}</span>
            </span>
          )}
          {hasExample && (
            <span className="flex items-center rounded bg-blue-500/20 px-1 py-0.5">
              <HelpCircle className="h-2 w-2 text-blue-500" />
            </span>
          )}
          {hasAnswer && (
            <span className="flex items-center rounded bg-green-500/20 px-1 py-0.5">
              <span className="text-[6px] text-green-600 dark:text-green-400">答</span>
            </span>
          )}
        </div>
        <div className="flex gap-0.5">
          {hasTip && <Lightbulb className="h-2.5 w-2.5 text-amber-400" />}
          {hasTable && (
            <span className="text-[6px] text-zinc-400">表</span>
          )}
        </div>
      </div>
    </div>
  );
}

export function Outline({ isOpen, onClose }: OutlineProps) {
  const { currentSlide, goToSlide } = usePresentationStore();

  const handleSlideClick = (index: number) => {
    goToSlide(index);
    onClose();
  };

  // 按章节分组
  const groupedSlides = slides.reduce((acc, slide, index) => {
    if (slide.theme === 'accent' && slide.title.includes('第')) {
      acc.push({ chapter: slide.title, slides: [{ slide, index }] });
    } else if (acc.length === 0) {
      acc.push({ chapter: '开始', slides: [{ slide, index }] });
    } else {
      acc[acc.length - 1].slides.push({ slide, index });
    }
    return acc;
  }, [] as { chapter: string; slides: { slide: Slide; index: number }[] }[]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: -420, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -420, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 top-0 z-50 w-[340px] overflow-hidden bg-white shadow-2xl dark:bg-zinc-900 md:w-[400px]"
          >
            <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-700">
              <div>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  幻灯片大纲
                </h2>
                <p className="text-xs text-zinc-500">{slides.length} 张幻灯片</p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <ScrollArea className="h-[calc(100%-72px)]">
              <div className="p-3 space-y-4">
                {groupedSlides.map((group, groupIndex) => (
                  <div key={groupIndex}>
                    <div className="mb-2 flex items-center gap-2 px-1">
                      <FileText className="h-3.5 w-3.5 text-zinc-400" />
                      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                        {group.chapter}
                      </span>
                      <Badge variant="outline" className="ml-auto text-[10px] px-1.5 py-0">
                        {group.slides.length}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {group.slides.map(({ slide, index }) => (
                        <motion.button
                          key={slide.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.015 }}
                          onClick={() => handleSlideClick(index)}
                          className={cn(
                            'group rounded-lg p-2 text-left transition-all',
                            'hover:bg-zinc-100 dark:hover:bg-zinc-800',
                            currentSlide === index && 'bg-primary/5 ring-2 ring-primary/20'
                          )}
                        >
                          <SlideThumbnail slide={slide} isActive={currentSlide === index} />
                          <div className="mt-1.5 px-0.5">
                            <div className="flex items-center gap-1">
                              <span className={cn(
                                'text-[10px] font-medium',
                                currentSlide === index ? 'text-primary' : 'text-zinc-400'
                              )}>
                                {index + 1}
                              </span>
                              <p className={cn(
                                'truncate text-xs font-medium',
                                currentSlide === index
                                  ? 'text-primary'
                                  : 'text-zinc-700 dark:text-zinc-300'
                              )}>
                                {slide.title}
                              </p>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
