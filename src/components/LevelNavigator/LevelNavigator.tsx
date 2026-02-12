/**
 * LevelNavigator Component
 *
 * Allows players to navigate between levels.
 * Displays levels as a horizontal row of circles.
 */

import { useGameStore } from "../../store/gameStore";
import { levels } from "../../levels";

export function LevelNavigator() {
  const { currentLevel, completedLevels, setLevel } = useGameStore();

  const handleSelect = (levelId: number) => {
    setLevel(levelId);
  };

  return (
    <div className="flex w-full flex-row items-center gap-2">
      {levels.map((level) => {
        const isCompleted = completedLevels.includes(level.id);
        const isCurrent = currentLevel?.id === level.id;

        let bgColor = "bg-(--color-terminal-medium) border-1 border-gray-500";
        let textColor = "text-gray-300";
        let hoverEffect = "hover:scale-110";
        let glow = "";

        if (isCompleted) {
          bgColor = "bg-green-600";
          textColor = "text-white";
        }

        if (isCurrent) {
          bgColor = "bg-(--color-signal-blue)";
          textColor = "text-blue-950";
          glow = "ring-2 ring-(--color-signal-blue)/50";
        }

        return (
          <button
            key={level.id}
            onClick={() => handleSelect(level.id)}
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-all font-extrabold text-xs cursor-pointer ${
              bgColor
            } ${textColor} ${hoverEffect} ${glow} focus:outline-none focus:ring-2 focus:(--color-signal-blue)`}
            title={`Level ${level.id}: ${level.title}`}
            aria-label={`Level ${level.id}: ${level.title} ${
              isCompleted ? "(completed)" : ""
            }`}
          >
            {level.id}
          </button>
        );
      })}
    </div>
  );
}
