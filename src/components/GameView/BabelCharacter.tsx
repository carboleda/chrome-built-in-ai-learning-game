/**
 * BabelCharacter Component
 *
 * Babel the Signal-Bot - A retro-futuristic robot assistant.
 * Visual representation updates based on progress and mood.
 */

import { motion } from "framer-motion";

interface BabelCharacterProps {
  /** Animation state based on progress */
  mood: "idle" | "thinking" | "happy" | "celebrating";
}

export function BabelCharacter({ mood }: BabelCharacterProps) {
  const getMoodEmoji = () => {
    switch (mood) {
      case "thinking":
        return "⚙️";
      case "happy":
        return "✨";
      case "celebrating":
        return "🎉";
      default:
        return "🤖";
    }
  };

  const getMoodMessage = () => {
    switch (mood) {
      case "thinking":
        return "Processing data packets...";
      case "happy":
        return "Signal routing successful! Keep going!";
      case "celebrating":
        return "System optimized! Module complete!";
      default:
        return "Hello! I'm Babel, your Signal-Bot assistant.";
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
      {/* Babel Robot Display */}
      <div className="relative">
        <motion.div
          className="flex h-32 w-32 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-cyber-purple)] to-[var(--color-terminal-light)] text-6xl shadow-lg shadow-[var(--color-signal-blue)]/20 ring-2 ring-[var(--color-signal-blue)]"
          animate={{
            scale: mood === "celebrating" ? [1, 1.1, 1] : 1,
            boxShadow:
              mood === "thinking"
                ? [
                    "0 0 20px var(--color-signal-blue)",
                    "0 0 40px var(--color-signal-blue)",
                    "0 0 20px var(--color-signal-blue)",
                  ]
                : "0 0 20px rgba(0, 217, 255, 0.2)",
          }}
          transition={{
            duration: mood === "thinking" ? 1 : 0.3,
            repeat: mood === "thinking" ? Infinity : 0,
          }}
        >
          {getMoodEmoji()}
        </motion.div>

        {/* Status Badge */}
        <motion.div
          className="absolute -right-4 -top-2 rounded-full bg-[var(--color-neon-green)] px-3 py-1 text-sm font-bold text-[var(--color-terminal-dark)]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          key={mood}
        >
          BABEL
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
