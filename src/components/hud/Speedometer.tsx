import { useState, useEffect } from "react";

const Speedometer = () => {
  const [speed, setSpeed] = useState(0);
  const [gear, setGear] = useState(1);
  const maxSpeed = 320;

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed((prev) => {
        const next = prev + Math.random() * 15 - 3;
        const clamped = Math.max(0, Math.min(maxSpeed, next));
        setGear(Math.min(6, Math.floor(clamped / 55) + 1));
        return clamped;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const percentage = (speed / maxSpeed) * 100;
  const barSegments = 20;
  const filledSegments = Math.floor((percentage / 100) * barSegments);

  const getSegmentColor = (index: number) => {
    const ratio = index / barSegments;
    if (ratio < 0.4) return "bg-retro-green";
    if (ratio < 0.7) return "bg-retro-yellow";
    if (ratio < 0.85) return "bg-retro-orange";
    return "bg-retro-red";
  };

  return (
    <div className="pixel-border retro-shadow bg-retro-dark/90 p-4 relative scanline-overlay overflow-hidden">
      <div className="relative z-20">
        <div className="flex items-baseline justify-between mb-3">
          <span className="text-[8px] text-retro-cyan uppercase tracking-wider">SPD</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl text-retro-green retro-text-glow tabular-nums">
              {Math.floor(speed)}
            </span>
            <span className="text-[8px] text-retro-cyan">KM/H</span>
          </div>
        </div>

        <div className="flex gap-[3px] mb-3 h-4">
          {Array.from({ length: barSegments }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 transition-all duration-75 ${
                i < filledSegments
                  ? `${getSegmentColor(i)} opacity-100`
                  : "bg-retro-panel opacity-30"
              }`}
              style={{
                boxShadow: i < filledSegments ? "0 0 4px currentColor" : "none",
              }}
            />
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5, 6].map((g) => (
              <div
                key={g}
                className={`w-6 h-6 flex items-center justify-center text-[8px] border ${
                  g === gear
                    ? "border-retro-cyan text-retro-cyan retro-text-glow bg-retro-blue/50"
                    : "border-retro-panel text-retro-panel"
                }`}
              >
                {g}
              </div>
            ))}
          </div>
          <div className="text-[8px] text-retro-yellow">
            GEAR <span className="text-sm retro-text-glow">{gear}</span>
          </div>
        </div>

        <div className="mt-2 flex justify-between text-[6px] text-muted-foreground">
          <span>0</span>
          <span>80</span>
          <span>160</span>
          <span>240</span>
          <span>320</span>
        </div>
      </div>
    </div>
  );
};

export default Speedometer;
