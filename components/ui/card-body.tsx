import { cn } from "@/lib/utils";
import React from "react";

export const CardBody = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "relative z-20 h-full overflow-hidden rounded-2xl border border-slate-800 p-8",
        className
      )}
    >
      {children}
    </div>
  );
};

