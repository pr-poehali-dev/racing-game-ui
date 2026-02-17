import { useState, useEffect } from "react";

const comboNames = [
  "",
  "NICE!",
  "GREAT!",
  "AWESOME!",
  "INCREDIBLE!",
  "LEGENDARY!",
  "GOD MODE!",
];

const ComboCounter = () => {
  const [combo, setCombo] = useState(0);
  const [multiplier, setMultiplier] = useState(1.0);
  const [score, setScore] = useState(0);
  const [showFlash, setShowFlash] = useState(false);
  const [lastAction, setLastAction] = useState("");

  const actions = [
    "DRIFT +150",
    "NEAR MISS +200",
    "OVERTAKE +300",
    "AIR TIME +250",
    "SLIPSTREAM +100",
    "PERFECT TURN +180",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        const action = actions[Math.floor(Math.random() * actions.length)];
        const points = parseInt(action.split("+")[1]);

        setCombo((prev) => Math.min(prev + 1, 6));
        setMultiplier((prev) => Math.min(prev + 0.2, 4.0));
        setScore((prev) => prev + points * multiplier);
        setLastAction(action);
        setShowFlash(true);
        setTimeout(() => setShowFlash(false), 300);
      } else {
        if (Math.random() > 0.7) {
          setCombo(0);
          setMultiplier(1.0);
        }
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [multiplier]);

  const comboName = comboNames[Math.min(combo, comboNames.length - 1)];

  return (
    <div
      className={`pixel-border retro-shadow bg-retro-dark/90 p-4 relative scanline-overlay overflow-hidden transition-all duration-100 ${
        showFlash ? "brightness-150" : ""
      }`}
      style={{
        borderImage:
          combo >= 4
            ? "linear-gradient(135deg, #ff2281, #ffd700, #39ff14) 1"
            : combo >= 2
            ? "linear-gradient(135deg, #ffd700, #ff6b35) 1"
            : undefined,
      }}
    >
      <div className="relative z-20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[7px] text-retro-purple uppercase tracking-wider">
            ⚡ COMBO
          </span>
          <span className="text-[7px] text-retro-yellow tabular-nums">
            SCORE: {Math.floor(score).toLocaleString()}
          </span>
        </div>

        {combo > 0 ? (
          <div className="text-center mb-2">
            <div
              className={`text-xl tabular-nums retro-text-glow ${
                combo >= 4
                  ? "text-retro-pink"
                  : combo >= 2
                  ? "text-retro-yellow"
                  : "text-retro-cyan"
              }`}
            >
              x{combo}
            </div>
            <div
              className={`text-[8px] uppercase tracking-widest mt-1 retro-text-glow ${
                combo >= 4
                  ? "text-retro-pink animate-pulse-glow"
                  : combo >= 2
                  ? "text-retro-yellow"
                  : "text-retro-green"
              }`}
            >
              {comboName}
            </div>
          </div>
        ) : (
          <div className="text-center mb-2 py-2">
            <div className="text-[8px] text-muted-foreground">NO COMBO</div>
          </div>
        )}

        <div className="h-2 bg-retro-panel/30 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-retro-purple to-retro-pink transition-all duration-300"
            style={{
              width: `${(multiplier / 4.0) * 100}%`,
              boxShadow: "0 0 8px rgba(188, 19, 254, 0.5)",
            }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[6px] text-muted-foreground">x1.0</span>
          <span className="text-[6px] text-retro-purple tabular-nums">
            x{multiplier.toFixed(1)}
          </span>
          <span className="text-[6px] text-muted-foreground">x4.0</span>
        </div>

        {lastAction && combo > 0 && (
          <div className="mt-2 text-center text-[7px] text-retro-green animate-slide-up retro-text-glow">
            {lastAction}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComboCounter;
