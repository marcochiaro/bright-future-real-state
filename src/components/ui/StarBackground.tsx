"use client";

import { useMemo } from "react";

export function StarBackground() {
  const stars = useMemo(() => {
    return Array.from({ length: 150 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.7 + 0.3,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="star-field">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            ["--opacity" as string]: star.opacity,
            ["--duration" as string]: `${star.duration}s`,
            ["--delay" as string]: `${star.delay}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
