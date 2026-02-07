"use client";

import { useEffect, useState } from "react";

interface Star {
  id: number;
  top: number;
  left: number;
  size: string;
  color: string;
  animation: string;
  delay: string;
  emoji: string;
}

export default function RandomStars({ count = 50 }: { count?: number }) {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const starEmojis = ["⭐", "✨", "🌟", "💫", "⭐", "✨"]; // More variety
      const colors = [
        "text-yellow-200",
        "text-yellow-300",
        "text-yellow-400",
        "text-amber-200",
        "text-amber-300",
      ];
      const sizes = [
        "text-xs",
        "text-sm",
        "text-base",
        "text-lg",
        "text-xl",
        "text-2xl",
      ];
      const animations = ["star-twinkle", "star-float", "star-sparkle"];

      const newStars: Star[] = [];

      for (let i = 0; i < count; i++) {
        const star: Star = {
          id: i,
          top: Math.random() * 100, // 0-100%
          left: Math.random() * 100, // 0-100%
          size: sizes[Math.floor(Math.random() * sizes.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          animation: animations[Math.floor(Math.random() * animations.length)],
          delay: `${Math.random() * 5}s`, // 0-5 seconds delay
          emoji: starEmojis[Math.floor(Math.random() * starEmojis.length)],
        };
        newStars.push(star);
      }

      setStars(newStars);
    };

    generateStars();
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute ${star.size} ${star.color} ${star.animation}`}
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDelay: star.delay,
          }}
        >
          {star.emoji}
        </div>
      ))}
    </div>
  );
}
