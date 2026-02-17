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
  const [score, setScore] = useState(1500);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        setScore((prev) => prev + Math.floor(Math.random() * 200 + 50));
      }
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-screen relative overflow-hidden select-none">
      <img
        src="https://cdn.poehali.dev/files/fc300b7e-2fa0-473f-a178-088b03a70eb2.png"
        alt="race background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

      <div className="absolute top-6 left-8 z-10">
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-black text-white hud-text-shadow tabular-nums">
            {score.toLocaleString()}
          </span>
          <span className="text-sm font-semibold text-white/50 tracking-widest">SCORE</span>
        </div>
      </div>

      <div className="absolute top-6 right-8 z-10">
        <EnemyRadar />
      </div>

      <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10 flex items-center">
        <div className="ml-8 flex flex-col items-center">
          <Leaderboard />
        </div>
      </div>

      <div className="absolute left-8 bottom-8 z-10 flex gap-4">
        <HealthBar />
        <NitroBoost />
      </div>

      <div className="absolute bottom-8 right-8 z-10">
        <Speedometer />
      </div>

      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <WarningSystem />
        <ComboCounter />
      </div>

      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
        <MiniMap />
      </div>
    </div>
  );
};

export default Index;
