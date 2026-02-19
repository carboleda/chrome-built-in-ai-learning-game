import { Console } from "console-feed";
import { useGameStore } from "../../store/gameStore";
import { useEffect, useReducer } from "react";
import type { ValidationResult } from "../../engine";

type Message = {
  id: string;
  method: "log" | "debug" | "info" | "warn" | "error";
  data: unknown[];
};

type Action = {
  type: "SET_LOGS" | "CLEAR_LOGS";
  payload: Message;
};

function reducer(state: Message[], action: Action) {
  switch (action.type) {
    case "SET_LOGS":
      return [action.payload];
    case "CLEAR_LOGS":
      return [];
    default:
      return state;
  }
}

function getOutput(
  validationResult: ValidationResult | null,
): Partial<Message> {
  if (!validationResult?.complete && !validationResult?.expectedOutput) {
    return {
      method: "info",
      data: ["Complete and run your code to see execution results here..."],
    };
  }

  if (validationResult?.complete && !validationResult?.expectedOutput) {
    return {
      method: "info",
      data: ["Congratulations! You've completed this level!"],
    };
  }

  if (typeof validationResult.expectedOutput === "object") {
    return {
      method: "log",
      data: [validationResult.expectedOutput],
    };
  }

  return {
    method: "log",
    data: [validationResult.expectedOutput as string],
  };
}

export const DebugConsole = () => {
  const { currentLevelId, validationResult } = useGameStore();
  const [logs, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const { method, data } = getOutput(validationResult);
    const newLog: Message = {
      id: Date.now().toString(),
      method: method || "debug",
      data: data || [],
    };
    dispatch({ type: "SET_LOGS", payload: newLog });
  }, [validationResult?.expectedOutput, validationResult?.complete]);

  useEffect(() => {
    dispatch({
      type: "CLEAR_LOGS",
      payload: {} as Message,
    });
  }, [currentLevelId]);

  return (
    <div className="bg-[#1e1e1e] h-full overflow-y-auto custom-scrollbar">
      <Console
        logs={logs}
        styles={{
          BASE_FONT_SIZE: 14,
          BASE_BACKGROUND_COLOR: "transparent",
        }}
        variant="dark"
      />
    </div>
  );
};
