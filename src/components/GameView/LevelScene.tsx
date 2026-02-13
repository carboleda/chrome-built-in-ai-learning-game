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
    </div>
  );
}
