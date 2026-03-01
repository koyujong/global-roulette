"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface RouletteProps {
  items: string[];
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isSpinning, setIsSpinning] = useState(false);

  // Physics state
  const physicsRef = useRef({
    angle: 0,
    speed: 0,
    isSpinning: false,
    lastTick: 0,
  });

  const drawRoulette = (ctx: CanvasRenderingContext2D, width: number, height: number, angleOffset: number) => {
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    // Leave some margin for the pointer
    const radius = Math.min(centerX, centerY) - 20;

    if (items.length === 0) {
      // Draw empty placeholder
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "#f3f4f6";
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#e5e7eb";
      ctx.stroke();
      
      ctx.fillStyle = "#9ca3af";
      ctx.font = "16px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("No items", centerX, centerY);
      return;
    }

    const sliceAngle = (2 * Math.PI) / items.length;

    // Draw slices
    for (let i = 0; i < items.length; i++) {
        const startAngle = i * sliceAngle + angleOffset;
        const endAngle = startAngle + sliceAngle;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();

        // Assign color based on index
        ctx.fillStyle = PASTEL_COLORS[i % PASTEL_COLORS.length];
        ctx.fill();

        // Slice borders
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();

        // Draw text
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + sliceAngle / 2);
        
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#374151";
        const fontSize = Math.max(12, Math.min(24, (radius * Math.PI * 2) / items.length / 2));
        ctx.font = `bold ${fontSize}px sans-serif`;
        
        // Truncate text if too long
        const textToDraw = items[i].length > 15 ? items[i].substring(0, 13) + "..." : items[i];
        
        // Shadow for readability
        ctx.shadowColor = "rgba(255,255,255,0.7)";
        ctx.shadowBlur = 4;
        
        ctx.fillText(textToDraw, radius - 20, 0);
        ctx.restore();
    }

    // Draw outer ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.lineWidth = 8;
    ctx.strokeStyle = "#fdf2f8";
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#e5e7eb";
    ctx.stroke();

    // Draw Pointer (Top center, pointing downwards v)
    ctx.beginPath();
    ctx.moveTo(centerX - 18, centerY - radius - 15); // Top Left
    ctx.lineTo(centerX + 18, centerY - radius - 15); // Top Right
    ctx.lineTo(centerX, centerY - radius + 15);      // Bottom Tip (pointing inwards)
    ctx.closePath();
    
    // Pointer shadow effect
    ctx.shadowColor = "rgba(0,0,0,0.3)";
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 3;
    
    ctx.fillStyle = "#f43f5e"; // Rose-500
    ctx.fill();
    
    // Reset shadow and draw crisp white border
    ctx.shadowColor = "transparent";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
    
    // Center point decoration
    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#f3f4f6";
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
      
      // Delta time physics for smoother animation regardless of refresh rate
      if (!state.lastTick) state.lastTick = time;
      const dt = Math.min((time - state.lastTick) / 16.66, 2); // normalize to ~60fps, max cap to prevent huge jumps
      state.lastTick = time;

      if (state.isSpinning) {
        // Friction / Deceleration
        state.speed *= Math.pow(0.992, dt);
        state.angle += state.speed * dt;

        // Ensure angle stays in healthy bounds
        if (state.angle >= 2 * Math.PI) {
          state.angle %= 2 * Math.PI;
        }

        // Stop condition
        if (state.speed < 0.001) {
          state.isSpinning = false;
          state.speed = 0;
          setIsSpinning(false);
          
          if (items.length > 0) {
            // Calculate winner
            // The pointer is at -PI/2 (top).
            // A slice i starts at `i * sliceAngle + currentAngle`
            // We want to find `i` where top is between start and end.
            const sliceAngle = (2 * Math.PI) / items.length;
            const pointerAngle = (3 * Math.PI) / 2; // Equivalent to -PI/2 when angles are positive
            
            // Normalize current angle
            const normalizedCurrentAngle = state.angle;
            
            // To find the slice under the pointer:
            // (pointerAngle - normalizedCurrentAngle) % 2PI
            let relativeAngle = (pointerAngle - normalizedCurrentAngle) % (2 * Math.PI);
            if (relativeAngle < 0) relativeAngle += 2 * Math.PI;
            
            const winningIndex = Math.floor(relativeAngle / sliceAngle);
            const winner = items[winningIndex % items.length];
            
            setTimeout(() => {
               onWinner(winner);
            }, 300); // Tiny delay for dramatic effect
          }
        }
      }

      // Handle Resize on canvas via actual client bounds
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        // Keep it square/responsive
        const size = Math.min(rect.width, rect.height);
        if (canvas.width !== size * 2) {
          // Retina display scaling
          canvas.width = size * 2;
          canvas.height = size * 2;
          canvas.style.width = `${size}px`;
          canvas.style.height = `${size}px`;
          ctx.scale(2, 2);
        }
        
        // Draw scene
        drawRoulette(ctx, size, size, state.angle);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [items, onWinner]);

  const handleSpinClick = () => {
    if (isSpinning || items.length < 2) return;
    
    setIsSpinning(true);
    physicsRef.current.isSpinning = true;
    physicsRef.current.speed = Math.random() * 0.2 + 0.6; // random initial speed 0.6 ~ 0.8 rad/frame
  };

  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} className="max-w-full max-h-full transition-transform duration-300" />
      </div>

      {/* Center Button HTML Overlay */}
      <button
        onClick={handleSpinClick}
        disabled={isSpinning || items.length < 2}
        className={`absolute z-10 w-24 h-24 md:w-32 md:h-32 rounded-full font-black text-xl md:text-2xl tracking-wider text-white flex items-center justify-center transition-all ${
          isSpinning || items.length < 2
            ? "bg-gray-300 scale-95 shadow-none cursor-not-allowed"
            : "bg-gradient-to-tr from-pink-500 to-indigo-500 hover:scale-105 active:scale-95 shadow-[0_10px_40px_-10px_rgba(236,72,153,0.7)] cursor-pointer"
        }`}
        style={{
           // Subtle pulse animation when ready
           animation: !isSpinning && items.length >= 2 ? "pulse-glow 2s infinite" : "none"
        }}
      >
        <div className="w-[85%] h-[85%] rounded-full border-4 border-white/20 flex items-center justify-center">
          {t.spinBtn}
        </div>
      </button>

      {/* Injecting CSS for pulse-glow */}
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
