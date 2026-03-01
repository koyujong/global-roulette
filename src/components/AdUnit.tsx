"use client";

import { useEffect, useRef } from "react";

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
    <div className="w-full min-h-[250px] my-4 py-8 flex items-center justify-center relative overflow-hidden" ref={adRef}>
      {/* Advertisement slot */}
      
      <ins
          className="adsbygoogle relative z-10 block"
          style={{ display: "block", minWidth: "250px", width: "100%", height: "100%" }}
          data-ad-client="ca-pub-3488637908196788"
          data-ad-slot=""
          data-ad-format="auto"
          data-full-width-responsive="true"
      />
    </div>
  );
}
