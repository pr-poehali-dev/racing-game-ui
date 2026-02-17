import { useState, useEffect } from "react";

interface Enemy {
  id: number;
  x: number;
  y: number;
  color: string;
}

const MiniMap = () => {
  const [playerPos, setPlayerPos] = useState({ x: 50, y: 70 });
  const [enemies] = useState<Enemy[]>([
    { id: 1, x: 30, y: 20, color: "#ff073a" },
    { id: 2, x: 70, y: 40, color: "#ff073a" },
    { id: 3, x: 45, y: 55, color: "#ff073a" },
    { id: 4, x: 80, y: 75, color: "#ff6b35" },
  ]);
  const [checkpoints] = useState([
    { x: 20, y: 15 },
    { x: 75, y: 30 },
    { x: 50, y: 85 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayerPos((prev) => ({
        x: Math.max(5, Math.min(95, prev.x + (Math.random() - 0.5) * 4)),
        y: Math.max(5, Math.min(95, prev.y - 0.3 + (Math.random() - 0.5) * 2)),
      }));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const trackPoints = [
    "10,10", "30,8", "50,12", "70,8", "90,15",
    "92,35", "85,55", "90,75", "80,90",
    "60,92", "40,88", "20,85", "10,70",
    "8,50", "12,30", "10,10",
  ].join(" ");

  return (
    <div className="pixel-border retro-shadow bg-retro-dark/90 p-3 relative scanline-overlay overflow-hidden">
      <div className="relative z-20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[7px] text-retro-cyan uppercase tracking-wider">MAP</span>
          <span className="text-[6px] text-retro-yellow">LAP 3/5</span>
        </div>

        <div className="relative w-full aspect-square bg-retro-black/80 pixel-grid overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0">
            <polyline
              points={trackPoints}
              fill="none"
              stroke="#1a1a2e"
              strokeWidth="8"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <polyline
              points={trackPoints}
              fill="none"
              stroke="#0f3460"
              strokeWidth="4"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeDasharray="2 2"
            />

            {checkpoints.map((cp, i) => (
              <g key={i}>
                <rect
                  x={cp.x - 2}
                  y={cp.y - 2}
                  width={4}
                  height={4}
                  fill="#ffd700"
                  opacity={0.8}
                />
                <rect
                  x={cp.x - 3}
                  y={cp.y - 3}
                  width={6}
                  height={6}
                  fill="none"
                  stroke="#ffd700"
                  strokeWidth={0.5}
                  opacity={0.4}
                />
              </g>
            ))}

            {enemies.map((enemy) => (
              <g key={enemy.id}>
                <rect
                  x={enemy.x - 1.5}
                  y={enemy.y - 1.5}
                  width={3}
                  height={3}
                  fill={enemy.color}
                />
                <rect
                  x={enemy.x - 2.5}
                  y={enemy.y - 2.5}
                  width={5}
                  height={5}
                  fill="none"
                  stroke={enemy.color}
                  strokeWidth={0.5}
                  opacity={0.5}
                >
                  <animate
                    attributeName="opacity"
                    values="0.5;0.1;0.5"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </rect>
              </g>
            ))}

            <g>
              <rect
                x={playerPos.x - 2}
                y={playerPos.y - 2}
                width={4}
                height={4}
                fill="#53d8fb"
              />
              <rect
                x={playerPos.x - 4}
                y={playerPos.y - 4}
                width={8}
                height={8}
                fill="none"
                stroke="#53d8fb"
                strokeWidth={0.8}
                opacity={0.6}
              >
                <animate
                  attributeName="opacity"
                  values="0.6;0.2;0.6"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </rect>
            </g>
          </svg>

          <div className="absolute bottom-1 left-1 text-[5px] text-retro-cyan/60">
            N↑
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniMap;
