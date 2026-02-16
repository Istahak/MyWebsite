'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github-dark.css';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="markdown-content prose prose-lg dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          h1: ({ ...props }) => (
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-8 mb-4" {...props} />
          ),
          h2: ({ ...props }) => (
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2" {...props} />
          ),
          h3: ({ ...props }) => (
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-3" {...props} />
          ),
          h4: ({ ...props }) => (
            <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-2" {...props} />
          ),
          p: ({ ...props }) => (
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4" {...props} />
          ),
          ul: ({ ...props }) => (
            <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700 dark:text-gray-300" {...props} />
          ),
          ol: ({ ...props }) => (
            <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700 dark:text-gray-300" {...props} />
          ),
          li: ({ ...props }) => (
            <li className="ml-4" {...props} />
          ),
          code: ({ inline, className, children, ...props }: {
            inline?: boolean;
            className?: string;
            children?: React.ReactNode;
          }) => {
            return inline ? (
              <code className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-pink-600 dark:text-pink-400 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            ) : (
              <code className={`${className} block`} {...props}>
                {children}
              </code>
            );
          },
          pre: ({ ...props }) => (
            <pre className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 overflow-x-auto mb-4 text-sm" {...props} />
          ),
          blockquote: ({ ...props }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 dark:text-gray-300 my-4" {...props} />
          ),
          a: ({ ...props }) => (
            <a className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
          ),
          table: ({ ...props }) => (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border border-gray-300 dark:border-gray-700" {...props} />
            </div>
          ),
          thead: ({ ...props }) => (
            <thead className="bg-gray-100 dark:bg-gray-800" {...props} />
          ),
          th: ({ ...props }) => (
            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold" {...props} />
          ),
          td: ({ ...props }) => (
            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2" {...props} />
          ),
          hr: ({ ...props }) => (
            <hr className="my-8 border-gray-300 dark:border-gray-700" {...props} />
          ),
          strong: ({ ...props }) => (
            <strong className="font-bold text-gray-900 dark:text-white" {...props} />
          ),
          em: ({ ...props }) => (
            <em className="italic text-gray-700 dark:text-gray-300" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
