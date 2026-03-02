"use client";

import { useEffect, useRef } from "react";

// AdSense slot IDs (same publisher as site 1: ca-pub-3488637908196788)
const SLOT_IDS = {
  top: "6780266694",
  bottom: "7907422200",
};

export default function AdUnit({ position }: { position: "top" | "bottom" }) {
  const adRef = useRef<HTMLDivElement>(null);
  const isAdLoaded = useRef(false);

  useEffect(() => {
    if (isAdLoaded.current) return;

    try {
      const adsbygoogle = (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || [];
      adsbygoogle.push({});
      isAdLoaded.current = true;
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div
      className="w-full min-h-[100px] bg-slate-100/50 dark:bg-zinc-900/30 flex items-center justify-center rounded-2xl overflow-hidden relative"
      ref={adRef}
    >
      {/* Placeholder text (visible when ad is blocked or not loaded) */}
      <span className="absolute z-0 text-slate-300 dark:text-zinc-700 text-sm font-medium tracking-widest uppercase pointer-events-none">
        Advertisement
      </span>

      <ins
        className="adsbygoogle relative z-10 block"
        style={{ display: "block", minWidth: "250px", width: "100%" }}
        data-ad-client="ca-pub-3488637908196788"
        data-ad-slot={SLOT_IDS[position]}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
