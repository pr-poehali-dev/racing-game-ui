import { useState, useEffect } from "react";
import Speedometer from "@/components/hud/Speedometer";
import HealthBar from "@/components/hud/HealthBar";
import NitroBoost from "@/components/hud/NitroBoost";
import MiniMap from "@/components/hud/MiniMap";
import Leaderboard from "@/components/hud/Leaderboard";
import EnemyRadar from "@/components/hud/EnemyRadar";
import ComboCounter from "@/components/hud/ComboCounter";
import WarningSystem from "@/components/hud/WarningSystem";

const Index = () => {
  const [time, setTime] = useState({ min: 2, sec: 34, ms: 56 });
  const [fps] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { min, sec, ms } = prev;
        ms += 3;
        if (ms >= 100) { ms = 0; sec += 1; }
        if (sec >= 60) { sec = 0; min += 1; }
        return { min, sec, ms };
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="min-h-screen bg-retro-black pixel-grid relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-50 scanline-overlay" />

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-2 bg-gradient-to-b from-retro-black/80 to-transparent">
        <div className="flex items-center gap-3">
          <span className="text-[7px] text-retro-cyan/50">FPS:{fps}</span>
          <span className="text-[7px] text-retro-green/50">PING:24ms</span>
        </div>

        <div className="text-center">
          <div className="text-[6px] text-retro-yellow/60 uppercase tracking-widest mb-1">
            RACE TIME
          </div>
          <div className="text-sm text-retro-green retro-text-glow tabular-nums font-pixel">
            {pad(time.min)}:{pad(time.sec)}.{pad(time.ms)}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[7px] text-retro-yellow/50">LAP 3/5</span>
          <span className="text-[7px] text-retro-cyan/50">BEST: 01:28.42</span>
        </div>
      </div>

      <div className="relative z-30 min-h-screen p-4 pt-14 grid grid-cols-12 gap-3 items-start">
        <div className="col-span-3 space-y-3">
          <HealthBar />
          <NitroBoost />
          <ComboCounter />
        </div>

        <div className="col-span-6 flex flex-col items-center justify-center min-h-[calc(100vh-7rem)]">
          <div className="w-full max-w-md">
            <WarningSystem />
          </div>

          <div className="mt-auto mb-8 w-full max-w-lg">
            <Speedometer />
          </div>
        </div>

        <div className="col-span-3 space-y-3">
          <MiniMap />
          <Leaderboard />
          <EnemyRadar />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center gap-6 py-2 bg-gradient-to-t from-retro-black/80 to-transparent">
        <div className="flex items-center gap-2 text-[6px] text-retro-cyan/40">
          <div className="px-2 py-1 border border-retro-cyan/30 text-retro-cyan/60">W</div>
          <span>ACCEL</span>
        </div>
        <div className="flex items-center gap-2 text-[6px] text-retro-cyan/40">
          <div className="px-2 py-1 border border-retro-cyan/30 text-retro-cyan/60">S</div>
          <span>BRAKE</span>
        </div>
        <div className="flex items-center gap-2 text-[6px] text-retro-cyan/40">
          <div className="px-2 py-1 border border-retro-cyan/30 text-retro-cyan/60">SPACE</div>
          <span>NITRO</span>
        </div>
        <div className="flex items-center gap-2 text-[6px] text-retro-cyan/40">
          <div className="px-2 py-1 border border-retro-cyan/30 text-retro-cyan/60">SHIFT</div>
          <span>DRIFT</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
