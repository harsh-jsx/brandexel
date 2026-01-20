import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  useVelocity,
  useSpring
} from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import creative1 from "../assets/creative1.jpeg";
import creative2 from "../assets/creative2.jpeg";
import creative3 from "../assets/creative3.jpeg";
import creative4 from "../assets/creative4.jpeg";
import creative5 from "../assets/creative5.jpeg";
import creative6 from "../assets/creative6.jpeg";
import creative7 from "../assets/creative7.jpeg";
import creative8 from "../assets/creative8.jpeg";
import creative9 from "../assets/creative9.jpeg";
import creative10 from "../assets/creative10.jpeg";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const ImageMarquee = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [contentWidth, setContentWidth] = useState(0);

  const images = [
    creative1,
    creative2,
    creative3,
    creative4,
    creative5,
    creative6,
    creative7,
    creative8,
    creative9,
    creative10,
  ];

  // Tripling images ensures we always have coverage during the loop reset
  const duplicatedImages = [...images, ...images, ...images];

  useEffect(() => {
    if (contentRef.current) {
      // Calculate width of one set of images (total width / 3)
      // We wait a tick to ensure layout is done
      const measure = () => {
        if (contentRef.current) {
          setContentWidth(contentRef.current.scrollWidth / 3);
        }
      }
      measure();
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }
  }, []);

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // Combine base automatic movement with scroll-induced velocity
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => {
    if (!contentWidth) return "0px";
    return `${((v % contentWidth) - contentWidth) % contentWidth}px`;
    // Allows v to go indefinitely negative, wrapping between -contentWidth and 0
  });

  useAnimationFrame((t, delta) => {
    // Base constant movement to the left
    let moveBy = -0.05 * delta;

    // Add scroll velocity effect - ALWAYS in the same direction (left)
    const velocity = velocityFactor.get();

    // Independent of scroll direction (up or down), we want to ACCELERATE to the left
    if (velocity !== 0) {
      // Use absolute value of velocity to always subtract (move left)
      // Multiplied by -1 to ensure it adds to the negative moveBy
      moveBy += -Math.abs(velocity) * 0.05 * delta;
    }

    baseX.set(baseX.get() + moveBy);
  });

  useGSAP(() => {
    gsap.to(containerRef.current, {
      backgroundColor: "black",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 50%",
        end: "bottom 40%",
        scrub: true,
      },
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden py-28 img-marquee"
      style={{ backgroundColor: "rgb(233, 228, 217)" }}
    >
      <motion.div
        ref={contentRef}
        className="flex gap-6 w-max"
        style={{ x, willChange: "transform" }}
      >
        {duplicatedImages.map((image, index) => (
          <div
            key={index}
            className="shrink-0 rounded-lg overflow-hidden shadow-lg h-38 w-38 md:h-72 md:w-72"
          >
            <img
              src={image}
              alt={`Creative work ${index % images.length + 1}`}
              className="w-full h-full object-cover show-eyes"
              loading="lazy"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ImageMarquee;
