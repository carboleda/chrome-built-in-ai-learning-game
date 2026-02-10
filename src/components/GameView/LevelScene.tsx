/**
 * LevelScene Component
 *
 * Main game visualization area containing Babel and progress indicators.
 */

import { useGameStore } from "../../store/gameStore";
import { BabelCharacter } from "./BabelCharacter";
// import { isLastLevel } from "../../data/levels";

export function LevelScene() {
  const { validationResult, isExecuting } = useGameStore();

  // Determine Babel's mood based on state
  const getMood = (): "idle" | "thinking" | "happy" | "celebrating" => {
    if (isExecuting) return "thinking";
    if (validationResult?.complete) return "celebrating";
    if (validationResult && validationResult.progress > 0) return "happy";
    return "idle";
  };

  // const isComplete = validationResult?.complete ?? false;
  // const hasNextLevel = currentLevel ? !isLastLevel(currentLevel.id) : false;

  return (
    <div className="flex h-full flex-col items-center justify-center p-8">
      {/* Babel Character */}
      <div className="mb-4">
        <BabelCharacter mood={getMood()} />
      </div>

      {/* Progress Indicator */}
      {/* <div className="w-full max-w-md">
        <ProgressIndicator
          validation={validationResult}
          totalSteps={currentLevel?.totalSteps ?? 1}
        />
      </div> */}

      {/* Validation Messages */}
      {validationResult?.message && (
        <div className="mt-2 w-full max-w-md rounded-lg bg-(--color-terminal-dark)/50 p-4 ring-1 ring-(--color-signal-blue)/30">
          <pre className="whitespace-pre-wrap font-mono text-sm text-gray-300">
            {validationResult.message}
          </pre>
        </div>
      )}

      {/* Victory Message */}
      {/* {isComplete && !hasNextLevel && (
        <div className="mt-6 text-center">
          <p className="text-xl font-bold text-[--color-neon-green]">
            🏆 System Complete! All modules optimized!
          </p>
        </div>
      )} */}
    </div>
  );
}
