import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Preloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const logoRef = useRef(null);
  const logoLettersRef = useRef([]);
  const progressBarRef = useRef(null);
  const progressTextRef = useRef(null);
  const taglineRef = useRef(null);
  const overlayRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const logoText = "BRANDEXEL";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Set initial states
      gsap.set(logoLettersRef.current, {
        opacity: 0,
        y: 100,
        rotationX: -90,
      });
      gsap.set(progressBarRef.current, { scaleX: 0 });
      gsap.set(progressTextRef.current, { opacity: 0 });
      gsap.set(taglineRef.current, { opacity: 0, y: 20 });

      // Animate logo letters in
      tl.to(logoLettersRef.current, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power4.out",
      })
        .to(
          taglineRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          progressTextRef.current,
          {
            opacity: 1,
            duration: 0.5,
          },
          "-=0.4"
        );

      // Simulate loading progress
      const progressTl = gsap.timeline({ delay: 0.8 });
      progressTl.to(
        { value: 0 },
        {
          value: 100,
          duration: 2.5,
          ease: "power2.inOut",
          onUpdate: function () {
            const val = Math.round(this.targets()[0].value);
            setProgress(val);
            gsap.to(progressBarRef.current, {
              scaleX: val / 100,
              duration: 0.1,
              ease: "none",
            });
          },
          onComplete: () => {
            // Exit animation
            const exitTl = gsap.timeline({
              onComplete: () => onComplete && onComplete(),
            });

            exitTl
              .to(taglineRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.4,
                ease: "power2.in",
              })
              .to(
                progressTextRef.current,
                {
                  opacity: 0,
                  duration: 0.3,
                },
                "-=0.3"
              )
              .to(
                progressBarRef.current.parentElement,
                {
                  opacity: 0,
                  duration: 0.3,
                },
                "-=0.2"
              )
              .to(
                logoLettersRef.current,
                {
                  y: -100,
                  opacity: 0,
                  rotationX: 90,
                  duration: 0.6,
                  stagger: 0.04,
                  ease: "power3.in",
                },
                "-=0.2"
              )
              .to(
                overlayRef.current,
                {
                  yPercent: -100,
                  duration: 1,
                  ease: "power4.inOut",
                },
                "-=0.3"
              )
              .to(
                preloaderRef.current,
                {
                  opacity: 0,
                  duration: 0.3,
                },
                "-=0.3"
              );
          },
        }
      );
    }, preloaderRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: "hsl(0, 0%, 0%)" }}
    >
      {/* Overlay for wipe effect */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{ backgroundColor: "hsl(0, 0%, 0%)" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <div ref={logoRef} className="overflow-hidden mb-8">
          <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight">
            {logoText.split("").map((letter, i) => (
              <span
                key={i}
                ref={(el) => {
                  if (el) logoLettersRef.current[i] = el;
                }}
                className="inline-block"
                style={{
                  color: "hsl(0, 0%, 95%)",
                  transformStyle: "preserve-3d",
                }}
              >
                {letter}
              </span>
            ))}
          </h1>
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-xs uppercase tracking-[0.4em] mb-12"
          style={{ color: "hsl(40, 30%, 55%)" }}
        >
          Creating Brands Impossible to Ignore
        </p>

        {/* Progress Bar Container */}
        <div className="w-48 sm:w-64 md:w-80">
          <div
            className="h-[1px] mb-4"
            style={{ backgroundColor: "hsl(0, 0%, 20%)" }}
          >
            <div
              ref={progressBarRef}
              className="h-full origin-left"
              style={{
                backgroundColor: "hsl(40, 30%, 55%)",
                transform: "scaleX(0)",
              }}
            />
          </div>

          {/* Progress Text */}
          <div
            ref={progressTextRef}
            className="flex justify-between items-center"
          >
            <span
              className="text-xs uppercase tracking-[0.2em]"
              style={{ color: "hsl(0, 0%, 40%)" }}
            >
              Loading
            </span>
            <span
              className="font-mono text-sm"
              style={{ color: "hsl(0, 0%, 60%)" }}
            >
              {progress}%
            </span>
          </div>
        </div>

        {/* Decorative Elements */}
        <div
          className="absolute -top-20 -left-20 w-40 h-40 rounded-full border opacity-10"
          style={{ borderColor: "hsl(40, 30%, 55%)" }}
        />
        <div
          className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full border opacity-10"
          style={{ borderColor: "hsl(40, 30%, 55%)" }}
        />
      </div>
    </div>
  );
};

export default Preloader;
