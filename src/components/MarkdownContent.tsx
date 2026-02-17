'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/atom-one-dark.css';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="markdown-content prose prose-lg dark:prose-invert max-w-none">
      <style jsx global>{`
        .markdown-content pre {
          background: #282c34 !important;
          border-radius: 12px;
          padding: 1.5rem;
          overflow-x: auto;
          margin: 2rem 0;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .markdown-content pre code {
          background: transparent !important;
          color: #abb2bf;
          font-size: 0.9rem;
          line-height: 1.7;
          font-family: 'Fira Code', 'JetBrains Mono', 'SF Mono', 'Consolas', monospace;
          font-weight: 400;
        }
        .markdown-content code {
          font-family: 'Fira Code', 'JetBrains Mono', 'SF Mono', 'Consolas', monospace;
          font-variant-ligatures: common-ligatures;
        }
      `}</style>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          h1: ({ ...props }) => (
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-12 mb-6 pb-3 border-b-2 border-blue-500 dark:border-blue-400" {...props} />
          ),
          h2: ({ ...props }) => (
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-10 mb-5 pb-2 border-b border-gray-300 dark:border-gray-700" {...props} />
          ),
          h3: ({ ...props }) => (
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-8 mb-4" {...props} />
          ),
          h4: ({ ...props }) => (
            <h4 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3" {...props} />
          ),
          p: ({ ...props }) => (
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5 text-base" {...props} />
          ),
          ul: ({ ...props }) => (
            <ul className="list-disc space-y-2 mb-6 text-gray-700 dark:text-gray-300 pl-6 marker:text-blue-500" {...props} />
          ),
          ol: ({ ...props }) => (
            <ol className="list-decimal space-y-2 mb-6 text-gray-700 dark:text-gray-300 pl-6 marker:text-blue-500 marker:font-semibold" {...props} />
          ),
          li: ({ ...props }) => (
            <li className="leading-relaxed pl-2" {...props} />
          ),
          code: ({ inline, className, children, ...props }: {
            inline?: boolean;
            className?: string;
            children?: React.ReactNode;
          }) => {
            return inline ? (
              <code className="px-2 py-1 bg-blue-50 dark:bg-gray-800 text-blue-700 dark:text-blue-400 rounded-md text-sm font-mono font-medium border border-blue-200 dark:border-gray-700" {...props}>
                {children}
              </code>
            ) : (
              <code className={`${className} block`} {...props}>
                {children}
              </code>
            );
          },
          pre: ({ ...props }) => (
            <pre className="!bg-[#282c34] dark:!bg-[#1e1e1e] rounded-xl !p-6 overflow-x-auto mb-6 shadow-2xl border border-gray-800 dark:border-gray-900" {...props} />
          ),
          blockquote: ({ ...props }) => (
            <blockquote className="border-l-4 border-blue-500 dark:border-blue-400 pl-6 py-3 pr-4 italic text-gray-700 dark:text-gray-300 my-6 bg-blue-50 dark:bg-gray-800 rounded-r-lg shadow-sm" {...props} />
          ),
          a: ({ ...props }) => (
            <a className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline decoration-2 underline-offset-2 transition-colors font-medium" target="_blank" rel="noopener noreferrer" {...props} />
          ),
          table: ({ ...props }) => (
            <div className="overflow-x-auto mb-6 rounded-lg border border-gray-300 dark:border-gray-700 shadow-md">
              <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700" {...props} />
            </div>
          ),
          thead: ({ ...props }) => (
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900" {...props} />
          ),
          tbody: ({ ...props }) => (
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800" {...props} />
          ),
          th: ({ ...props }) => (
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider" {...props} />
          ),
          td: ({ ...props }) => (
            <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300" {...props} />
          ),
          hr: ({ ...props }) => (
            <hr className="my-10 border-t-2 border-gray-200 dark:border-gray-700" {...props} />
          ),
          strong: ({ ...props }) => (
            <strong className="font-bold text-gray-900 dark:text-white" {...props} />
          ),
          em: ({ ...props }) => (
            <em className="italic text-gray-700 dark:text-gray-400 not-italic" style={{ fontStyle: 'italic' }} {...props} />
          ),
          img: ({ ...props }) => (
            <img className="rounded-lg shadow-lg my-8 max-w-full h-auto border border-gray-200 dark:border-gray-700" {...props} alt={props.alt || ''} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
