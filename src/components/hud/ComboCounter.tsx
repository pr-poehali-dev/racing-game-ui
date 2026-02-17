import { useState, useEffect } from "react";

const ComboCounter = () => {
  const [combo, setCombo] = useState(0);
  const [showCombo, setShowCombo] = useState(false);
  const [comboText, setComboText] = useState("");

  const labels = ["", "NICE", "GREAT", "AWESOME", "INCREDIBLE", "LEGENDARY"];
  const actions = ["DRIFT", "NEAR MISS", "OVERTAKE", "AIR TIME", "SLIPSTREAM"];

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.45) {
        const action = actions[Math.floor(Math.random() * actions.length)];
        setCombo((prev) => {
          const next = Math.min(prev + 1, 5);
          setComboText(`${action} x${next}`);
          return next;
        });
        setShowCombo(true);
        setTimeout(() => setShowCombo(false), 1200);
      } else if (Math.random() > 0.6) {
        setCombo(0);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!showCombo || combo === 0) return null;

  return (
    <div className="flex flex-col items-center gap-0.5 animate-fade-in">
      <span className="text-sm font-bold text-white/90 hud-text-shadow tracking-wider">
        {comboText}
      </span>
      <span className="text-[10px] text-amber-400 font-semibold tracking-widest">
        {labels[combo]}
      </span>
    </div>
  );
};

export default ComboCounter;
