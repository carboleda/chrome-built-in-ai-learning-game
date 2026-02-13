/**
 * LevelScene Component
 *
 * Main game visualization area containing Babel and progress indicators.
 */

import { useGameStore } from "../../store/gameStore";
import { Character } from "./BabelCharacter/BabelCharacterV2.tsx";
import { motion } from "framer-motion";
import { CharacterMood } from "./BabelCharacter/Face/index.tsx";

export function LevelScene() {
  const { validationResult, executionError, isExecuting } = useGameStore();
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

  const getOutput = () => {
    if (!validationResult?.complete && !validationResult?.expectedOutput) {
      return "Run your code to see execution results here...";
    }

    if (validationResult?.complete && !validationResult?.expectedOutput) {
      return "Congratulations! You've completed this level!";
    }

    if (typeof validationResult.expectedOutput === "object") {
      return JSON.stringify(validationResult.expectedOutput, null, 2);
    }

    return validationResult.expectedOutput as string;
  };

  return (
    <div className="flex h-full flex-row center justify-center gap-4 p-2">
      {/* Babel Character */}
      <motion.div
        initial={{ x: 0, opacity: 1 }}
        animate={{ x: showMessages ? -5 : 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Character mood={getMood()} />
      </motion.div>

      <div className="flex-1">
        {/* Console */}
        <div className="h-full rounded-lg bg-(--color-terminal-dark)/50 ring-1 ring-(--color-signal-blue)/30 overflow-y-auto p-4">
          <code className="text-sm">{getOutput()}</code>
        </div>
      </div>
    </div>
  );
}
