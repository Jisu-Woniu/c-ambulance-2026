'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Slide } from './Slide';
import { Controls } from './Controls';
import { Outline } from './Outline';
import { usePresentationStore } from '@/lib/presentation-store';
import { slides } from '@/lib/slides-data';

export function Presentation() {
  const [showOutline, setShowOutline] = useState(false);
  const [showHints, setShowHints] = useState(true);
  const clickAreaRef = useRef<HTMLDivElement>(null);
  
  const { 
    currentSlide, 
    currentStep, 
    isFullscreen,
    direction,
    nextStep, 
    prevStep,
    toggleFullscreen
  } = usePresentationStore();

  const currentSlideData = slides[currentSlide];

  useEffect(() => {
    if (showHints) {
      const timer = setTimeout(() => setShowHints(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showHints]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (showOutline) return;
    
    switch (e.key) {
      case 'ArrowRight':
      case ' ':
      case 'Enter':
        e.preventDefault();
        nextStep();
        break;
      case 'ArrowLeft':
      case 'Backspace':
        e.preventDefault();
        prevStep();
        break;
      case 'Escape':
        if (isFullscreen) {
          toggleFullscreen();
        }
        break;
      case 'f':
      case 'F':
        toggleFullscreen();
        break;
    }
  }, [nextStep, prevStep, toggleFullscreen, isFullscreen, showOutline]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (showOutline) return;
    
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a') || target.closest('[role="dialog"]')) {
      return;
    }
    
    const rect = clickAreaRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const clickX = e.clientX - rect.left;
    const isLeftSide = clickX < rect.width * 0.3;
    
    if (isLeftSide) {
      prevStep();
    } else {
      nextStep();
    }
  }, [nextStep, prevStep, showOutline]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else if (document.fullscreenElement) {
      document.exitFullscreen?.();
    }
  }, [isFullscreen]);

  return (
    <div 
      className={cn(
        'relative h-screen w-screen overflow-hidden',
        'bg-zinc-50 dark:bg-zinc-950'
      )}
    >
      <div 
        ref={clickAreaRef}
        onClick={handleClick}
        className="absolute inset-0 bottom-16 cursor-pointer"
      >
        <AnimatePresence mode="wait" custom={direction}>
          {currentSlideData && (
            <Slide
              key={currentSlide}
              slide={currentSlideData}
              currentStep={currentStep}
              direction={direction}
            />
          )}
        </AnimatePresence>
        
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[30%] opacity-0 transition-opacity hover:opacity-100">
          <div className="flex h-full items-center justify-center">
            <motion.div 
              className="rounded-full bg-black/5 p-4 dark:bg-white/5"
              whileHover={{ scale: 1.1 }}
            >
              <span className="text-2xl text-zinc-400">←</span>
            </motion.div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[70%] opacity-0 transition-opacity hover:opacity-100">
          <div className="flex h-full items-center justify-end pr-8">
            <motion.div 
              className="rounded-full bg-black/5 p-4 dark:bg-white/5"
              whileHover={{ scale: 1.1 }}
            >
              <span className="text-2xl text-zinc-400">→</span>
            </motion.div>
          </div>
        </div>
      </div>

      <Controls onToggleOutline={() => setShowOutline(true)} />
      
      <Outline isOpen={showOutline} onClose={() => setShowOutline(false)} />

      <AnimatePresence>
        {showHints && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none fixed left-4 top-4 z-40"
          >
            <div className="flex items-center gap-2 rounded-lg bg-black/5 px-3 py-2 backdrop-blur-sm dark:bg-white/5">
              <kbd className="rounded border border-zinc-300 bg-white px-1.5 py-0.5 font-mono text-xs shadow-sm dark:border-zinc-600 dark:bg-zinc-800">
                ←
              </kbd>
              <kbd className="rounded border border-zinc-300 bg-white px-1.5 py-0.5 font-mono text-xs shadow-sm dark:border-zinc-600 dark:bg-zinc-800">
                →
              </kbd>
              <span className="text-xs text-zinc-500">或点击屏幕导航</span>
              <span className="mx-1 text-zinc-300">|</span>
              <kbd className="rounded border border-zinc-300 bg-white px-1.5 py-0.5 font-mono text-xs shadow-sm dark:border-zinc-600 dark:bg-zinc-800">
                F
              </kbd>
              <span className="text-xs text-zinc-500">全屏</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
