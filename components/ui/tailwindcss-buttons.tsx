"use client";
import React from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { BentoGrid, BentoGridItem } from "./bento-grid";

export function ButtonsCard({
  items,
  className,
}: {
  items: {
    title: string;
    description?: string;
    header?: React.ReactNode;
    icon?: React.ReactNode;
    href: string;
  }[];
  className?: string;
}) {
  return (
    <BentoGrid className={twMerge("max-w-4xl mx-auto", className)}>
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={twMerge(
            "hover:shadow-xl transition-shadow",
            i === 3 || i === 6 ? "md:col-span-2" : ""
          )}
        >
          <Link href={item.href} target="_blank" className="absolute inset-0 z-10">
            <span className="sr-only">{item.title}</span>
          </Link>
        </BentoGridItem>
      ))}
    </BentoGrid>
  );
}

