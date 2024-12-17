"use client";
import { useMousePosition } from "@/lib/mouse";
import React from "react";
import { useEffect, useRef, useState } from "react";


export const BackgroundBeams = () => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { x, y } = useMousePosition();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPosition({ x: rect.left, y: rect.top });
    }
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition duration-500"
    >
      <div className="absolute inset-0 z-[-1]">
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 opacity-50 blur-[100px] transition duration-500 group-hover:opacity-100"
          style={{
            clipPath: `circle(25% at ${x - position.x}px ${y - position.y}px)`,
          }}
        />
      </div>
    </div>
  );
};
