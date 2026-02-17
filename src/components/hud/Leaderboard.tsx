import { useState, useEffect } from "react";

interface Racer {
  position: number;
  name: string;
  gap: string;
  isPlayer: boolean;
}

const Leaderboard = () => {
  const [racers, setRacers] = useState<Racer[]>([
    { position: 1, name: "SHADOW_X", gap: "--", isPlayer: false },
    { position: 2, name: "NEON_DRV", gap: "+1.2s", isPlayer: false },
    { position: 3, name: ">>>YOU<<<", gap: "+2.8s", isPlayer: true },
    { position: 4, name: "PIXEL_01", gap: "+4.1s", isPlayer: false },
    { position: 5, name: "TURBO_99", gap: "+6.5s", isPlayer: false },
    { position: 6, name: "DRIFT_KG", gap: "+8.3s", isPlayer: false },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRacers((prev) => {
        const updated = [...prev];
        const playerIdx = updated.findIndex((r) => r.isPlayer);
        if (Math.random() > 0.7 && playerIdx > 0) {
          const temp = { ...updated[playerIdx - 1] };
          updated[playerIdx - 1] = {
            ...updated[playerIdx],
            position: temp.position,
          };
          updated[playerIdx] = { ...temp, position: updated[playerIdx].position };
        } else if (Math.random() > 0.8 && playerIdx < updated.length - 1) {
          const temp = { ...updated[playerIdx + 1] };
          updated[playerIdx + 1] = {
            ...updated[playerIdx],
            position: temp.position,
          };
          updated[playerIdx] = { ...temp, position: updated[playerIdx].position };
        }
        return updated.map((r, i) => ({
          ...r,
          position: i + 1,
          gap: i === 0 ? "--" : `+${(Math.random() * 10 + 0.5).toFixed(1)}s`,
        }));
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const getPositionColor = (pos: number) => {
    if (pos === 1) return "text-retro-yellow retro-text-glow";
    if (pos === 2) return "text-retro-cyan";
    if (pos === 3) return "text-retro-orange";
    return "text-muted-foreground";
  };

  return (
    <div className="pixel-border-yellow retro-shadow bg-retro-dark/90 p-3 relative scanline-overlay overflow-hidden">
      <div className="relative z-20">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[7px] text-retro-yellow uppercase tracking-wider">
            🏆 RACE
          </span>
          <span className="text-[6px] text-retro-cyan tabular-nums">
            6 RACERS
          </span>
        </div>

        <div className="space-y-[3px]">
          {racers.map((racer) => (
            <div
              key={racer.name}
              className={`flex items-center justify-between px-2 py-1 text-[7px] transition-all ${
                racer.isPlayer
                  ? "bg-retro-blue/40 border border-retro-cyan/50"
                  : "bg-retro-panel/30"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-4 text-right tabular-nums ${getPositionColor(
                    racer.position
                  )}`}
                >
                  {racer.position}
                </span>
                <span
                  className={
                    racer.isPlayer
                      ? "text-retro-cyan retro-text-glow"
                      : "text-retro-cyan/70"
                  }
                >
                  {racer.name}
                </span>
              </div>
              <span className="text-muted-foreground tabular-nums text-[6px]">
                {racer.gap}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
