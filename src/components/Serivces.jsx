import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "BRANDING",
    images: [
      { src: "https://picsum.photos/seed/b1/500/600", class: "left-8" },
      { src: "https://picsum.photos/seed/b2/500/600", class: "right-8" },
    ],
    pills: [{ text: "Award winning experiences", class: "right-[28%]" }],
  },
  {
    title: "DIGITAL",
    images: [
      {
        src: "https://picsum.photos/seed/d1/700/450",
        class: "left-1/2 -translate-x-1/2",
      },
    ],
    pills: [
      { text: "Transformative Branding", class: "left-[22%]" },
      { text: "Wow Worthy Websites", class: "right-[22%]" },
    ],
  },
  {
    title: "STORYTELLING",
    images: [
      { src: "https://picsum.photos/seed/s1/500/600", class: "left-8" },
      { src: "https://picsum.photos/seed/s2/500/600", class: "right-8" },
    ],
    pills: [{ text: "Look & Feel Your Best", class: "left-[30%]" }],
  },
];

const Services = () => {
  const rowsRef = useRef([]);

  useEffect(() => {
    rowsRef.current.forEach((row) => {
      const title = row.querySelector(".masked-text");
      const pills = row.querySelectorAll(".pill");
      const images = row.querySelectorAll(".parallax-img");

      /* MASK REVEAL */
      gsap.fromTo(
        title,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
        }
      );

      /* IMAGE PARALLAX */
      images.forEach((img) => {
        gsap.fromTo(
          img,
          { y: 60 },
          {
            y: -60,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              scrub: true,
            },
          }
        );
      });

      /* MAGNETIC PILLS */
      pills.forEach((pill) => {
        const xTo = gsap.quickTo(pill, "x", {
          duration: 0.4,
          ease: "power3",
        });
        const yTo = gsap.quickTo(pill, "y", {
          duration: 0.4,
          ease: "power3",
        });

        pill.addEventListener("mousemove", (e) => {
          const rect = pill.getBoundingClientRect();
          const dx = e.clientX - (rect.left + rect.width / 2);
          const dy = e.clientY - (rect.top + rect.height / 2);
          xTo(dx * 0.35);
          yTo(dy * 0.35);
        });

        pill.addEventListener("mouseleave", () => {
          xTo(0);
          yTo(0);
        });
      });
    });
  }, []);

  return (
    <section className="w-full bg-[#e9e4d9]">
      {services.map((service, i) => (
        <div
          key={i}
          ref={(el) => (rowsRef.current[i] = el)}
          className="relative h-[360px] md:h-[420px] overflow-hidden border-b border-[#d8cfbd]"
        >
          {/* MASKED TEXT */}
          <h2
            className="masked-text absolute inset-0 flex items-center justify-center
            text-[90px] md:text-[140px] lg:text-[200px]
            font-black tracking-tight text-[#c8bfa9]"
          >
            {service.title}
          </h2>

          {/* IMAGES */}
          {service.images.map((img, idx) => (
            <div
              key={idx}
              className={`parallax-img absolute top-1/2 -translate-y-1/2 ${img.class}
              w-[260px] md:w-[320px] lg:w-[380px]
              rounded-xl overflow-hidden shadow-xl`}
            >
              <img
                src={img.src}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {/* PILLS */}
          {service.pills.map((pill, idx) => (
            <div
              key={idx}
              className={`pill absolute bottom-[22%] ${pill.class}
              px-6 py-3 rounded-full text-sm font-medium
              bg-[#f2b7a6] text-black cursor-pointer`}
            >
              {pill.text}
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};

export default Services;
