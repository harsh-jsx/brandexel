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
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ImageMarquee = () => {
  const containerRef = useRef(null);

  const images = [
    "https://picsum.photos/seed/marquee1/500/600",
    "https://picsum.photos/seed/marquee2/600/500",
    "https://picsum.photos/seed/marquee3/550/650",
    "https://picsum.photos/seed/marquee4/500/500",
    "https://picsum.photos/seed/marquee5/600/600",
    "https://picsum.photos/seed/marquee6/550/600",
    "https://picsum.photos/seed/marquee7/500/550",
    "https://picsum.photos/seed/marquee8/600/650",
    "https://picsum.photos/seed/marquee9/550/550",
    "https://picsum.photos/seed/marquee10/500/600",
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
