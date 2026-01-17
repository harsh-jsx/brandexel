import { useEffect, useRef, useState, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const ScrambleText = ({ text, isHovered, className, style }) => {
  const [displayText, setDisplayText] = useState(text);

  const rafRef = useRef(null);
  const startTimeRef = useRef(null);
  const runningRef = useRef(false);

  // Faster + smoother
  const DURATION = 900; // ms (was 1500)

  const stop = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    runningRef.current = false;
    startTimeRef.current = null;
  };

  const animate = useCallback(
    (time) => {
      if (!startTimeRef.current) startTimeRef.current = time;
      const elapsed = time - startTimeRef.current;
      const t = Math.min(elapsed / DURATION, 1);

      // Smooth quartic ease-out (cleaner than cubic)
      const eased = 1 - Math.pow(1 - t, 4);

      let output = "";

      for (let i = 0; i < text.length; i++) {
        const revealThreshold = eased - i / text.length;

        if (text[i] === " ") {
          output += " ";
        } else if (revealThreshold > 0) {
          output += text[i];
        } else {
          // Reduce flicker near the end
          output +=
            eased > 0.85
              ? CHARS[
                  (text.charCodeAt(i) + Math.floor(elapsed / 60)) % CHARS.length
                ]
              : CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplayText(output);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
        stop();
      }
    },
    [text]
  );

  useEffect(() => {
    if (isHovered && !runningRef.current) {
      runningRef.current = true;
      rafRef.current = requestAnimationFrame(animate);
    }

    if (!isHovered) {
      stop();
      setDisplayText(text);
    }

    return stop;
  }, [isHovered, animate, text]);

  return (
    <span className={className} style={style}>
      {displayText}
    </span>
  );
};

export default ScrambleText;
