import React from "react";
import { motion } from "motion/react";

const Services = () => {
  const services = [
    {
      id: "branding",
      title: "BRANDING",
      images: [
        {
          src: "https://picsum.photos/seed/brand1/350/450",
          position: "left-[3%] top-[8%]",
          size: { w: 280, h: 340 },
        },
        {
          src: "https://picsum.photos/seed/brand2/350/450",
          position: "right-[3%] top-[8%]",
          size: { w: 280, h: 340 },
        },
      ],
      pills: [
        { text: "Wow-worthy websites", position: "right-[28%] top-[22%]" },
        { text: "Design that converts", position: "left-[22%] bottom-[25%]" },
      ],
    },
    {
      id: "digital",
      title: "DIGITAL DESIGN",
      images: [
        {
          src: "https://picsum.photos/seed/digital1/380/320",
          position: "left-1/2 -translate-x-1/2 top-[18%]",
          size: { w: 360, h: 280 },
        },
      ],
      pills: [
        { text: "Find your audience", position: "left-[10%] top-[32%]" },
        {
          text: "Award-winning experiences",
          position: "right-[10%] bottom-[30%]",
        },
      ],
    },
    {
      id: "story",
      title: "STORYTELLING",
      images: [
        {
          src: "https://picsum.photos/seed/story1/280/380",
          position: "left-[5%] top-[12%]",
          size: { w: 260, h: 340 },
        },
        {
          src: "https://picsum.photos/seed/story2/320/380",
          position: "right-[5%] top-[10%]",
          size: { w: 300, h: 320 },
        },
      ],
      pills: [
        { text: "Crazy ideas made real", position: "left-[30%] top-[22%]" },
        {
          text: "Stories people remember",
          position: "right-[25%] bottom-[28%]",
        },
      ],
    },
  ];

  const splitText = (text) =>
    text.split("").map((char, i) => (
      <motion.span
        key={i}
        initial={{
          opacity: 0,
          y: 120,
          rotateX: -90,
          filter: "blur(6px)",
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
        }}
        transition={{
          duration: 0.9,
          delay: i * 0.035,
          ease: [0.16, 1, 0.3, 1],
        }}
        viewport={{ once: true }}
        className="inline-block will-change-transform"
        style={{ whiteSpace: char === " " ? "pre" : "normal" }}
      >
        {char}
      </motion.span>
    ));

  return (
    <section
      className="w-full min-h-screen px-6 py-24 relative overflow-hidden"
      style={{ backgroundColor: "rgb(233,228,217)" }}
    >
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center text-5xl md:text-6xl lg:text-7xl font-[Neue-Light] mb-24"
        style={{ color: "hsl(0,0%,10%)" }}
      >
        FOLKS CALL US <br />
        WHEN THEY <span className="italic font-[PPN]">NEED</span>
      </motion.h1>

      {/* Services */}
      <div className="max-w-[1500px] mx-auto space-y-32">
        {services.map((service, idx) => (
          <div key={service.id} className="relative h-[420px]">
            {/* Big outlined word */}
            <h2
              className="absolute inset-0 flex items-center justify-center select-none
                         text-[90px] md:text-[140px] lg:text-[190px] xl:text-[220px]
                         font-black tracking-tight"
              style={{
                color: "transparent",
                WebkitTextStroke: "2px hsl(40,30%,65%)",
                lineHeight: 0.9,
              }}
            >
              {splitText(service.title)}
            </h2>

            {/* Images */}
            {service.images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.9,
                  delay: 0.6 + i * 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: 1.5 }}
                className={`absolute ${img.position} rounded-xl overflow-hidden shadow-2xl z-10`}
                style={{ width: img.size.w, height: img.size.h }}
              >
                <img
                  src={img.src}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}

            {/* Floating pills */}
            {service.pills.map((pill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: [20, 0, -8, -20],
                }}
                transition={{
                  duration: 5,
                  delay: 1.4 + i * 0.6,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
                className={`absolute ${pill.position} px-6 py-3 rounded-full z-20`}
                style={{
                  backgroundColor: "hsl(350,60%,70%)",
                  color: "hsl(0,0%,10%)",
                }}
              >
                <span className="text-sm md:text-base font-medium whitespace-nowrap">
                  {pill.text}
                </span>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
