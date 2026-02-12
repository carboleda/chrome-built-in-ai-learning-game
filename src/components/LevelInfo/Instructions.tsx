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
    <div className="prose prose-invert max-w-none overflow-auto bg-linear-to-br from-(--color-terminal-dark) to-(--color-terminal-medium) px-4 pb-2 text-sm">
      <Markdown
        components={{
          // Custom styling for markdown elements
          h2: ({ children }) => (
            <h2 className="mb-3 mt-4 text-lg font-bold text-(--color-neon-green)">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-2 mt-3 text-base font-semibold text-white">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="mb-2 mt-3 text-sm font-semibold text-white">
              {children}
            </h4>
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
              <code className="rounded bg-(--color-circuit-gray) px-1.5 py-0.5 text-sm text-(--color-neon-green)">
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
            <blockquote className="border-l-4 border-(--color-neon-green) bg-(--color-circuit-gray)/30 py-2 pl-4 italic text-gray-400">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-6 border-(--color-terminal-light)/30" />,
          a: ({ children, href }) => (
            <a
              href={href}
              className="text-(--color-neon-green) underline hover:text-(--color-neon-green-bright)"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
