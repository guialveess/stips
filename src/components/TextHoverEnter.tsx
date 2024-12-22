"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const DURATION = 0.25;
const STAGGER = 0.025;

type TextHoverEnterProps = {
  children: string; // Agora só aceita strings
  className?: string;
};

export default function TextHoverEnter({ children, className }: TextHoverEnterProps) {
  const letters = children
    .split("")
    .map((letter) => (letter === " " ? "\u00A0" : letter));

  return (
    <motion.span
      className={cn("relative inline-block align-baseline", className)} // Mantém o alinhamento com texto inline
      initial="initial"
      whileHover="hovered"
    >
      <span className="block">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </span>
      <span className="absolute inset-0">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </span>
    </motion.span>
  );
}
