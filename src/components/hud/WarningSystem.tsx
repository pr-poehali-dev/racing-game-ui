import { useState, useEffect } from "react";

interface Warning {
  id: number;
  type: "danger" | "caution" | "info";
  message: string;
  icon: string;
}

const warningPool: Omit<Warning, "id">[] = [
  { type: "danger", message: "ENEMY APPROACHING!", icon: "⚠" },
  { type: "danger", message: "COLLISION IMMINENT!", icon: "💥" },
  { type: "caution", message: "SHARP TURN AHEAD", icon: "↩" },
  { type: "caution", message: "LOW FUEL WARNING", icon: "⛽" },
  { type: "info", message: "CHECKPOINT NEAR", icon: "🏁" },
  { type: "info", message: "SHORTCUT DETECTED", icon: "✨" },
  { type: "danger", message: "MISSILE INCOMING!", icon: "🚀" },
  { type: "caution", message: "OIL SPILL AHEAD", icon: "🛢" },
];

const WarningSystem = () => {
  const [warnings, setWarnings] = useState<Warning[]>([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        const template = warningPool[Math.floor(Math.random() * warningPool.length)];
        const newWarning: Warning = { ...template, id: nextId };
        setNextId((prev) => prev + 1);

        setWarnings((prev) => [...prev.slice(-3), newWarning]);

        setTimeout(() => {
          setWarnings((prev) => prev.filter((w) => w.id !== newWarning.id));
        }, 3000);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [nextId]);

  const getWarningStyle = (type: string) => {
    if (type === "danger")
      return "border-retro-red/70 bg-retro-red/15 text-retro-red";
    if (type === "caution")
      return "border-retro-yellow/70 bg-retro-yellow/10 text-retro-yellow";
    return "border-retro-cyan/50 bg-retro-cyan/10 text-retro-cyan";
  };

  return (
    <div className="space-y-1">
      {warnings.length === 0 && (
        <div className="pixel-border retro-shadow bg-retro-dark/90 p-3 relative scanline-overlay overflow-hidden">
          <div className="relative z-20 flex items-center justify-center gap-2 text-[7px] text-retro-green">
            <div className="w-2 h-2 bg-retro-green rounded-full" style={{ boxShadow: "0 0 6px rgba(57,255,20,0.5)" }} />
            ALL CLEAR — NO WARNINGS
          </div>
        </div>
      )}
      {warnings.map((warning) => (
        <div
          key={warning.id}
          className={`border-2 p-2 flex items-center gap-2 animate-slide-up ${getWarningStyle(
            warning.type
          )} ${warning.type === "danger" ? "animate-shake" : ""}`}
          style={{
            boxShadow:
              warning.type === "danger"
                ? "0 0 15px rgba(255,7,58,0.3), inset 0 0 10px rgba(255,7,58,0.1)"
                : undefined,
          }}
        >
          <span className="text-sm">{warning.icon}</span>
          <span
            className={`text-[7px] uppercase tracking-wider flex-1 ${
              warning.type === "danger" ? "animate-blink" : ""
            }`}
          >
            {warning.message}
          </span>
          <span className="text-[6px] opacity-50">
            {warning.type === "danger" ? "!!!" : warning.type === "caution" ? "!" : "i"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default WarningSystem;
