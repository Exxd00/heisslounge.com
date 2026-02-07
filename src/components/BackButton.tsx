"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import * as gtag from "@/lib/gtag";

interface BackButtonProps {
  href?: string;
}

export default function BackButton({ href = "/" }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    gtag.event({
      action: "Zurück",
      category: "navigation",
      label: "Back Button Clicked",
    });
    router.push(href);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2 px-6 py-3 bg-[#1a1a1a]/90 backdrop-blur-sm border border-[#c9a962]/50 rounded-full text-[#c9a962] hover:bg-[#252525] hover:border-[#c9a962] transition-all duration-300 shadow-lg shadow-black/50"
      aria-label="Zurück"
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="text-sm tracking-wider font-light">Zurück</span>
    </button>
  );
}
