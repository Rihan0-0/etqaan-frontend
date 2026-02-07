import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
  headerColorClass?: string; // e.g. "bg-gradient-to-r from-blue-600 to-purple-600"
  maxWidth?: string; // e.g. "max-w-md", "max-w-2xl"
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  headerColorClass = "bg-gradient-to-r from-blue-600 to-purple-600",
  maxWidth = "max-w-md",
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Handle click outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  // Use portal if available, otherwise naive render (for now just naive render is fine in Next.js app dir usually, but portal is safer for z-index)
  // Since we are in app dir, we can just render at root if we want, but sticky positioning works.
  // Let's stick to simple fixed overlay for now.

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-2xl w-full ${maxWidth} shadow-2xl overflow-hidden transform transition-all animate-scaleIn`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className={`${headerColorClass} p-6 text-white`}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-arabic flex items-center gap-2">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}
