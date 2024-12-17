"use client";
import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
  }[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);

  return (
    <div
      onMouseMove={(e) => {
        let bounds = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - bounds.left);
      }}
      onMouseLeave={() => {
        mouseX.set(Infinity);
      }}
      className={className}
    >
      {items.map((item, idx) => (
        <Card
          key={item.title + idx}
          mouseX={mouseX}
          title={item.title}
          description={item.description}
        >
          {item.title}
        </Card>
      ))}
    </div>
  );
};

export const Card = ({
  title,
  description,
  mouseX,
  children,
}: {
  title: string;
  description: string;
  mouseX: any;
  children: React.ReactNode;
}) => {
  let ref = React.useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val: number) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(distance, [-150, 0, 150], [40, 100, 40]);
  let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.6 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 10,
              },
            }}
            exit={{ opacity: 0, y: 20, scale: 0.6 }}
            style={{
              translateX: "-50%",
              translateY: "-25%",
              whiteSpace: "nowrap",
            }}
            className="absolute z-50 flex flex-col items-center justify-center px-4 py-2 text-xs text-white -translate-x-1/2 -translate-y-1/2 bg-black rounded-lg top-0 left-1/2"
          >
            <span className="font-bold">{title}</span>
            <span className="text-xs text-neutral-300">{description}</span>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </motion.div>
  );
};
