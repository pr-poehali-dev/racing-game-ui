import { useState, useEffect } from "react";

interface Enemy {
  id: number;
  name: string;
  distance: number;
  threat: "low" | "medium" | "high";
  direction: string;
}

const EnemyRadar = () => {
  const [enemies, setEnemies] = useState<Enemy[]>([
    { id: 1, name: "SHADOW_X", distance: 45, threat: "high", direction: "↗" },
    { id: 2, name: "NEON_DRV", distance: 120, threat: "medium", direction: "→" },
    { id: 3, name: "PIXEL_01", distance: 200, threat: "low", direction: "↙" },
  ]);
  const [scanAngle, setScanAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanAngle((prev) => (prev + 6) % 360);
      setEnemies((prev) =>
        prev.map((e) => ({
          ...e,
          distance: Math.max(10, e.distance + (Math.random() - 0.5) * 30),
          threat: e.distance < 80 ? "high" : e.distance < 150 ? "medium" : "low",
        }))
      );
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const getThreatColor = (threat: string) => {
    if (threat === "high") return "text-retro-red";
    if (threat === "medium") return "text-retro-orange";
    return "text-retro-green";
  };

  const getThreatBg = (threat: string) => {
    if (threat === "high") return "bg-retro-red/20 border-retro-red/50";
    if (threat === "medium") return "bg-retro-orange/10 border-retro-orange/30";
    return "bg-retro-green/10 border-retro-green/30";
  };

  return (
    <div className="pixel-border-red retro-shadow bg-retro-dark/90 p-3 relative scanline-overlay overflow-hidden">
      <div className="relative z-20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[7px] text-retro-red uppercase tracking-wider">
            👾 ENEMIES
          </span>
          <div className="flex items-center gap-1">
            <div
              className="w-2 h-2 bg-retro-red rounded-full"
              style={{
                boxShadow: "0 0 6px rgba(255,7,58,0.8)",
                animation: "pulse-glow 1s ease-in-out infinite",
              }}
            />
            <span className="text-[6px] text-retro-red tabular-nums">
              {enemies.length} DETECTED
            </span>
          </div>
        </div>

        <div className="relative w-full aspect-square mb-2 bg-retro-black/60 overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#0f3460" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="#0f3460" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="15" fill="none" stroke="#0f3460" strokeWidth="0.5" />
            <line x1="50" y1="5" x2="50" y2="95" stroke="#0f3460" strokeWidth="0.3" />
            <line x1="5" y1="50" x2="95" y2="50" stroke="#0f3460" strokeWidth="0.3" />

            <line
              x1="50"
              y1="50"
              x2={50 + 45 * Math.cos((scanAngle * Math.PI) / 180)}
              y2={50 + 45 * Math.sin((scanAngle * Math.PI) / 180)}
              stroke="#39ff14"
              strokeWidth="0.5"
              opacity="0.6"
            />
            <circle
              cx={50 + 45 * Math.cos((scanAngle * Math.PI) / 180)}
              cy={50 + 45 * Math.sin((scanAngle * Math.PI) / 180)}
              r="2"
              fill="#39ff14"
              opacity="0.4"
            />

            <rect x="48" y="48" width="4" height="4" fill="#53d8fb" />

            {enemies.map((enemy, i) => {
              const angle = (i * 120 + 30) * (Math.PI / 180);
              const dist = Math.min(40, enemy.distance / 5);
              const ex = 50 + dist * Math.cos(angle);
              const ey = 50 + dist * Math.sin(angle);
              const color = enemy.threat === "high" ? "#ff073a" : enemy.threat === "medium" ? "#ff6b35" : "#39ff14";
              return (
                <g key={enemy.id}>
                  <rect x={ex - 2} y={ey - 2} width={4} height={4} fill={color}>
                    {enemy.threat === "high" && (
                      <animate attributeName="opacity" values="1;0.3;1" dur="0.5s" repeatCount="indefinite" />
                    )}
                  </rect>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="space-y-[2px]">
          {enemies.map((enemy) => (
            <div
              key={enemy.id}
              className={`flex items-center justify-between px-2 py-1 text-[6px] border ${getThreatBg(
                enemy.threat
              )} ${enemy.threat === "high" ? "animate-pulse-glow" : ""}`}
            >
              <div className="flex items-center gap-1">
                <span className={getThreatColor(enemy.threat)}>●</span>
                <span className="text-retro-cyan/80">{enemy.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground tabular-nums">
                  {Math.floor(enemy.distance)}m
                </span>
                <span className={getThreatColor(enemy.threat)}>{enemy.direction}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnemyRadar;
