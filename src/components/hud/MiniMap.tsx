import { useState, useEffect } from "react";

const MiniMap = () => {
  const [playerPos, setPlayerPos] = useState({ x: 50, y: 70 });

  const enemies = [
    { id: 1, x: 35, y: 25 },
    { id: 2, x: 65, y: 42 },
    { id: 3, x: 48, y: 58 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayerPos((prev) => ({
        x: Math.max(10, Math.min(90, prev.x + (Math.random() - 0.5) * 3)),
        y: Math.max(10, Math.min(90, prev.y - 0.2 + (Math.random() - 0.5) * 2)),
      }));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const trackPoints = "15,12 40,10 65,14 85,20 88,40 82,60 86,78 75,90 55,92 35,88 18,80 12,60 15,35 15,12";

  return (
    <div className="w-[120px] h-[120px] rounded-lg bg-black/30 backdrop-blur-sm border border-white/10 overflow-hidden p-2">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polyline
          points={trackPoints}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <polyline
          points={trackPoints}
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {enemies.map((e) => (
          <circle key={e.id} cx={e.x} cy={e.y} r="3" fill="#ef4444" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.5s" repeatCount="indefinite" />
          </circle>
        ))}
        <circle cx={playerPos.x} cy={playerPos.y} r="3.5" fill="#3b82f6" />
        <circle cx={playerPos.x} cy={playerPos.y} r="6" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.4">
          <animate attributeName="r" values="6;9;6" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
};

export default MiniMap;
