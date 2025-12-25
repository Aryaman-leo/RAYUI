import { useState } from 'react';

const CodeBlock = ({ children, language = 'jsx', title }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-[#3e3e42] rounded-t-lg">
          <span className="text-xs font-medium text-[#cccccc]">{title}</span>
          <span className="text-xs text-[#858585]">{language}</span>
        </div>
      )}
      <div className="relative">
        <pre className={`bg-[#1e1e1e] text-[#d4d4d4] p-4 overflow-x-auto text-sm font-mono leading-relaxed text-left ${
          title ? 'rounded-b-lg' : 'rounded-lg'
        } border border-[#3e3e42]`} style={{ tabSize: 2 }}>
          <code className="block text-left whitespace-pre">{children}</code>
        </pre>
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-[#2d2d30] hover:bg-[#3e3e42] text-[#cccccc] px-3 py-1.5 rounded text-xs font-medium flex items-center gap-2 border border-[#3e3e42]"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CodeBlock;

