import React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef(null);
  const cubeRef = useRef(null);
  const textRef = useRef(null);
  const nestedCubesRef = useRef(null);

  useEffect(() => {
    const cube = cubeRef.current;
    const text = textRef.current;
    const nestedCubes = nestedCubesRef.current;
    const cubeLayers = nestedCubes.querySelectorAll(".cube-layer");

    // Set initial states
    gsap.set(cube, { opacity: 0, scale: 0.2 });
    gsap.set(nestedCubes, { opacity: 0 });
    gsap.set(cubeLayers, { scale: 0.8 });

    // Timeline for all animations - smooth scrub
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 2.5,
        markers: true,
      },
    });

    // Phase 1: Cube appears and grows smoothly
    tl.to(cube, {
      opacity: 1,
      scale: 1,
      duration: 0.35,
      ease: "power2.out",
    })
      // Phase 2: Transition to nested cubes
      .to(
        cube,
        {
          opacity: 0,
          duration: 0.2,
          ease: "power2.inOut",
        },
        0.28
      )
      .to(
        nestedCubes,
        {
          opacity: 1,
          duration: 0.2,
          ease: "power2.inOut",
        },
        0.28
      )
      // Phase 3: Nested cubes expand outward smoothly
      .to(
        cubeLayers,
        {
          scale: 3,
          stagger: 0.01,
          duration: 0.8,
          ease: "power2.inOut",
        },
        0.35
      )
      // Change text
      .call(
        () => {
          text.textContent = "Be relevant";
        },
        null,
        0.35
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="w-full bg-black text-white">
      {/* Fixed cube in center of screen */}
      <div
        ref={cubeRef}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-0 z-10"
        style={{
          background:
            "radial-gradient(circle at center, hsl(220 100% 55%) 0%, hsl(220 100% 50%) 50%, hsl(220 100% 40%) 100%)",
          boxShadow:
            "0 0 80px hsl(220 100% 60% / 0.5), inset 0 0 100px hsl(220 100% 45% / 0.3)",
        }}
      ></div>

      {/* Nested cubes container */}
      <div
        ref={nestedCubesRef}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 z-10"
      >
        {/* Multiple nested cube layers with visible edges */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
          <div
            key={index}
            className="cube-layer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: `${500 + index * 100}px`,
              height: `${500 + index * 100}px`,
              background: `hsl(220 100% ${48 - index * 1.5}%)`,
              border: `2px solid hsl(220 100% ${58 - index * 2}%)`,
              zIndex: 12 - index,
              boxShadow: `inset 0 0 ${60 + index * 15}px hsl(220 100% ${
                40 - index * 2
              }% / 0.6)`,
            }}
          ></div>
        ))}

        {/* Center cube with text */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] z-20"
          style={{
            background: "hsl(220 100% 50%)",
            border: "2px solid hsl(220 100% 60%)",
            boxShadow: "inset 0 0 80px hsl(220 100% 40% / 0.6)",
          }}
        ></div>
      </div>

      {/* Fixed text in center */}
      <h1
        ref={textRef}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl md:text-5xl font-light text-white z-30"
      >
        Be real
      </h1>

      {/* Scroll trigger container */}
      <div ref={containerRef} className="h-[400vh] w-full"></div>
    </div>
  );
};

export default Home;
