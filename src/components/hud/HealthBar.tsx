import { useState, useEffect } from "react";

const HealthBar = () => {
  const [health, setHealth] = useState(78);
  const maxHealth = 100;

  useEffect(() => {
    const interval = setInterval(() => {
      setHealth((prev) => {
        const dmg = Math.random() > 0.7 ? Math.random() * 8 : 0;
        const heal = Math.random() > 0.9 ? Math.random() * 5 : 0;
        return Math.max(0, Math.min(maxHealth, prev - dmg + heal));
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const percentage = (health / maxHealth) * 100;
  const isLow = percentage < 25;
  const isMedium = percentage < 50;

  const getBarColor = () => {
    if (isLow) return "bg-retro-red";
    if (isMedium) return "bg-retro-orange";
    return "bg-retro-green";
  };

  const getGlowColor = () => {
    if (isLow) return "rgba(255, 7, 58, 0.5)";
    if (isMedium) return "rgba(255, 107, 53, 0.3)";
    return "rgba(57, 255, 20, 0.3)";
  };

  const segments = 10;
  const filledSegments = Math.ceil((percentage / 100) * segments);

  return (
    <div className="pixel-border-green retro-shadow bg-retro-dark/90 p-4 relative scanline-overlay overflow-hidden">
      <div className="relative z-20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">❤️</span>
            <span className="text-[8px] text-retro-green uppercase tracking-wider">HP</span>
          </div>
          <span className={`text-sm tabular-nums retro-text-glow ${isLow ? "text-retro-red animate-blink" : isMedium ? "text-retro-orange" : "text-retro-green"}`}>
            {Math.floor(health)}/{maxHealth}
          </span>
        </div>

        <div className="flex gap-[2px] h-5">
          {Array.from({ length: segments }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 transition-all duration-200 ${
                i < filledSegments ? getBarColor() : "bg-retro-panel/40"
              } ${isLow && i < filledSegments ? "animate-pulse-glow" : ""}`}
              style={{
                boxShadow: i < filledSegments ? `0 0 6px ${getGlowColor()}` : "none",
              }}
            />
          ))}
        </div>

        {isLow && (
          <div className="mt-2 text-[7px] text-retro-red animate-blink text-center uppercase tracking-widest">
            ⚠ CRITICAL DAMAGE ⚠
          </div>
        )}

        <div className="mt-2 flex gap-2">
          <div className="flex items-center gap-1 text-[7px] text-retro-cyan">
            <div className="w-2 h-2 bg-retro-cyan" />
            ARMOR: 45
          </div>
          <div className="flex items-center gap-1 text-[7px] text-retro-purple">
            <div className="w-2 h-2 bg-retro-purple" />
            SHIELD: 12
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthBar;
