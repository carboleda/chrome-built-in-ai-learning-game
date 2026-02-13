import { useGameStore } from "../../../store/gameStore";

export const Messages: React.FC = () => {
  const { validationResult } = useGameStore();
  return (
    <div className="rounded-lg bg-(--color-terminal-dark)/50 p-4 ring-1 ring-(--color-signal-blue)/30">
      <pre className="whitespace-pre-wrap font-mono text-sm text-gray-300">
        {validationResult?.message}
      </pre>
    </div>
  );
};
