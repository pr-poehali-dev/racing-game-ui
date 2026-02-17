import { useState, useEffect } from "react";

const NitroBoost = () => {
  const [nitro, setNitro] = useState(65);
  const [isActive, setIsActive] = useState(false);
  const maxNitro = 100;

  useEffect(() => {
    const interval = setInterval(() => {
      setNitro((prev) => {
        if (isActive) {
          const next = prev - 2;
          if (next <= 0) {
            setIsActive(false);
            return 0;
          }
          return next;
        }
        return Math.min(maxNitro, prev + 0.5);
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    const toggleNitro = () => {
      if (nitro > 20) setIsActive((prev) => !prev);
    };
    const interval = setInterval(toggleNitro, 3000 + Math.random() * 4000);
    return () => clearInterval(interval);
  }, [nitro]);

  const percentage = (nitro / maxNitro) * 100;
  const bars = 15;
  const filledBars = Math.floor((percentage / 100) * bars);

  return (
    <div
      className={`pixel-border retro-shadow bg-retro-dark/90 p-4 relative scanline-overlay overflow-hidden transition-all duration-200 ${
        isActive ? "border-retro-cyan" : ""
      }`}
      style={{
        borderImage: isActive
          ? "linear-gradient(135deg, #53d8fb, #39ff14) 1"
          : undefined,
        boxShadow: isActive
          ? "0 0 20px rgba(83, 216, 251, 0.5), inset 0 0 10px rgba(0, 0, 0, 0.5)"
          : undefined,
      }}
    >
      <div className="relative z-20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">🔥</span>
            <span className="text-[8px] text-retro-cyan uppercase tracking-wider">
              N2O
            </span>
          </div>
          {isActive && (
            <span className="text-[7px] text-retro-cyan animate-pulse-glow uppercase tracking-widest">
              ▶ ACTIVE
            </span>
          )}
        </div>

        <div className="flex flex-col gap-[2px]">
          {Array.from({ length: bars })
            .map((_, i) => bars - 1 - i)
            .map((i) => (
              <div
                key={i}
                className={`h-[6px] transition-all duration-100 ${
                  i < filledBars
                    ? isActive
                      ? "bg-retro-cyan animate-pulse-glow"
                      : "bg-retro-blue"
                    : "bg-retro-panel/30"
                }`}
                style={{
                  width: `${60 + (i / bars) * 40}%`,
                  boxShadow:
                    i < filledBars
                      ? isActive
                        ? "0 0 8px rgba(83, 216, 251, 0.6)"
                        : "0 0 4px rgba(15, 52, 96, 0.5)"
                      : "none",
                }}
              />
            ))}
        </div>

        <div className="mt-2 flex justify-between items-center">
          <span className="text-[8px] text-muted-foreground tabular-nums">
            {Math.floor(percentage)}%
          </span>
          <div className="text-[7px] text-retro-yellow">
            {isActive ? "🚀 BOOST ON" : "PRESS [SPACE]"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NitroBoost;
