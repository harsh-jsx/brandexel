import { useEffect, useRef, useState, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const ScrambleText = ({ text, isHovered, className, style }) => {
  const [displayText, setDisplayText] = useState(text);

  const rafRef = useRef(null);
  const startTimeRef = useRef(null);
  const isRunningRef = useRef(false);

  const DURATION = 1500; // ms (smooth, premium feel)

  const cancelAnimation = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    isRunningRef.current = false;
    startTimeRef.current = null;
  };

  const animate = useCallback(
    (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / DURATION, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const revealCount = Math.floor(eased * text.length);

      let output = "";

      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          output += " ";
        } else if (i < revealCount) {
          output += text[i];
        } else {
          output += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplayText(output);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
        cancelAnimation();
      }
    },
    [text]
  );

  useEffect(() => {
    if (isHovered && !isRunningRef.current) {
      isRunningRef.current = true;
      rafRef.current = requestAnimationFrame(animate);
    }

    if (!isHovered) {
      cancelAnimation();
      setDisplayText(text);
    }

    return cancelAnimation;
  }, [isHovered, animate, text]);

  return (
    <span className={className} style={style}>
      {displayText}
    </span>
  );
};

export default ScrambleText;
