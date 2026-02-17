import { useState, useEffect } from "react";

const NitroBoost = () => {
  const [nitro, setNitro] = useState(70);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setNitro((prev) => {
        if (isActive) {
          const next = prev - 1.5;
          if (next <= 0) { setIsActive(false); return 0; }
          return next;
        }
        return Math.min(100, prev + 0.4);
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (nitro > 20) setIsActive((prev) => !prev);
    }, 3000 + Math.random() * 4000);
    return () => clearInterval(interval);
  }, [nitro]);

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-[6px] h-24 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`absolute bottom-0 w-full rounded-full transition-all duration-150 ${
            isActive ? "bg-cyan-400" : "bg-blue-400/60"
          }`}
          style={{
            height: `${nitro}%`,
            boxShadow: isActive ? "0 0 8px rgba(34,211,238,0.6)" : "none",
          }}
        />
      </div>
      <span className={`text-[9px] font-light ${isActive ? "text-cyan-400" : "text-white/40"}`}>
        N2O
      </span>
    </div>
  );
};

export default NitroBoost;
