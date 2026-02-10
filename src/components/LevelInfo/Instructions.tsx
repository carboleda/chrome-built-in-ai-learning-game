/**
 * Instructions Component
 *
 * Renders the level instructions in markdown format.
 */

import Markdown from "react-markdown";

interface InstructionsProps {
  content: string;
}

export function Instructions({ content }: InstructionsProps) {
  return (
    <div className="prose prose-invert max-w-none overflow-auto bg-gradient-to-br from-[var(--color-terminal-dark)] to-[var(--color-terminal-medium)] px-2 pb-2 text-sm">
      <Markdown
        components={{
          // Custom styling for markdown elements
          h2: ({ children }) => (
            <h2 className="mb-3 mt-4 text-lg font-bold text-[var(--color-signal-blue)]">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-2 mt-3 text-base font-semibold text-white">
              {children}
            </h3>
          ),
          p: ({ children }) => <p className="mb-3 text-gray-300">{children}</p>,
          code: ({ className, children }) => {
            const isBlock = className?.includes("language-");
            if (isBlock) {
              return (
                <pre className="overflow-x-auto rounded-lg bg-[#1e1e1e] p-4">
                  <code className="text-sm text-gray-300">{children}</code>
                </pre>
              );
            }
            return (
              <code className="rounded bg-[var(--color-circuit-gray)] px-1.5 py-0.5 text-sm text-[var(--color-signal-blue)]">
                {children}
              </code>
            );
          },
          pre: ({ children }) => <>{children}</>,
          ol: ({ children }) => (
            <ol className="mb-4 list-inside list-decimal space-y-2 text-gray-300">
              {children}
            </ol>
          ),
          ul: ({ children }) => (
            <ul className="mb-4 list-inside list-disc space-y-2 text-gray-300">
              {children}
            </ul>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[var(--color-signal-blue)] bg-[var(--color-circuit-gray)]/30 py-2 pl-4 italic text-gray-400">
              {children}
            </blockquote>
          ),
          hr: () => (
            <hr className="my-6 border-[var(--color-terminal-light)]/30" />
          ),
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
