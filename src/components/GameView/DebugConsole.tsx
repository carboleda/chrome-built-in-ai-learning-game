import { Console } from "console-feed";
import { useGameStore } from "../../store/gameStore";
import { useEffect, useReducer } from "react";

type Message = {
  id: string;
  method: "log" | "debug" | "info" | "warn" | "error";
  data: unknown[];
};

type Action = {
  type: "SET_LOGS" | "CLEAR_LOGS";
  payload: Message;
};

export const DebugConsole = () => {
  const { currentLevelId, validationResult } = useGameStore();
  const [logs, dispatch] = useReducer((state: Message[], action: Action) => {
    switch (action.type) {
      case "SET_LOGS":
        return [action.payload];
      case "CLEAR_LOGS":
        return [];
      default:
        return state;
    }
  }, []);

  const getOutput = (): Partial<Message> => {
    if (!validationResult?.complete && !validationResult?.expectedOutput) {
      return {
        method: "info",
        data: ["Run your code to see execution results here..."],
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
  };

  useEffect(() => {
    const { method, data } = getOutput();
    const newLog: Message = {
      id: "1",
      method: method || "debug",
      data: data || [],
    };
    dispatch({ type: "SET_LOGS", payload: newLog });
  }, [validationResult]);

  useEffect(() => {
    dispatch({
      type: "CLEAR_LOGS",
      payload: {} as Message,
    });
  }, [currentLevelId]);

  return (
    <Console
      logs={logs}
      styles={{
        BASE_FONT_SIZE: 14,
        PADDING: "8",
      }}
      variant="dark"
    />
  );
};
