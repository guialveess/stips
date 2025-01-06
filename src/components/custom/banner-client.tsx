"use client";

import React, { useState } from "react";
import { X } from "lucide-react";


interface BannerProps {
  initialShow?: boolean;
  icon?: React.ReactNode;
  title: React.ReactNode;
  actionLabel: string;
  learnMoreUrl?: string;
}

export function BannerClient({
  initialShow = true,
  icon,
  title,
  actionLabel,
  learnMoreUrl,
}: BannerProps) {
  const [show, setShow] = useState(initialShow);

  const handleActionClick = () => {
    console.log("Claim domain clicked"); // Insira sua lógica de interação aqui.
  };

  if (!show) return null;

  return (
    <div className="relative isolate flex flex-col justify-between gap-3 overflow-hidden rounded-lg border border-orange-600/90 bg-gradient-to-r from-orange-700 to-orange-600 py-3 pl-4 pr-12 sm:flex-row sm:items-center sm:py-2">

      

      <div className="flex items-center gap-3">
      
        <p className="text-sm text-white">
          {title}
          {learnMoreUrl && (
            <>
              {" "}
              <a
                href={learnMoreUrl}
                target="_blank"
                className="text-white underline transition-colors hover:text-black"
              >
                Ir para Stipss
              </a>
            </>
          )}
        </p>
      </div>

      <div className="flex items-center sm:-my-1">
        <a
          href={learnMoreUrl}
          target="_blank"
          className="whitespace-nowrap rounded-md border border-white px-3 py-1 text-sm text-white transition-colors hover:bg-black-500/10"
          onClick={handleActionClick}
        >
          {actionLabel}
        </a>
      </div>

      <button
        type="button"
        className="absolute inset-y-0 right-2.5 p-1 text-sm text-white underline transition-colors hover:text-black"
        onClick={() => setShow(false)}
      >
        <X className="h-[18px] w-[18px]" />
      </button>
    </div>
  );
}
