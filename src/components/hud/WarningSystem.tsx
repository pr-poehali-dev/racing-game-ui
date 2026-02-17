import { useState, useEffect } from "react";

interface Warning {
  id: number;
  message: string;
  type: "danger" | "caution" | "info";
}

const warningPool = [
  { message: "ENEMY CLOSE", type: "danger" as const },
  { message: "SHARP TURN", type: "caution" as const },
  { message: "CHECKPOINT", type: "info" as const },
  { message: "MISSILE!", type: "danger" as const },
  { message: "OIL SPILL", type: "caution" as const },
];

const WarningSystem = () => {
  const [warning, setWarning] = useState<Warning | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const template = warningPool[Math.floor(Math.random() * warningPool.length)];
        const w = { ...template, id: Date.now() };
        setWarning(w);
        setTimeout(() => setWarning(null), 2000);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!warning) return null;

  const color = warning.type === "danger"
    ? "text-red-400"
    : warning.type === "caution"
    ? "text-amber-400"
    : "text-white/60";

  return (
    <div className="animate-fade-in">
      <span className={`text-xs font-semibold tracking-[0.2em] ${color} hud-text-shadow`}>
        ⚠ {warning.message}
      </span>
    </div>
  );
};

export default WarningSystem;
