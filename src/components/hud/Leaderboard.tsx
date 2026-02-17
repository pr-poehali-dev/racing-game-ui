import { useState, useEffect } from "react";

interface Racer {
  name: string;
  isPlayer: boolean;
}

const Leaderboard = () => {
  const [racers, setRacers] = useState<Racer[]>([
    { name: "SHD", isPlayer: false },
    { name: "NEO", isPlayer: false },
    { name: "YOU", isPlayer: true },
    { name: "PIX", isPlayer: false },
    { name: "TRB", isPlayer: false },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRacers((prev) => {
        const updated = [...prev];
        const playerIdx = updated.findIndex((r) => r.isPlayer);
        if (Math.random() > 0.7 && playerIdx > 0) {
          [updated[playerIdx - 1], updated[playerIdx]] = [updated[playerIdx], updated[playerIdx - 1]];
        } else if (Math.random() > 0.85 && playerIdx < updated.length - 1) {
          [updated[playerIdx + 1], updated[playerIdx]] = [updated[playerIdx], updated[playerIdx + 1]];
        }
        return updated;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const playerPos = racers.findIndex((r) => r.isPlayer);

  return (
    <div className="flex flex-col items-center gap-0">
      <span className="text-[9px] text-white/40 font-light mb-2">RANK</span>
      <div className="relative">
        <div className="w-[3px] h-28 bg-white/10 rounded-full" />
        {racers.map((racer, i) => {
          const y = (i / (racers.length - 1)) * 100;
          return (
            <div
              key={racer.name}
              className="absolute left-1/2 -translate-x-1/2 transition-all duration-700 ease-out"
              style={{ top: `${y}%`, transform: `translate(-50%, -50%)` }}
            >
              <div
                className={`w-3 h-3 rounded-full ${
                  racer.isPlayer ? "bg-blue-500" : "bg-red-500/70"
                }`}
                style={{
                  boxShadow: racer.isPlayer ? "0 0 8px rgba(59,130,246,0.6)" : "none",
                }}
              />
            </div>
          );
        })}
      </div>
      <span className="text-xs font-bold text-white/80 mt-2">{playerPos + 1}/{racers.length}</span>
    </div>
  );
};

export default Leaderboard;
