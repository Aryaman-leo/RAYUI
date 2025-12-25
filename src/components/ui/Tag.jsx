import React from "react";

export default function Tag({ children, onRemove }) {
  return (
    <div className="flex items-center p-2 addBlockCpyTagBg text-gray-700 smText rounded-full">
      {children}
      {onRemove && (
        <button
          type="button"
          className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer text-base leading-none"
          onClick={onRemove}
        >
          ×
        </button>
      )}
    </div>
  );
} 