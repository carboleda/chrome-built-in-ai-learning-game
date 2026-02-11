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
        <span className="text-[--color-signal-blue]">Module Progress</span>
        <span className="font-mono text-white">
          {progress} / {total} steps
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-4 overflow-hidden rounded-full bg-[--color-circuit-gray]/50 ring-1 ring-[--color-signal-blue]/30">
        <motion.div
          className={`h-full rounded-full ${
            isComplete
              ? "bg-linear-to-r from-[--color-neon-green] to-emerald-400"
              : "bg-linear-to-r from-[--color-cyber-purple] to-[--color-signal-blue]"
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
