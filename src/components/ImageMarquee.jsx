import React, { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useAnimationFrame,
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

  const duplicatedImages = [...images, ...images];

  /** base continuous motion */
  const baseX = useMotionValue(0);

  /** scroll motion (unchanged behavior) */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scrollX = useTransform(scrollYProgress, [0, 1], [0, -1000]);

  /** combine both safely */
  const x = useTransform([baseX, scrollX], ([base, scroll]) => base + scroll);

  /** continuous marquee movement */
  useAnimationFrame((_, delta) => {
    const speed = 0.03; // same visual speed as before
    baseX.set(baseX.get() - delta * speed);
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
      <motion.div className="flex gap-6" style={{ x }}>
        {duplicatedImages.map((image, index) => (
          <div
            key={index}
            className="shrink-0 rounded-lg overflow-hidden shadow-lg h-38 w-38 md:h-72 md:w-72"
          >
            <img
              src={image}
              alt={`Creative work ${index + 1}`}
              className="w-full h-full object-cover show-eyes"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ImageMarquee;
