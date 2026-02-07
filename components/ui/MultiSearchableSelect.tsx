"use client";

import { useState, useRef, useEffect, useMemo } from "react";

interface Option {
  id: number | string;
  label: string;
}

interface MultiSearchableSelectProps {
  options: Option[];
  value: (number | string)[];
  onChange: (value: (number | string)[]) => void;
  placeholder?: string;
  className?: string;
}

export default function MultiSearchableSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className = "",
}: MultiSearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedOptions = useMemo(
    () => options.filter((opt) => value.includes(opt.id)),
    [options, value],
  );

  const filteredOptions = useMemo(
    () =>
      options.filter((opt) =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [options, searchTerm],
  );

  const handleSelect = (id: number | string) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  const handleRemove = (id: number | string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter((v) => v !== id));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div
        className="w-full min-h-[46px] px-3 py-2 border border-gray-300 rounded-xl text-sm bg-white cursor-text flex flex-wrap gap-2 items-center focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent"
        onClick={() => {
          setIsOpen(true);
          inputRef.current?.focus();
        }}
      >
        {selectedOptions.map((option) => (
          <span
            key={option.id}
            className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-medium border border-emerald-200"
          >
            {option.label}
            <button
              onClick={(e) => handleRemove(option.id, e)}
              className="hover:bg-emerald-200 rounded-full w-4 h-4 flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          className="flex-1 min-w-[60px] outline-none text-gray-900 bg-transparent placeholder-gray-400"
          placeholder={selectedOptions.length === 0 ? placeholder : ""}
        />
        <div className="text-gray-400 text-xs ml-1 cursor-pointer">
          {isOpen ? "▲" : "▼"}
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => {
              const isSelected = value.includes(option.id);
              return (
                <div
                  key={option.id}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-emerald-50 flex items-center justify-between ${
                    isSelected
                      ? "bg-emerald-50 text-emerald-700 font-medium"
                      : "text-gray-700"
                  }`}
                  onClick={() => handleSelect(option.id)}
                >
                  <span>{option.label}</span>
                  {isSelected && <span className="text-emerald-600">✓</span>}
                </div>
              );
            })
          ) : (
            <div className="px-3 py-2 text-sm text-gray-500 text-center">
              لا توجد نتائج
            </div>
          )}
        </div>
      )}
    </div>
  );
}
