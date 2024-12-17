"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration,
        delay: stagger(0.2),
      }
    );
  }, [animate, filter, duration]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline-block">
        {wordsArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            className={cn(
              "dark:text-white text-black opacity-0 inline-block",
              word.toLowerCase() === "stips" && "text-orange-500 dark:text-orange-500" // Aplica cor laranja a "stips"
            )}
            style={{
              filter: filter ? "blur(10px)" : "none",
              marginRight: "0.25em", // Adiciona espaço entre as palavras
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="text-3xl leading-snug tracking-wide text-black dark:text-white sm:text-2xl md:text-3xl lg:text-6xl">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
