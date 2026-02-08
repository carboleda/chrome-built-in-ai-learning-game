/**
 * LevelHeader Component
 *
 * Displays the current level number, title, and API being taught.
 */

import type { Level } from "../../engine/types";

interface LevelHeaderProps {
  level: Level;
}

export function LevelHeader({ level }: LevelHeaderProps) {
  return (
    <div className="border-b border-[var(--color-forest-light)]/30 bg-[var(--color-forest-dark)] px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-[var(--color-leaf-gold)] px-3 py-1 text-sm font-bold text-[var(--color-forest-dark)]">
          Level {level.id}
        </span>
        <h1 className="text-lg font-bold text-white">{level.title}</h1>
      </div>
      <p className="mt-1 text-sm text-[var(--color-leaf-gold)]">
        API: {level.api}
      </p>
    </div>
  );
}
