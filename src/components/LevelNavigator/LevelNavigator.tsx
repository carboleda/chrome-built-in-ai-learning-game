/**
 * LevelNavigator Component
 *
 * Allows players to navigate between levels.
 * Shows completion status for each level.
 */

import { useState, useRef, useEffect } from "react";
import { useGameStore } from "../../store/gameStore";
import { levels } from "../../data/levels";

export function LevelNavigator() {
  const { currentLevel, completedLevels, setLevel } = useGameStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const completedCount = completedLevels.length;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (levelId: number) => {
    setLevel(levelId);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <div ref={dropdownRef} className="relative">
        {/* Dropdown trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 rounded-lg border border-(--color-terminal-light)/30 bg-(--color-terminal-medium) px-3 py-1.5 text-sm font-medium text-white transition-all hover:border-(--color-signal-blue) focus:border-(--color-signal-blue) focus:outline-none"
        >
          <span className="flex items-center gap-2">
            {completedLevels.includes(currentLevel?.id ?? 0) ? (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs">
                ✓
              </span>
            ) : (
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-500 text-xs text-gray-400">
                {currentLevel?.id}
              </span>
            )}
            <span className="max-w-45 truncate">
              Level {currentLevel?.id}: {currentLevel?.title}
            </span>
          </span>
          <svg
            className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute right-0 top-full z-50 mt-1 max-h-64 w-72 overflow-auto rounded-lg border border-(--color-terminal-light)/30 bg-(--color-terminal-dark) py-1 shadow-xl">
            {levels.map((level) => {
              const isCompleted = completedLevels.includes(level.id);
              const isCurrent = currentLevel?.id === level.id;

              return (
                <button
                  key={level.id}
                  onClick={() => handleSelect(level.id)}
                  className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors ${
                    isCurrent
                      ? "bg-(--color-terminal-medium) text-(--color-signal-blue)"
                      : "text-gray-300 hover:bg-(--color-terminal-medium)/50"
                  }`}
                >
                  {/* Status indicator */}
                  {isCompleted ? (
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-600 text-xs text-white">
                      ✓
                    </span>
                  ) : (
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gray-500 text-xs text-gray-300">
                      {level.id}
                    </span>
                  )}
                  {/* Level info */}
                  <div className="flex flex-col">
                    <span className="font-medium">Level {level.id}</span>
                    <span className="text-xs text-gray-300">{level.title}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
      <span className="text-sm text-gray-400">
        {completedCount}/{levels.length} completed
      </span>
    </div>
  );
}
