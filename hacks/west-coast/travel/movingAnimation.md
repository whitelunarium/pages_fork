import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Cloud, RefreshCcw, Zap, Star } from "lucide-react";

// Single-file, previewable React component
// 10-second cinematic drive through mysterious clouds with light gamification
// Controls: Click Play ▶, optional arrow keys (← →) give small car wiggle; Replay at end.

const DURATION_MS = 10000; // 10 seconds

// Simple inline SVGs so no external assets
const CarSVG = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 160 80" className={className}>
    {/* Shadow */}
    <ellipse cx="80" cy="72" rx="48" ry="6" fill="black" opacity="0.25" />
    {/* Body */}
    <rect x="20" y="28" width="100" height="26" rx="8" fill="#16181d" />
    <path d="M30 28 C45 5, 115 5, 130 28 L120 28 C105 14, 55 14, 40 28 Z" fill="#232631" />
    {/* Windows */}
    <path d="M52 26 L92 26 L108 40 L44 40 Z" fill="#7fc8ff" opacity="0.8" />
    {/* Accent stripe */}
    <rect x="24" y="50" width="96" height="4" rx="2" fill="#8b5cf6" />
    {/* Headlight */}
    <circle cx="118" cy="44" r="4" fill="#fef08a" />
    <path d="M122 43 L150 38 L150 50 L122 45 Z" fill="#fde68a" opacity="0.5" />
    {/* Wheels */}
    <g>
      <circle cx="48" cy="60" r="11" fill="#0b0c10" />
      <circle cx="48" cy="60" r="6" fill="#9ca3af" />
    </g>
    <g>
      <circle cx="102" cy="60" r="11" fill="#0b0c10" />
      <circle cx="102" cy="60" r="6" fill="#9ca3af" />
    </g>
  </svg>
);

const Coin = ({ collected }: { collected: boolean }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0.0 }}
    animate={{ scale: collected ? 0.2 : 1, opacity: collected ? 0 : 1 }}
    transition={{ type: "spring", stiffness: 200, damping: 18 }}
    className="rounded-full w-6 h-6 flex items-center justify-center bg-yellow-400 shadow-md"
    style={{ boxShadow: "0 0 12px rgba(251, 191, 36, 0.7)" }}
  >
    <Star className="w-3 h-3 text-yellow-900" />
  </motion.div>
);

function useTicker(isRunning: boolean, durationMs: number) {
  const [progress, setProgress] = useState(0); // 0..1
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    let raf = 0;
    if (!isRunning) return () => cancelAnimationFrame(raf);

    const tick = (t: number) => {
      if (startRef.current == null) startRef.current = t;
      const elapsed = t - startRef.current;
      const p = Math.min(1, elapsed / durationMs);
      setProgress(p);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      startRef.current = null;
    };
  }, [isRunning, durationMs]);

  return progress;
}

const gradientMask = {
  background:
    "radial-gradient(1200px 300px at 50% 120%, rgba(0,0,0,0.55), transparent 65%), linear-gradient(180deg, rgba(9,12,20,0.9), rgba(9,12,20,0.8))",
};

export default function ScenicMysteryDrive() {
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [wiggle, setWiggle] = useState(0); // keyboard input wiggle

  const progress = useTicker(running, DURATION_MS);

  useEffect(() => {
    if (running && progress >= 1) {
      setFinished(true);
      setRunning(false);
    }
  }, [progress, running]);

  // Route length in px the car travels
  const ROUTE_LEN = 1400; // virtual width beyond viewport
  const carX = progress * ROUTE_LEN;

  // Generate coins across the route
  const coins = useMemo(() => {
    const positions = [150, 320, 520, 740, 900, 1080, 1240, 1320];
    return positions.map((x, idx) => ({ id: idx, x, collected: false }));
  }, []);
  const [collected, setCollected] = useState<Record<number, boolean>>({});

  // Collect coins when car passes them
  useEffect(() => {
    coins.forEach((c) => {
      if (!collected[c.id] && carX + 100 >= c.x) {
        setCollected((prev) => ({ ...prev, [c.id]: true }));
        setScore((s) => s + 10);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carX]);

  // Keyboard wiggle for slight control feel
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setWiggle((w) => Math.max(-20, w - 6));
      if (e.key === "ArrowRight") setWiggle((w) => Math.min(20, w + 6));
    };
    window.addEventListener("keydown", onKey);
    const decay = setInterval(() => setWiggle((w) => w * 0.9), 50);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearInterval(decay);
    };
  }, []);

  const onReplay = () => {
    setScore(0);
    setCollected({});
    setFinished(false);
    setRunning(true);
  };

  const timeLeft = Math.max(0, Math.ceil((1 - progress) * (DURATION_MS / 1000)));

  return (
    <div className="w-full min-h-[560px] md:min-h-[640px] bg-gradient-to-b from-[#0b1220] via-[#0d1220] to-[#070b14] text-white relative overflow-hidden rounded-2xl shadow-2xl border border-white/10">
      {/* Backdrop stars */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.5), transparent 40%), radial-gradient(1px 1px at 60% 20%, rgba(255,255,255,0.35), transparent 40%), radial-gradient(1px 1px at 80% 70%, rgba(255,255,255,0.4), transparent 40%)` }} />

      {/* Mountains silhouette */}
      <div className="absolute bottom-28 left-0 right-0 h-40" aria-hidden>
        <svg className="w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path d="M0 160 L120 110 L200 140 L320 80 L420 140 L540 70 L650 130 L760 90 L880 150 L1020 100 L1200 160 L1200 200 L0 200 Z" fill="#0c141f" />
          <path d="M0 175 L160 125 L280 160 L360 120 L520 150 L660 95 L780 140 L920 120 L1100 160 L1200 190 L1200 200 L0 200 Z" fill="#0a121c" />
        </svg>
      </div>

      {/* Fog / clouds layers for mystery vibe */}
      <CloudLayer speed={10} opacity={0.35} y={-10} progress={progress} />
      <CloudLayer speed={20} opacity={0.5} y={10} progress={progress} />
      <CloudLayer speed={35} opacity={0.6} y={30} progress={progress} />

      {/* Route line */}
      <div className="absolute bottom-16 left-0 right-0 h-4">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-white/10" />
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-transparent via-violet-400/60 to-transparent blur-[1px]" />
        {/* dashed center */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-[length:40px_2px] bg-repeat-x" style={{ backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 50%)" }} />
      </div>

      {/* HUD */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
        <Card className="bg-black/40 backdrop-blur border-white/10">
          <CardContent className="py-2 px-3 flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-white/70">Mystery Meter</span>
            <div className="flex-1 h-2 rounded bg-white/10 overflow-hidden">
              <div className="h-full bg-violet-500" style={{ width: `${progress * 100}%` }} />
            </div>
            <div className="flex items-center gap-1 text-sm"><Zap className="w-4 h-4" />{timeLeft}s</div>
            <div className="flex items-center gap-1 text-sm"><Trophy className="w-4 h-4" />{score}</div>
          </CardContent>
        </Card>
        <div className="flex items-center gap-2">
          {!running && !finished && (
            <Button onClick={() => { setRunning(true); setFinished(false); }} className="bg-violet-600 hover:bg-violet-500">Play</Button>
          )}
          {finished && (
            <Button onClick={onReplay} variant="outline" className="border-white/20 bg-white/10">
              <RefreshCcw className="w-4 h-4 mr-2" /> Replay
            </Button>
          )}
        </div>
      </div>

      {/* World viewport */}
      <div className="absolute inset-x-0 bottom-0 h-[340px] md:h-[400px]" style={gradientMask}>
        {/* Coins */}
        <div className="absolute left-0 bottom-28 h-8 w-[2000px] pointer-events-none">
          {coins.map((c) => (
            <div key={c.id} className="absolute -translate-x-1/2" style={{ left: `${c.x - carX + 50 + wiggle}px` }}>
              <Coin collected={!!collected[c.id]} />
            </div>
          ))}
        </div>

        {/* Car */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-20"
          animate={{ x: wiggle }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
        >
          <CarSVG className="w-[200px] h-auto" />
        </motion.div>
      </div>

      {/* Finish overlay */}
      <AnimatePresence>
        {finished && (
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Card className="w-[520px] max-w-[92vw] bg-gradient-to-b from-[#0e1020] to-[#0a0d18] border-white/10">
              <CardContent className="p-6 text-center space-y-4">
                <div className="flex items-center justify-center gap-2 text-2xl font-semibold">
                  <Trophy className="w-6 h-6 text-yellow-400" /> Run Complete
                </div>
                <div className="text-sm text-white/70">You drifted through the veil and gathered the starlight.</div>
                <div className="text-5xl font-bold tracking-tight">{score} pts</div>
                <div className="text-sm uppercase tracking-widest text-white/60">Rank: {score >= 60 ? "Abyss Seeker" : score >= 40 ? "Fog Runner" : score >= 20 ? "Cloud Walker" : "Dawn Tourist"}</div>
                <div className="pt-2">
                  <Button onClick={onReplay} className="bg-violet-600 hover:bg-violet-500">
                    <RefreshCcw className="w-4 h-4 mr-2" /> Replay 10s
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer note */}
      <div className="absolute bottom-2 right-3 text-[10px] text-white/50 select-none">Use ← → to nudge</div>
    </div>
  );
}

function CloudLayer({ speed, opacity, y, progress }: { speed: number; opacity: number; y: number; progress: number }) {
  // Clouds parallax scroll left to right; speed in px per % progress
  const offset = -progress * speed * 100; // parallax motion
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity }}>
      <motion.div
        className="absolute inset-x-0"
        style={{ top: `${y}%` }}
        animate={{ x: offset }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      >
        <div className="flex gap-16 px-16">
          {Array.from({ length: 8 }).map((_, i) => (
            <CloudPuff key={i} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function CloudPuff() {
  return (
    <div className="relative">
      <Cloud className="w-20 h-20 text-white/80" />
      <div className="absolute inset-0 blur-2xl bg-white/20 rounded-full" />
    </div>
  );
}
