import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import eyeIcon from "../assets/eyeIcon.svg";

const TRAIL_COUNT = 0;

const lerp = (a, b, n) => a + (b - a) * n;

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const eyeRef = useRef(null);
  const trailsRef = useRef([]);

  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const trailPos = useRef(
    [...Array(TRAIL_COUNT)].map(() => ({ x: 0, y: 0 }))
  );

  const isEyeMode = useRef(false);
  const [enabled, setEnabled] = useState(false);

  /* ===============================
     ENABLE ONLY ON DESKTOP
  =============================== */
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (!isTouch) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const cursor = cursorRef.current;
    const eye = eyeRef.current;
    const trails = trailsRef.current;

    const setCursorX = gsap.quickSetter(cursor, "x", "px");
    const setCursorY = gsap.quickSetter(cursor, "y", "px");
    const setEyeX = gsap.quickSetter(eye, "x", "px");
    const setEyeY = gsap.quickSetter(eye, "y", "px");

    const trailSetters = trails.map((el) => ({
      x: gsap.quickSetter(el, "x", "px"),
      y: gsap.quickSetter(el, "y", "px"),
    }));

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const tick = () => {
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.2);
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.2);

      setCursorX(pos.current.x);
      setCursorY(pos.current.y);
      setEyeX(pos.current.x);
      setEyeY(pos.current.y);

      trailPos.current.forEach((p, i) => {
        p.x = lerp(p.x, pos.current.x, 0.12 - i * 0.01);
        p.y = lerp(p.y, pos.current.y, 0.12 - i * 0.01);
        trailSetters[i].x(p.x);
        trailSetters[i].y(p.y);
      });
    };

    const onHover = (e) => {
      if (!e.target.closest(".show-eyes")) return;
      if (isEyeMode.current) return;

      isEyeMode.current = true;
      gsap.to(cursor, { scale: 1.4, duration: 0.2 });
      gsap.to(eye, { opacity: 1, scale: 1, duration: 0.2 });
    };

    const onOut = (e) => {
      if (!e.target.closest(".show-eyes")) return;
      isEyeMode.current = false;

      gsap.to(cursor, { scale: 1, duration: 0.2 });
      gsap.to(eye, { opacity: 0, scale: 0.5, duration: 0.2 });
    };

    const onVisibility = () => {
      const visible = !document.hidden;
      gsap.to([cursor, ...trails], { opacity: visible ? 1 : 0, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onHover);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("visibilitychange", onVisibility);

    gsap.set([cursor, eye, ...trails], { opacity: 1 });
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onHover);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Trails */}
      {[...Array(TRAIL_COUNT)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailsRef.current[i] = el)}
          className="fixed pointer-events-none rounded-full z-[9998]"
          style={{
            width: 7 - i,
            height: 7 - i,
            background: "#fff",
            transform: "translate(-50%, -50%)",
            mixBlendMode: "difference",
          }}
        />
      ))}

      {/* Cursor */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999]"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "#fff",
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
        }}
      />

      {/* Eye */}
      <img
        ref={eyeRef}
        src={eyeIcon}
        alt=""
        className="fixed pointer-events-none z-[10000]"
        style={{
          width: 28,
          height: 28,
          transform: "translate(-50%, -50%) scale(0.5)",
          opacity: 0,
          filter: "invert(1)",
          mixBlendMode: "difference",
        }}
      />

      <style>{`
        body { cursor: none; }
        input, textarea, button { cursor: auto; }
      `}</style>
    </>
  );
};

export default CustomCursor;
