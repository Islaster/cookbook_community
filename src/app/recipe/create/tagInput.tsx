// components/TagInput.tsx
"use client";
import { useState } from "react";

type TagInputProps = {
  label: string;
  tags: string[];
  setTags: (newTags: string[]) => void;
  placeholder: string;
  name?: string; // optional for forms
  allowDuplicates?: boolean;
};

export default function TagInput({
  label,
  tags,
  setTags,
  placeholder,
  name,
  allowDuplicates = false,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const addTag = () => {
    const trimmed = inputValue.trim();
    //if inputValue isnt in tags array then add it to tags array
    if (trimmed && (allowDuplicates || !tags.includes(trimmed))) {
      setTags([...tags, trimmed]);
    }
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //add tag to tags array when you press enter
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (tag: string) => {
    //filter out tag from tags array and resave tags array
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1 font-medium text-gray-700">{label}</label>
      )}

      <div className="flex items-center gap-2 mb-2">
        <input
          type="text"
          name={name}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Type and press Enter"}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={addTag}
          className="bg-blue-600 text-white rounded px-3 py-1 hover:bg-blue-700"
        >
          +
        </button>
      </div>

      <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1 border border-gray-200 rounded">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-red-500 hover:text-red-700 text-xs"
            >
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
