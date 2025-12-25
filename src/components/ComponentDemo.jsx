import { useState } from 'react';
import Card from './ui/Card';
import CodeBlock from './CodeBlock';

const ComponentDemo = ({ title, description, code, children, live = true }) => {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="mb-8">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-[#1b1b1b] mb-1">{title}</h3>
          {description && (
            <p className="text-sm text-[#4e4e4e]">{description}</p>
          )}
        </div>
        {code && (
          <button
            onClick={() => setShowCode(!showCode)}
            className="px-3 py-1.5 text-sm font-medium text-[#0069c2] hover:bg-[#0069c2] hover:text-white rounded-md transition-colors border border-[#0069c2]"
          >
            {showCode ? 'Hide Code' : 'Show Code'}
          </button>
        )}
      </div>
      
      {live && (
        <Card variant="default" className="p-6 mb-4 bg-gradient-to-br from-white to-[#fafafa] border-[#e0e0e6]">
          <div className="flex items-center justify-center min-h-[120px]">
            {children}
          </div>
        </Card>
      )}
      
      {code && showCode && (
        <div className="mt-4">
          {typeof code === 'string' ? <CodeBlock>{code}</CodeBlock> : code}
        </div>
      )}
    </div>
  );
};

export default ComponentDemo;

