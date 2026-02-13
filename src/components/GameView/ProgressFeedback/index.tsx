import { motion } from "framer-motion";
import { useGameStore } from "../../../store/gameStore";
import { ProgressIndicator } from "./ProgressIndicator";

export const ProgressFeedback: React.FC = () => {
  const { validationResult, executionError, currentLevel } = useGameStore();
  const showMessages = validationResult?.message && !executionError;

  return (
    <div className="w-full flex-row items-center justify-center gap-4 md:flex">
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
          <div className="w-fit flex flex-col gap-4 p-4">
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
};
