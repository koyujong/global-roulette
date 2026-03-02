"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "next-themes";
import { RouletteItem } from "@/types/roulette";

interface RouletteProps {
  items: RouletteItem[];
  onWinner: (winner: string) => void;
}

// Pre-defined set of vibrant but soft pastel colors
const PASTEL_COLORS = [
  "#fecaca", // red
  "#fef08a", // yellow
  "#d9f99d", // lime
  "#a7f3d0", // emerald
  "#99f6e4", // teal
  "#bae6fd", // sky
  "#c7d2fe", // indigo
  "#e9d5ff", // purple
  "#fbcfe8", // pink
  "#ffedd5", // orange
];

export default function Roulette({ items, onWinner }: RouletteProps) {
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isSpinning, setIsSpinning] = useState(false);

  // Physics state
  const physicsRef = useRef({
    angle: 0,
    speed: 0,
    isSpinning: false,
    lastTick: 0,
  });

  // Compute cumulative angle array from weights
  const buildSlices = () => {
    const totalWeight = items.reduce((s, i) => s + i.weight, 0);
    if (totalWeight <= 0 || items.length === 0) return [];
    let cumulative = 0;
    return items.map(item => {
      const fraction = item.weight / totalWeight;
      const startFrac = cumulative;
      cumulative += fraction;
      return { item, startFrac, endFrac: cumulative, angle: fraction * 2 * Math.PI };
    });
  };

  const drawRoulette = (ctx: CanvasRenderingContext2D, width: number, height: number, angleOffset: number, isDark: boolean) => {
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 20;

    if (items.length === 0) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = isDark ? "#18181b" : "#f3f4f6";
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = isDark ? "#27272a" : "#e5e7eb";
      ctx.stroke();
      ctx.fillStyle = isDark ? "#71717a" : "#9ca3af";
      ctx.font = "16px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("No items", centerX, centerY);
      return;
    }

    const slices = buildSlices();

    // Draw slices
    for (let i = 0; i < slices.length; i++) {
      const { item, startFrac } = slices[i];
      const sliceAngle = slices[i].angle;
      const startAngle = startFrac * 2 * Math.PI + angleOffset;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      ctx.fillStyle = PASTEL_COLORS[i % PASTEL_COLORS.length];
      ctx.fill();

      ctx.lineWidth = 1;
      ctx.strokeStyle = isDark ? "#18181b" : "#ffffff";
      ctx.stroke();

      // Draw text only if slice is big enough
      const midAngle = startAngle + sliceAngle / 2;
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(midAngle);

      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#374151";

      // Font size proportional to slice arc length
      const arcLen = radius * sliceAngle;
      const fontSize = Math.max(10, Math.min(22, arcLen / 3.5));
      ctx.font = `bold ${fontSize}px sans-serif`;

      const text = item.name.length > 15 ? item.name.substring(0, 13) + "…" : item.name;
      ctx.shadowColor = "rgba(255,255,255,0.75)";
      ctx.shadowBlur = 4;
      ctx.fillText(text, radius - 18, 0);
      ctx.restore();
    }

    // Outer ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.lineWidth = 8;
    ctx.strokeStyle = isDark ? "#3f3f46" : "#fdf2f8";
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.strokeStyle = isDark ? "#27272a" : "#e5e7eb";
    ctx.stroke();

    // Pointer
    ctx.beginPath();
    ctx.moveTo(centerX - 18, centerY - radius - 15);
    ctx.lineTo(centerX + 18, centerY - radius - 15);
    ctx.lineTo(centerX, centerY - radius + 15);
    ctx.closePath();
    ctx.shadowColor = "rgba(0,0,0,0.3)";
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 3;
    ctx.fillStyle = "#f43f5e";
    ctx.fill();
    ctx.shadowColor = "transparent";
    ctx.lineWidth = 3;
    ctx.strokeStyle = isDark ? "#18181b" : "#ffffff";
    ctx.stroke();

    // Center dot
    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI);
    ctx.fillStyle = isDark ? "#27272a" : "#ffffff";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = isDark ? "#3f3f46" : "#f3f4f6";
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = (time: number) => {
      const state = physicsRef.current;
      if (!state.lastTick) state.lastTick = time;
      const dt = Math.min((time - state.lastTick) / 16.66, 2);
      state.lastTick = time;

      if (state.isSpinning) {
        state.speed *= Math.pow(0.992, dt);
        state.angle += state.speed * dt;
        if (state.angle >= 2 * Math.PI) state.angle %= 2 * Math.PI;

        if (state.speed < 0.001) {
          state.isSpinning = false;
          state.speed = 0;
          setIsSpinning(false);

          if (items.length > 0) {
            // Determine winner based on weighted slices
            const slices = buildSlices();
            const pointerAngle = (3 * Math.PI) / 2; // points upward (top)
            let relativeAngle = (pointerAngle - state.angle) % (2 * Math.PI);
            if (relativeAngle < 0) relativeAngle += 2 * Math.PI;
            const pointerFrac = relativeAngle / (2 * Math.PI);

            // Find which slice the pointer lands in
            const winSlice = slices.find(s => pointerFrac >= s.startFrac && pointerFrac < s.endFrac)
              ?? slices[slices.length - 1];

            setTimeout(() => {
              onWinner(winSlice.item.name);
            }, 300);
          }
        }
      }

      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        const size = Math.min(rect.width, rect.height);
        if (canvas.width !== size * 2) {
          canvas.width = size * 2;
          canvas.height = size * 2;
          canvas.style.width = `${size}px`;
          canvas.style.height = `${size}px`;
          ctx.scale(2, 2);
        }
        drawRoulette(ctx, size, size, state.angle, isDark);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(animationFrameId); };
  }, [items, onWinner, isDark]);

  const handleSpinClick = () => {
    if (isSpinning || items.length < 2) return;
    setIsSpinning(true);
    physicsRef.current.isSpinning = true;
    physicsRef.current.speed = Math.random() * 0.2 + 0.6;
  };

  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} className="max-w-full max-h-full transition-transform duration-300" />
      </div>

      {/* Center SPIN button */}
      <button
        onClick={handleSpinClick}
        disabled={isSpinning || items.length < 2}
        className={`absolute z-10 w-24 h-24 md:w-32 md:h-32 rounded-full font-black text-xl md:text-2xl tracking-wider text-white flex items-center justify-center transition-all ${
          isSpinning || items.length < 2
            ? "bg-gray-300 scale-95 shadow-none cursor-not-allowed"
            : "bg-gradient-to-tr from-pink-500 to-indigo-500 hover:scale-105 active:scale-95 shadow-[0_10px_40px_-10px_rgba(236,72,153,0.7)] cursor-pointer"
        }`}
        style={{
          animation: !isSpinning && items.length >= 2 ? "pulse-glow 2s infinite" : "none"
        }}
      >
        <div className="w-[85%] h-[85%] rounded-full border-4 border-white/20 flex items-center justify-center">
          {t.spinBtn}
        </div>
      </button>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
          70% { box-shadow: 0 0 0 20px rgba(99, 102, 241, 0); }
          100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
        }
      `}} />
    </div>
  );
}
