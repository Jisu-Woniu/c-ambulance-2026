'use client';

import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Keyboard } from 'lucide-react';

const shortcuts = [
  { keys: ['→', 'Space', 'Enter'], description: '下一步 / 下一张幻灯片' },
  { keys: ['←', 'Backspace'], description: '上一步 / 上一张幻灯片' },
  { keys: ['F'], description: '切换全屏模式' },
  { keys: ['Esc'], description: '退出全屏 / 关闭面板' },
  { keys: ['Home'], description: '跳转到第一张' },
  { keys: ['End'], description: '跳转到最后一张' },
  { keys: ['1-9'], description: '快速跳转到对应章节' },
];

interface KeyboardShortcutsProps {
  trigger?: React.ReactNode;
}

export function KeyboardShortcuts({ trigger }: KeyboardShortcutsProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon-sm">
            <Keyboard className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5" />
            键盘快捷键
          </DialogTitle>
          <DialogDescription>
            使用以下快捷键来控制演示文稿
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-4">
          {shortcuts.map((shortcut, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2"
            >
              <span className="text-sm text-muted-foreground">
                {shortcut.description}
              </span>
              <div className="flex gap-1">
                {shortcut.keys.map((key) => (
                  <Badge
                    key={key}
                    variant="outline"
                    className="font-mono text-xs"
                  >
                    {key}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
