import { useState, useEffect } from "react";

interface Enemy {
  id: number;
  distance: number;
  direction: string;
}

const EnemyRadar = () => {
  const [enemies, setEnemies] = useState<Enemy[]>([
    { id: 1, distance: 45, direction: "ahead" },
    { id: 2, distance: 120, direction: "behind" },
    { id: 3, distance: 200, direction: "left" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnemies((prev) =>
        prev.map((e) => ({
          ...e,
          distance: Math.max(10, e.distance + (Math.random() - 0.5) * 20),
        }))
      );
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const nearest = Math.min(...enemies.map((e) => e.distance));
  const isClose = nearest < 60;

  return (
    <div className="flex items-center gap-3">
      {isClose && (
        <div className="flex items-center gap-1.5 animate-fade-in">
          <div
            className="w-2 h-2 rounded-full bg-red-500 animate-pulse-soft"
            style={{ boxShadow: "0 0 8px rgba(239,68,68,0.6)" }}
          />
          <span className="text-xs text-red-400 font-semibold tracking-wider">
            {Math.floor(nearest)}m
          </span>
        </div>
      )}
    </div>
  );
};

export default EnemyRadar;
