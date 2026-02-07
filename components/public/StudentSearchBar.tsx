"use client";

import { useState } from "react";

interface StudentSearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function StudentSearchBar({
  onSearch,
  placeholder = "ابحث عن اسم الطالب...",
}: StudentSearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div
      className={`relative transition-all duration-300 ${
        isFocused ? "scale-[1.02]" : ""
      }`}
    >
      {/* Search icon */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl pointer-events-none z-10">
        {isFocused ? "🔍" : "🔎"}
      </div>

      {/* Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={`w-full py-4 px-14 bg-white rounded-2xl font-arabic text-lg text-gray-800 placeholder-gray-400 shadow-md transition-all duration-300 border-3 ${
          isFocused
            ? "border-purple-400 shadow-lg ring-4 ring-purple-100"
            : "border-gray-200 hover:border-gray-300"
        } focus:outline-none`}
        dir="rtl"
      />

      {/* Clear button */}
      {query && (
        <button
          onClick={handleClear}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-50 cursor-pointer"
        >
          <span className="text-gray-500 text-lg">✕</span>
        </button>
      )}

      {/* Decorative sparkles when focused */}
      {isFocused && (
        <>
          <span className="absolute -top-2 -right-2 text-lg animate-pulse">
            ✨
          </span>
          <span
            className="absolute -top-2 -left-2 text-lg animate-pulse"
            style={{ animationDelay: "0.2s" }}
          >
            ✨
          </span>
        </>
      )}
    </div>
  );
}
