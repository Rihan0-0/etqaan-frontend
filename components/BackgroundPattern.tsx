"use client";

export default function BackgroundPattern() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Geometric Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="geometric"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="25" cy="25" r="2" fill="#7C4DFF" opacity="0.3" />
              <circle cx="75" cy="75" r="2" fill="#26A69A" opacity="0.3" />
              <rect
                x="45"
                y="45"
                width="10"
                height="10"
                rx="2"
                fill="#FFD54F"
                opacity="0.2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geometric)" />
        </svg>
      </div>

      {/* Floating Islamic Geometric Shapes */}
      <div className="absolute top-20 left-20 w-16 h-16 opacity-10 animate-pulse-soft">
        <svg viewBox="0 0 100 100" className="w-full h-full text-purple-600">
          <polygon
            points="50,10 90,30 90,70 50,90 10,70 10,30"
            fill="currentColor"
          />
        </svg>
      </div>

      <div
        className="absolute top-1/3 right-32 w-12 h-12 opacity-10 animate-bounce-gentle"
        style={{ animationDelay: "2s" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-teal-600">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
          />
          <circle cx="50" cy="50" r="15" fill="currentColor" />
        </svg>
      </div>

      <div
        className="absolute bottom-1/4 left-1/4 w-20 h-20 opacity-10 animate-pulse-soft"
        style={{ animationDelay: "1s" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-amber-600">
          <rect
            x="20"
            y="20"
            width="60"
            height="60"
            rx="10"
            fill="currentColor"
          />
          <rect x="35" y="35" width="30" height="30" rx="5" fill="white" />
        </svg>
      </div>

      <div
        className="absolute bottom-32 right-20 w-14 h-14 opacity-10 animate-bounce-gentle"
        style={{ animationDelay: "3s" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-green-600">
          <path d="M50 10 L80 35 L65 70 L35 70 L20 35 Z" fill="currentColor" />
        </svg>
      </div>

      {/* Educational Icons */}
      <div
        className="absolute top-1/2 left-10 w-8 h-8 opacity-5 animate-float"
        style={{ animationDelay: "4s" }}
      >
        <span className="text-2xl">📚</span>
      </div>

      <div
        className="absolute bottom-40 right-1/3 w-8 h-8 opacity-5 animate-float"
        style={{ animationDelay: "6s" }}
      >
        <span className="text-2xl">🕌</span>
      </div>

      <div
        className="absolute top-40 right-10 w-8 h-8 opacity-5 animate-bounce-gentle"
        style={{ animationDelay: "8s" }}
      >
        <span className="text-2xl">🌙</span>
      </div>
    </div>
  );
}
