/**
 * CodeEditor Component
 *
 * Monaco-based code editor for writing JavaScript solutions.
 */

import Editor from "@monaco-editor/react";
import { useGameStore } from "../../store/gameStore";

export function CodeEditor() {
  const {
    userCode,
    setCode,
    runCode,
    resetLevel,
    isExecuting,
    executionError,
  } = useGameStore();

  const handleEditorChange = (value: string | undefined) => {
    setCode(value ?? "");
  };

  const handleRunCode = () => {
    runCode();
  };

  return (
    <div className="flex h-full flex-col">
      {/* Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={userCode}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "on",
            padding: { top: 16 },
          }}
        />
      </div>

      {/* Error Display */}
      {executionError && (
        <div className="border-t border-red-500/30 bg-red-900/20 px-4 py-3 font-mono text-sm text-red-400">
          <span className="font-bold">Error:</span> {executionError}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 border-t border-[var(--color-forest-light)]/30 bg-[#252526] px-4 py-3">
        <button
          onClick={handleRunCode}
          disabled={isExecuting}
          className="rounded-lg bg-[var(--color-forest-light)] px-6 py-2 font-semibold text-white transition-all hover:bg-[var(--color-leaf-gold)] hover:text-[var(--color-forest-dark)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isExecuting ? "Running..." : "▶ Run Code"}
        </button>
        <button
          onClick={resetLevel}
          disabled={isExecuting}
          className="rounded-lg border border-gray-600 px-4 py-2 text-gray-400 transition-colors hover:border-gray-400 hover:text-gray-200 disabled:opacity-50"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
