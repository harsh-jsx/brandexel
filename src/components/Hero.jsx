import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Hero = ({ scrollProgress = 0 }) => {
  const brandRef = useRef(null);
  const menuRef = useRef(null);
  const textRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate elements on mount
    tl.from(brandRef.current, {
      opacity: 0,
      x: -20,
      duration: 1,
      ease: "power2.out",
    })
      .from(
        menuRef.current,
        {
          opacity: 0,
          x: 20,
          duration: 1,
          ease: "power2.out",
        },
        "<"
      )
      .from(
        textRef.current,
        {
          opacity: 0,
          scale: 0.9,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .from(
        scrollIndicatorRef.current,
        {
          opacity: 0,
          y: -10,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.3"
      );

    // Animate scroll indicator
    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  // Fade out Hero elements as cube appears
  useEffect(() => {
    const fadeProgress = Math.min(1, Math.max(0, (scrollProgress - 0.05) * 10));

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 1 - fadeProgress * 0.8,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [scrollProgress]);

  return (
    <div
      ref={containerRef}
      className="bg-black h-screen w-full flex flex-col items-center justify-center relative z-20"
    >
      {/* Brand Name - Top Left */}
      <div
        ref={brandRef}
        className="absolute top-8 left-8 text-white text-2xl font-sans font-light tracking-wide"
      >
        Lineage
      </div>

      {/* Menu Button - Top Right */}
      <button
        ref={menuRef}
        className="absolute top-8 right-8 px-6 py-2 border border-white rounded-full text-white text-sm font-sans hover:bg-white hover:text-black transition-colors duration-300"
      >
        Menu
      </button>

      {/* Main Text - Center */}
      <div ref={textRef} className="relative z-30">
        <h1 className="text-white text-5xl md:text-7xl font-bold">Be real</h1>
      </div>

      {/* Scroll Indicator - Bottom Center */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <p className="text-white text-sm">scroll ↓</p>
      </div>
    </div>
  );
};

export default Hero;
