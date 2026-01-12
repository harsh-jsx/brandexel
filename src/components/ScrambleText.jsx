import { useState, useEffect, useRef, useCallback } from "react";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const ScrambleText = ({ text, isHovered, className, style }) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);
  const frameRef = useRef(0);
  const isScrambling = useRef(false);

  const scramble = useCallback(() => {
    if (isScrambling.current) return;
    isScrambling.current = true;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    frameRef.current = 0;
    const totalFrames = 28; // Slower animation
    const textLength = text.length;

    intervalRef.current = setInterval(() => {
      frameRef.current++;

      // Eased progress for smoother reveal
      const linearProgress = frameRef.current / totalFrames;
      const easedProgress = 1 - Math.pow(1 - linearProgress, 3); // Ease out cubic
      const revealIndex = Math.floor(easedProgress * textLength);

      let result = "";
      for (let i = 0; i < textLength; i++) {
        if (text[i] === " ") {
          result += " ";
        } else if (i < revealIndex) {
          result += text[i];
        } else if (i === revealIndex) {
          // Current character being revealed - more scramble iterations
          result += chars[Math.floor(Math.random() * chars.length)];
        } else {
          // Characters yet to be revealed - subtle scramble
          if (Math.random() > 0.7) {
            result += chars[Math.floor(Math.random() * chars.length)];
          } else {
            result += text[i];
          }
        }
      }

      setDisplayText(result);

      if (frameRef.current >= totalFrames) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setDisplayText(text);
        isScrambling.current = false;
      }
    }, 50); // Slower interval
  }, [text]);

  const reset = useCallback(() => {
    // Don't interrupt mid-scramble, let it complete naturally
    if (!isScrambling.current) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setDisplayText(text);
    }
  }, [text]);

  useEffect(() => {
    if (isHovered) {
      scramble();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, scramble]);

  // Reset text when not hovered and not scrambling
  useEffect(() => {
    if (!isHovered && !isScrambling.current) {
      setDisplayText(text);
    }
  }, [isHovered, text]);

  return (
    <span className={className} style={style}>
      {displayText}
    </span>
  );
};

export default ScrambleText;
