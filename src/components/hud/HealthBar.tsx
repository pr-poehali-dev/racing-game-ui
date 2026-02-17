import { useState, useEffect } from "react";

const HealthBar = () => {
  const [health, setHealth] = useState(82);

  useEffect(() => {
    const interval = setInterval(() => {
      setHealth((prev) => {
        const dmg = Math.random() > 0.7 ? Math.random() * 6 : 0;
        const heal = Math.random() > 0.9 ? Math.random() * 4 : 0;
        return Math.max(0, Math.min(100, prev - dmg + heal));
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const isLow = health < 25;
  const isMedium = health < 50;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-[6px] h-24 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`absolute bottom-0 w-full rounded-full transition-all duration-300 ${
            isLow ? "bg-red-500" : isMedium ? "bg-amber-400" : "bg-white/80"
          } ${isLow ? "animate-pulse-soft" : ""}`}
          style={{ height: `${health}%` }}
        />
      </div>
      <span className="text-[9px] text-white/40 font-light">HP</span>
    </div>
  );
};

export default HealthBar;
