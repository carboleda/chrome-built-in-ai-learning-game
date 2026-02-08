/**
 * ScribeCharacter Component
 *
 * Placeholder for Scribe the Squirrel mascot.
 * This can be replaced with actual artwork later.
 */

import { motion } from "framer-motion";

interface ScribeCharacterProps {
  /** Animation state based on progress */
  mood: "idle" | "thinking" | "happy" | "celebrating";
}

export function ScribeCharacter({ mood }: ScribeCharacterProps) {
  const getMoodEmoji = () => {
    switch (mood) {
      case "thinking":
        return "🤔";
      case "happy":
        return "😊";
      case "celebrating":
        return "🎉";
      default:
        return "🐿️";
    }
  };

  const getMoodMessage = () => {
    switch (mood) {
      case "thinking":
        return "Hmm, let me process this...";
      case "happy":
        return "Great progress! Keep going!";
      case "celebrating":
        return "Wonderful! You did it!";
      default:
        return "Hello! I'm Scribe, your forest librarian.";
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center"
      animate={{
        y: mood === "celebrating" ? [0, -10, 0] : 0,
      }}
      transition={{
        duration: 0.5,
        repeat: mood === "celebrating" ? 3 : 0,
      }}
    >
      {/* Scribe Placeholder */}
      <div className="relative">
        <motion.div
          className="flex h-32 w-32 items-center justify-center rounded-full bg-[var(--color-bark)] text-6xl shadow-lg"
          animate={{
            scale: mood === "celebrating" ? [1, 1.1, 1] : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {getMoodEmoji()}
        </motion.div>

        {/* Speech Bubble */}
        <motion.div
          className="absolute -right-4 -top-2 rounded-full bg-[var(--color-leaf-gold)] px-3 py-1 text-sm font-bold text-[var(--color-forest-dark)]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          key={mood}
        >
          Scribe
        </motion.div>
      </div>

      {/* Message */}
      <motion.p
        className="mt-4 text-center text-lg text-white"
        key={mood}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {getMoodMessage()}
      </motion.p>
    </motion.div>
  );
}
