"use client";

import { Activity, CheckCircle2, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BadgeAnimatedBorder } from "@/components/BadgeAnimatedBorder";

interface Card06Props {
  category?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  className?: string;
}

export default function Card06({
  category = "Explore",
  title = "Explore Stipss! 🚀",
  description = "Crie sua própria página personalizada com Stipss em minutos.",
  buttonText = "Começar Agora",
  buttonLink = "https://stipss.vercel.app",
}: Card06Props) {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="relative bottom-16 mt-14  transform -translate-x-1/2 z-50 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg rounded-xl p-4 flex flex-col space-y-3 max-w-sm w-full sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Icon Section */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 p-2 rounded-full bg-white dark:bg-zinc-900">
              <CheckCircle2 className="h-6 w-6 text-green-500 dark:text-green-400" />
            </div>

            {/* Content Section */}
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {title}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {description}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setVisible(false)}
              className="ml-auto p-1 rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* BadgeAnimatedBorder Button */}
          <BadgeAnimatedBorder>
            <a
              href={buttonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-100 hover:text-gray-300 transition"
            >
              {buttonText}
            </a>
          </BadgeAnimatedBorder>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
