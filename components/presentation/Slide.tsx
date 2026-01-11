'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SlideItemComponent } from './SlideItem';
import { BackgroundEffects } from './BackgroundEffects';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Slide as SlideType } from '@/lib/slides-data';

interface SlideProps {
  slide: SlideType;
  currentStep: number;
  direction: number;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

const getThemeStyles = (theme?: string) => {
  switch (theme) {
    case 'accent':
      return 'bg-gradient-to-br from-primary/10 via-background to-primary/5 dark:from-primary/20 dark:via-zinc-900 dark:to-primary/10';
    case 'dark':
      return 'bg-zinc-900 dark:bg-zinc-950';
    case 'code':
      return 'bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-950';
    default:
      return 'bg-white dark:bg-zinc-900';
  }
};

export function Slide({ slide, currentStep, direction }: SlideProps) {
  const isAccentTheme = slide.theme === 'accent';
  const bgVariant = slide.theme || 'default';

  return (
    <motion.div
      key={slide.id}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className={cn(
        'absolute inset-0 flex flex-col overflow-hidden',
        getThemeStyles(slide.theme)
      )}
    >
      <BackgroundEffects variant={bgVariant as 'default' | 'accent' | 'code' | 'dark'} />
      
      <div className="relative z-10 flex h-full flex-col px-6 py-8 md:px-12 md:py-10 lg:px-16 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mb-4 shrink-0"
        >
          <div className="flex items-center gap-3">
            {isAccentTheme ? (
              <motion.h1
                className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
              >
                {slide.title}
              </motion.h1>
            ) : (
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 md:text-4xl lg:text-5xl">
                {slide.title}
              </h1>
            )}
            {slide.theme === 'code' && (
              <Badge variant="secondary" className="text-xs">
                代码示例
              </Badge>
            )}
          </div>
          {slide.subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className={cn(
                'mt-3 text-xl md:text-2xl',
                isAccentTheme
                  ? 'text-primary/70'
                  : 'text-zinc-500 dark:text-zinc-400'
              )}
            >
              {slide.subtitle}
            </motion.p>
          )}
        </motion.div>

        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="space-y-4 pr-4">
            <AnimatePresence mode="popLayout">
              {slide.items.map((item, index) => {
                // 判断是否为答案/解析类型
                const isAnswerType = (it: typeof item) => 
                  it.type === 'answer' || 
                  it.type === 'analysis' || 
                  (it.type === 'table' && it.content === '解析');
                
                // 查找第一个答案/解析的位置
                const firstAnswerIndex = slide.items.findIndex(it => isAnswerType(it));
                
                // 判断当前项是否在答案之前
                // 如果没有答案，所有内容都在"答案前"
                const isBeforeAnswer = firstAnswerIndex === -1 || index < firstAnswerIndex;
                
                // 答案前的内容在 step >= 1 时显示
                // 答案及之后的内容在 step >= 2 时显示
                const requiredStep = isBeforeAnswer ? 1 : 2;
                
                const isVisible = currentStep >= requiredStep;
                
                return (
                  <SlideItemComponent
                    key={`${slide.id}-item-${index}`}
                    item={item}
                    index={index}
                    isVisible={isVisible}
                  />
                );
              })}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </div>
    </motion.div>
  );
}
