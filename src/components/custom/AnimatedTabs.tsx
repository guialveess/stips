"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTabsProps {
  tabs: { value: string; label: string }[];
  selected: string;
  onTabSelect: (value: string) => void;
}

export function AnimatedTabs({ tabs, selected, onTabSelect }: AnimatedTabsProps) {
  return (
    <div className="inline-flex rounded-full bg-muted p-1">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabSelect(tab.value)}
          className={cn(
            "relative w-fit px-4 py-2 text-sm font-semibold capitalize transition-colors",
            "text-foreground",
            "flex items-center justify-center"
          )}
        >
          <span className="relative z-10">{tab.label}</span>
          {selected === tab.value && (
            <motion.span
              layoutId="tab"
              transition={{ type: "spring", duration: 0.4 }}
              className="absolute inset-0 z-0 rounded-full bg-background shadow-sm"
            />
          )}
        </button>
      ))}
    </div>
  );
}
