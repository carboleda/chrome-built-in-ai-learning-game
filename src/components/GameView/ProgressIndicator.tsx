/**
 * ProgressIndicator Component
 *
 * Visual progress bar showing completion status for the current level.
 */

import { motion } from "framer-motion";
import type { ValidationResult } from "../../engine/types";

interface ProgressIndicatorProps {
  validation: ValidationResult | null;
  totalSteps: number;
}

export function ProgressIndicator({
  validation,
  totalSteps,
}: ProgressIndicatorProps) {
  const progress = validation?.progress ?? 0;
  const total = totalSteps;
  const percentage = (progress / total) * 100;
  const isComplete = validation?.complete ?? false;

  return (
    <div className="w-full">
      {/* Progress Label */}
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-[var(--color-signal-blue)]">Module Progress</span>
        <span className="font-mono text-white">
          {progress} / {total} steps
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-4 overflow-hidden rounded-full bg-[var(--color-circuit-gray)]/50 ring-1 ring-[var(--color-signal-blue)]/30">
        <motion.div
          className={`h-full rounded-full ${
            isComplete
              ? "bg-gradient-to-r from-[var(--color-neon-green)] to-emerald-400"
              : "bg-gradient-to-r from-[var(--color-cyber-purple)] to-[var(--color-signal-blue)]"
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Completion Message */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-center text-lg font-bold text-[var(--color-neon-green)]"
        >
          ✨ Module Complete!
        </motion.div>
      )}
    </div>
  );
}
