import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import eyeIcon from "../assets/eyeIcon.svg";

const TRAIL_COUNT = 5;

const CustomCursor = ({ isDark }) => {
  const cursorRef = useRef(null);
  const eyeRef = useRef(null);
  const trailsRef = useRef([]);

  const mouse = useRef({ x: 0, y: 0 });
  const isEyeMode = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const eye = eyeRef.current;
    const trails = trailsRef.current;

    if (!cursor) return;

    /* ===============================
       QUICK SETTERS (NO LAG)
    =============================== */
    const setCursorX = gsap.quickSetter(cursor, "x", "px");
    const setCursorY = gsap.quickSetter(cursor, "y", "px");
    const setCursorScale = gsap.quickSetter(cursor, "scale");

    const trailSetters = trails.map((el) => ({
      x: gsap.quickSetter(el, "x", "px"),
      y: gsap.quickSetter(el, "y", "px"),
    }));

    /* ===============================
       MOUSE MOVE
    =============================== */
    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    /* ===============================
       RENDER LOOP
    =============================== */
    gsap.ticker.add(() => {
      setCursorX(mouse.current.x);
      setCursorY(mouse.current.y);

      trailSetters.forEach((setter, i) => {
        gsap.to(trails[i], {
          x: mouse.current.x,
          y: mouse.current.y,
          duration: 0.35 + i * 0.08,
          ease: "power3.out",
        });
      });
    });

    /* ===============================
       HOVER LOGIC (EYE MODE)
    =============================== */
    const onMouseOver = (e) => {
      if (e.target.closest(".show-eyes")) {
        if (isEyeMode.current) return;
        isEyeMode.current = true;

        gsap.to(cursor, { scale: 1.4, duration: 0.2 });
        gsap.to(eye, { opacity: 1, scale: 1, duration: 0.2 });
      }
    };

    const onMouseOut = (e) => {
      if (e.target.closest(".show-eyes")) {
        isEyeMode.current = false;

        gsap.to(cursor, { scale: 1, duration: 0.2 });
        gsap.to(eye, { opacity: 0, scale: 0.5, duration: 0.2 });
      }
    };

    /* ===============================
       ENTER / LEAVE WINDOW
    =============================== */
    const onEnter = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.3 });
      trails.forEach((t) => gsap.to(t, { opacity: 1, duration: 0.3 }));
    };

    const onLeave = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.3 });
      trails.forEach((t) => gsap.to(t, { opacity: 0, duration: 0.3 }));
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      gsap.ticker.remove(() => {});
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      {/* Trails */}
      {[...Array(TRAIL_COUNT)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailsRef.current[i] = el)}
          className="fixed pointer-events-none z-[9998] rounded-full"
          style={{
            width: 8 - i,
            height: 8 - i,
            backgroundColor: isDark
              ? `hsla(40,30%,55%,${0.25 - i * 0.04})`
              : `hsla(40,30%,35%,${0.35 - i * 0.05})`,
            opacity: 0,
            transform: "translate(-50%, -50%)",
            filter: "invert(1)",
          }}
        />
      ))}

      {/* Main Cursor */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999]"
        style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          backgroundColor: isDark ? "#fff" : "#111",
          opacity: 0,
          transform: "translate(-50%, -50%)",
          mixBlendMode: isDark ? "difference" : "normal",
          filter: "invert(1)",
        }}
      />

      {/* Eye Icon */}
      <img
        ref={eyeRef}
        src={eyeIcon}
        alt="Eye cursor"
        className="fixed pointer-events-none z-[10000]"
        style={{
          width: 28,
          height: 28,
          opacity: 0,
          transform: "translate(-50%, -50%) scale(0.5)",
          filter: "invert(1)",
        }}
      />

      <style>{`
        * { cursor: none !important; }
      `}</style>
    </>
  );
};

export default CustomCursor;
