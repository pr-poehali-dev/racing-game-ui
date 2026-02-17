import { useState, useEffect } from "react";

const Speedometer = () => {
  const [speed, setSpeed] = useState(80);
  const maxSpeed = 280;

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed((prev) => {
        const next = prev + (Math.random() - 0.4) * 8;
        return Math.max(0, Math.min(maxSpeed, next));
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const radius = 52;
  const cx = 60;
  const cy = 60;
  const startAngle = 135;
  const endAngle = 405;
  const sweepAngle = endAngle - startAngle;
  const speedRatio = speed / maxSpeed;
  const needleAngle = startAngle + speedRatio * sweepAngle;

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const arcPath = (r: number, start: number, end: number) => {
    const sx = cx + r * Math.cos(toRad(start));
    const sy = cy + r * Math.sin(toRad(start));
    const ex = cx + r * Math.cos(toRad(end));
    const ey = cy + r * Math.sin(toRad(end));
    const large = end - start > 180 ? 1 : 0;
    return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`;
  };

  const needleX = cx + (radius - 14) * Math.cos(toRad(needleAngle));
  const needleY = cy + (radius - 14) * Math.sin(toRad(needleAngle));

  return (
    <div className="relative w-[140px] h-[140px]">
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <path
          d={arcPath(radius, startAngle, endAngle)}
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d={arcPath(radius, startAngle, Math.min(needleAngle, endAngle))}
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {speedRatio > 0.75 && (
          <path
            d={arcPath(radius, startAngle + sweepAngle * 0.75, Math.min(needleAngle, endAngle))}
            fill="none"
            stroke="rgba(239,68,68,0.7)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        )}
        <line
          x1={cx}
          y1={cy}
          x2={needleX}
          y2={needleY}
          stroke={speedRatio > 0.75 ? "#ef4444" : "rgba(255,255,255,0.9)"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r="3" fill="rgba(255,255,255,0.4)" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-6">
        <span className="text-[10px] text-white/40 font-light tracking-widest">KM/H</span>
        <span className="text-3xl font-black text-white hud-text-shadow tabular-nums leading-none">
          {String(Math.floor(speed)).padStart(3, "0")}
        </span>
      </div>
    </div>
  );
};

export default Speedometer;
