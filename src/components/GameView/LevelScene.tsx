/**
 * LevelScene Component
 *
 * Main game visualization area containing Babel and progress indicators.
 */

import { useGameStore } from "../../store/gameStore";
import { Character } from "./BabelCharacter/BabelCharacterV2.tsx";
import { motion } from "framer-motion";
import { CharacterMood } from "./BabelCharacter/Face/index.tsx";
import { ProgressIndicator } from "./ProgressIndicator.tsx";

export function LevelScene() {
  const { validationResult, executionError, isExecuting, currentLevel } =
    useGameStore();
  const showMessages = validationResult?.message && !executionError;

  // Determine Babel's mood based on state
  const getMood = (): CharacterMood => {
    if (executionError) return CharacterMood.Error;
    if (isExecuting) return CharacterMood.Thinking;
    if (validationResult?.complete) return CharacterMood.Celebrating;
    if (validationResult && validationResult.progress > 0)
      return CharacterMood.Happy;
    return CharacterMood.Idle;
  };

  return (
    <div className="flex h-full flex-row items-center justify-center gap-8 p-8">
      {/* Babel Character */}
      <motion.div
        initial={{ x: 0, opacity: 1 }}
        animate={{ x: showMessages ? -5 : 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Character mood={getMood()} />
      </motion.div>

      {/* Validation Messages */}
      {showMessages && (
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{
            x: 0,
            opacity: showMessages ? 1 : 0,
          }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="w-fit flex flex-col gap-4">
            <ProgressIndicator
              validation={validationResult}
              totalSteps={currentLevel?.totalSteps || 0}
            />

            <div className="rounded-lg bg-(--color-terminal-dark)/50 p-4 ring-1 ring-(--color-signal-blue)/30">
              <pre className="whitespace-pre-wrap font-mono text-sm text-gray-300">
                {validationResult?.message}
              </pre>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
