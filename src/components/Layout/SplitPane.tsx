/**
 * SplitPane Layout Component
 *
 * Provides a two-column layout with the code editor on the left
 * and the game visualization on the right.
 */

import type { ReactNode } from "react";

interface SplitPaneProps {
  /** Content for the left panel (code editor) */
  left: ReactNode;
  /** Content for the right panel (game view) */
  right: ReactNode;
}

export function SplitPane({ left, right }: SplitPaneProps) {
  return (
    <div className="flex h-full w-full">
      {/* Left Panel - Code Editor */}
      <div className="flex w-1/2 flex-col overflow-hidden border-r border-[var(--color-forest-light)]/30 bg-[#1e1e1e]">
        {left}
      </div>

      {/* Right Panel - Game View */}
      <div className="flex w-1/2 flex-col overflow-hidden bg-gradient-to-br from-[var(--color-forest-dark)] to-[var(--color-forest-medium)]">
        {right}
      </div>
    </div>
  );
}
