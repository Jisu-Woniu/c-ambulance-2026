'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2,
  Home,
  List,
  Keyboard,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { usePresentationStore } from '@/lib/presentation-store';
import { totalSlides } from '@/lib/slides-data';
import { KeyboardShortcuts } from './KeyboardShortcuts';

interface ControlsProps {
  onToggleOutline: () => void;
}

export function Controls({ onToggleOutline }: ControlsProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const { 
    currentSlide, 
    currentStep, 
    totalSteps,
    isFullscreen, 
    nextStep, 
    prevStep,
    goToSlide,
    toggleFullscreen 
  } = usePresentationStore();

  const progress = ((currentSlide + 1) / totalSlides) * 100;
  const stepProgress = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 100;

  return (
    <>
      {/* 折叠时的迷你控制栏 */}
      <AnimatePresence>
        {isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2"
          >
            <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 shadow-lg backdrop-blur-xl dark:bg-zinc-900/90">
              <Button variant="ghost" size="icon-sm" onClick={prevStep}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Badge variant="secondary" className="font-mono">
                {currentSlide + 1}/{totalSlides}
              </Badge>
              <Button variant="ghost" size="icon-sm" onClick={nextStep}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon-sm" 
                onClick={() => setIsCollapsed(false)}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 完整控制栏 */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.3 }}
            className={cn(
              'fixed bottom-0 left-0 right-0 z-50',
              'bg-white/90 backdrop-blur-xl dark:bg-zinc-900/90',
              'border-t border-zinc-200/50 dark:border-zinc-700/50',
              'shadow-lg shadow-zinc-900/5'
            )}
          >
            <div className="relative">
              <Progress value={progress} className="h-1 rounded-none" />
              <motion.div 
                className="absolute bottom-0 left-0 h-0.5 bg-primary/50"
                initial={{ width: 0 }}
                animate={{ width: `${stepProgress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>

            <div className="flex items-center justify-between px-4 py-2 md:px-8">
              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => goToSlide(0)}
                      className="hidden sm:flex"
                    >
                      <Home className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>回到首页</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={onToggleOutline}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>打开大纲</TooltipContent>
                </Tooltip>

                <KeyboardShortcuts 
                  trigger={
                    <Button variant="ghost" size="icon-sm" className="hidden md:flex">
                      <Keyboard className="h-4 w-4" />
                    </Button>
                  }
                />
              </div>

              <div className="flex items-center gap-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      onClick={prevStep}
                      disabled={currentSlide === 0 && currentStep === 0}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>上一步 (←)</TooltipContent>
                </Tooltip>

                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="font-mono text-sm">
                    {currentSlide + 1}
                  </Badge>
                  <span className="text-xs text-muted-foreground">/</span>
                  <span className="text-xs text-muted-foreground">{totalSlides}</span>
                  {totalSteps > 1 && (
                    <Badge variant="outline" className="ml-1 text-xs">
                      {currentStep}/{totalSteps}
                    </Badge>
                  )}
                </div>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      onClick={nextStep}
                      disabled={currentSlide === totalSlides - 1 && currentStep >= totalSteps}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>下一步 (→)</TooltipContent>
                </Tooltip>
              </div>

              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={toggleFullscreen}
                      className="hidden sm:flex"
                    >
                      {isFullscreen ? (
                        <Minimize2 className="h-4 w-4" />
                      ) : (
                        <Maximize2 className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{isFullscreen ? '退出全屏' : '全屏模式'} (F)</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setIsCollapsed(true)}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>收起控制栏</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
