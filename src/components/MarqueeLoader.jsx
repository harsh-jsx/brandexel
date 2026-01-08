import React from "react";
import { motion } from "motion/react";

const MarqueeLoader = () => {
  const marqueeText = [
    "ROGUE STUDIO",
    "ROGUE STUDIO",
    "ROGUE STUDIO",
    "ROGUE STUDIO",
    "ROGUE STUDIO",
    "ROGUE STUDIO",
  ];

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">
      {/* Marquee Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{
            x: [0, -50 + "%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {[...marqueeText, ...marqueeText].map((text, index) => (
            <div key={index} className="flex items-center gap-8">
              <span className="text-white text-4xl md:text-5xl lg:text-6xl font-[PPN] italic">
                {text}
              </span>
              <span className="text-white text-2xl md:text-3xl">✦</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Center Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 3 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="relative z-10"
      >
        <motion.div
          animate={{
            rotate: [3, -3, 3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="rounded-2xl overflow-hidden shadow-2xl"
          style={{
            width: "280px",
            height: "320px",
            transform: "perspective(1000px) rotateY(5deg)",
          }}
        >
          <img
            src="https://picsum.photos/seed/loader1/400/500"
            alt="Loading"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Loading Spinner/Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex items-center gap-3"
        >
          <div className="w-2 h-2 rounded-full bg-white" />
          <div className="w-2 h-2 rounded-full bg-white" />
          <div className="w-2 h-2 rounded-full bg-white" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MarqueeLoader;
