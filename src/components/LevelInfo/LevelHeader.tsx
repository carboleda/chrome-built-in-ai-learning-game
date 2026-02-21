/**
 * LevelHeader Component
 *
 * Displays the current level number, title, and API being taught.
 */

import { AIApiUrls, type Level } from "../../engine/types";
import { FaExternalLinkAlt } from "react-icons/fa";

interface LevelHeaderProps {
  level: Level;
}

export function LevelHeader({ level }: LevelHeaderProps) {
  return (
    <div className="border-b border-(--color-terminal-light)/30 bg-(--color-terminal-dark) px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-(--color-neon-green) px-3 py-1 text-sm font-bold text-(--color-terminal-dark)">
          Level {level.id}
        </span>
        <h2 className="text-md font-bold text-white">{level.title}</h2>

        <p className="text-sm text-(--color-neon-green) hover:text-(--color-neon-green)/80 align-right ml-auto">
          <a
            href={AIApiUrls[level.api]}
            target="_blank"
            rel="noopener noreferrer"
          >
            API: {level.api}{" "}
            <FaExternalLinkAlt size={12} className="inline-block ml-1" />
          </a>
        </p>
      </div>
    </div>
  );
}
