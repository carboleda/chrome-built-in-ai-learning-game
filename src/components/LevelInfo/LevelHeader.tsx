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
    <div className="border-b border-[var(--color-terminal-light)]/30 bg-[var(--color-terminal-dark)] px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-[var(--color-signal-blue)] px-3 py-1 text-sm font-bold text-[var(--color-terminal-dark)]">
          Level {level.id}
        </span>
        <h2 className="text-md font-bold text-white">{level.title}</h2>

        <p className="text-sm text-[var(--color-neon-green)] align-right ml-auto">
          API: {level.api}
        </p>
      </div>
    </div>
  );
}
