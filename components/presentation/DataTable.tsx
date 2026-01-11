'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DataTableProps {
  headers: string[];
  rows: string[][];
  className?: string;
}

export function DataTable({ headers, rows, className }: DataTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn('overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700', className)}
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <motion.tr
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-zinc-100 dark:bg-zinc-800"
            >
              {headers.map((header, i) => (
                <motion.th
                  key={i}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100"
                >
                  {header}
                </motion.th>
              ))}
            </motion.tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
            {rows.map((row, rowIndex) => (
              <motion.tr
                key={rowIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + rowIndex * 0.08 }}
                className="bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800/50"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-4 py-3 text-zinc-700 dark:text-zinc-300"
                  >
                    {cell.includes('✅') ? (
                      <span className="text-green-500">{cell}</span>
                    ) : cell.includes('❌') ? (
                      <span className="text-red-500">{cell}</span>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
