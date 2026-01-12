import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrambleText from "./ScrambleText";
import { services } from "../data/services";

gsap.registerPlugin(ScrollTrigger);

const marqueeWords = [
  "STRATEGY",
  "✦",
  "DESIGN",
  "✦",
  "DEVELOPMENT",
  "✦",
  "BRANDING",
  "✦",
  "CREATIVE",
  "✦",
  "DIGITAL",
  "✦",
  "INNOVATION",
  "✦",
  "EXPERIENCE",
  "✦",
];

const Services = ({ isLoading }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);
  const overlayRef = useRef(null);
  const titleCharsRef = useRef([]);
  const ctaRef = useRef(null);
  const marqueeRef = useRef(null);
  const parallaxBgRef = useRef(null);

  const [activeService, setActiveService] = useState(null);

  // Services section animations
  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(overlayRef.current, { opacity: 1 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
      titleCharsRef.current.forEach((char) => {
        if (char)
          gsap.set(char, {
            opacity: 0,
            y: 80,
            filter: "blur(8px)",
            transformOrigin: "center center",
          });
      });
      cardsRef.current.forEach((card) => {
        if (card) gsap.set(card, { opacity: 0, y: 40 });
      });
      gsap.set(ctaRef.current, { opacity: 0, y: 40 });
      gsap.set(marqueeRef.current, { opacity: 0, y: 50 });

      // Create timeline with ScrollTrigger
      const servicesTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      servicesTl
        .to(
          overlayRef.current,
          {
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
          },
          0
        )
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          0.3
        )
        .to(
          titleCharsRef.current,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            stagger: {
              each: 0.025,
              from: "start",
            },
            ease: "power3.out",
          },
          0.4
        )
        .to(
          marqueeRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
          0.8
        )
        .to(
          cardsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            stagger: {
              each: 0.15,
              from: "start",
            },
            ease: "power2.out",
          },
          1
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
          1.4
        );

      // Infinite marquee animation
      const marqueeContent =
        marqueeRef.current?.querySelector(".marquee-content");
      if (marqueeContent) {
        gsap.to(marqueeContent, {
          xPercent: -50,
          duration: 100,
          ease: "none",
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen overflow-hidden  relative z-10 py-32 md:py-40"
      style={{ backgroundColor: "hsl(0, 0%, 3%)" }}
    >
      {/* Parallax Background Elements */}
      <div
        ref={parallaxBgRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full border opacity-5"
          style={{ borderColor: "hsl(40, 30%, 55%)", borderWidth: "2px" }}
        />
        <div
          className="absolute top-1/2 -left-48 w-[500px] h-[500px] rounded-full border opacity-5"
          style={{ borderColor: "hsl(40, 30%, 55%)", borderWidth: "1px" }}
        />
        <div
          className="absolute -bottom-20 right-1/4 w-72 h-72 rounded-full opacity-5"
          style={{ backgroundColor: "hsl(40, 30%, 55%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(40, 30%, 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(40, 30%, 55%) 1px, transparent 1px)`,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Black Dimming Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none z-20"
        style={{ backgroundColor: "hsl(0, 0%, 0%)" }}
      />

      <div className="px-8 md:px-16 relative z-10">
        {/* Section Header */}
        <div className="mb-20 md:mb-32">
          <div className="flex items-center gap-4 mb-8">
            <div
              className="w-12 h-[1px]"
              style={{ backgroundColor: "hsl(40, 30%, 55%)" }}
            />
            <p
              ref={subtitleRef}
              className="text-xs uppercase tracking-[0.4em] font-light"
              style={{ color: "hsl(40, 30%, 55%)" }}
            >
              WHAT WE DO
            </p>
          </div>

          {/* SplitText Title */}
          <div ref={titleRef} className="max-w-5xl overflow-hidden">
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-normal leading-[0.95] tracking-tight">
              {"SERVICES".split("").map((char, i) => (
                <span
                  key={`s1-${i}`}
                  ref={(el) => {
                    if (el) titleCharsRef.current[i] = el;
                  }}
                  className="inline-block"
                  style={{
                    color: "hsl(0, 0%, 95%)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h2>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-normal leading-[0.95] tracking-tight mt-2">
              {"THAT MAKE".split("").map((char, i) => (
                <span
                  key={`s2-${i}`}
                  ref={(el) => {
                    if (el) titleCharsRef.current[8 + i] = el;
                  }}
                  className="inline-block"
                  style={{
                    color: "hsl(0, 0%, 95%)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h2>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl italic leading-[0.95] tracking-tight mt-2">
              {"BRANDS".split("").map((char, i) => (
                <span
                  key={`s3-${i}`}
                  ref={(el) => {
                    if (el) titleCharsRef.current[17 + i] = el;
                  }}
                  className="inline-block"
                  style={{
                    color: "hsl(40, 30%, 55%)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {char}
                </span>
              ))}{" "}
            </h2>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl italic leading-[0.95] tracking-tight mt-2">
              {"UNFORGETTABLE".split("").map((char, i) => (
                <span
                  key={`s4-${i}`}
                  ref={(el) => {
                    if (el) titleCharsRef.current[23 + i] = el;
                  }}
                  className="inline-block"
                  style={{
                    color: "hsl(40, 30%, 55%)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {char}
                </span>
              ))}
            </h2>
          </div>
        </div>

        {/* Infinite Marquee */}
        <div
          ref={marqueeRef}
          className="mb-20 md:mb-28 -mx-8 md:-mx-16 overflow-hidden"
        >
          <div
            className="marquee-content flex whitespace-nowrap"
            style={{ width: "fit-content" }}
          >
            {[...marqueeWords, ...marqueeWords].map((word, i) => (
              <span
                key={i}
                className={`font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl mx-6 md:mx-10 transition-colors duration-300 ${
                  word === "✦" ? "text-4xl sm:text-5xl md:text-6xl" : ""
                }`}
                style={{
                  color: word === "✦" ? "hsl(40, 30%, 55%)" : "hsl(0, 0%, 15%)",
                  WebkitTextStroke:
                    word === "✦" ? "none" : "1px hsl(0, 0%, 25%)",
                  WebkitTextFillColor:
                    word === "✦" ? "hsl(40, 30%, 55%)" : "transparent",
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div
          className="space-y-0 border-b"
          style={{ borderColor: "hsl(0, 0%, 15%)" }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group border-t py-10 md:py-16 cursor-pointer relative"
              style={{
                borderColor: "hsl(0, 0%, 15%)",
                transition: "all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
              onMouseEnter={() => setActiveService(index)}
              onMouseLeave={() => setActiveService(null)}
            >
              {/* Hover Background Glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  opacity: activeService === index ? 0.04 : 0,
                  background:
                    "radial-gradient(ellipse at left, hsl(40, 30%, 55%), transparent 60%)",
                  transition: "opacity 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)",
                }}
              />

              <div className="grid grid-cols-12 gap-4 md:gap-8 items-center relative">
                {/* Number */}
                <div className="col-span-2 md:col-span-1">
                  <span
                    className="font-mono text-xs md:text-sm tracking-wider"
                    style={{
                      color:
                        activeService === index
                          ? "hsl(40, 30%, 65%)"
                          : "hsl(0, 0%, 30%)",
                      transition: "color 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
                    }}
                  >
                    ({service.number})
                  </span>
                </div>

                {/* Title with Scramble Effect */}
                <div className="col-span-10 md:col-span-5">
                  <h3
                    className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-none"
                    style={{
                      color:
                        activeService === index
                          ? "hsl(0, 0%, 100%)"
                          : "hsl(0, 0%, 50%)",
                      transform:
                        activeService === index
                          ? "translateX(20px)"
                          : "translateX(0)",
                      letterSpacing: "-0.02em",
                      transition: "all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)",
                    }}
                  >
                    <ScrambleText
                      text={service.title}
                      isHovered={activeService === index}
                      className="inline-block"
                      style={{ fontFamily: "inherit" }}
                    />
                  </h3>
                </div>

                {/* Description */}
                <div className="col-span-12 md:col-span-4 mt-4 md:mt-0">
                  <p
                    className="text-sm md:text-base leading-relaxed max-w-sm"
                    style={{
                      color:
                        activeService === index
                          ? "hsl(0, 0%, 70%)"
                          : "hsl(0, 0%, 35%)",
                      transform:
                        activeService === index
                          ? "translateX(12px)"
                          : "translateX(0)",
                      transition: "all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)",
                    }}
                  >
                    {service.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex col-span-2 justify-end items-center">
                  <div
                    className="w-14 h-14 rounded-full border-2 flex items-center justify-center"
                    style={{
                      borderColor:
                        activeService === index
                          ? "hsl(40, 30%, 55%)"
                          : "hsl(0, 0%, 20%)",
                      transform:
                        activeService === index
                          ? "scale(1.1) rotate(0deg)"
                          : "scale(1) rotate(-45deg)",
                      backgroundColor:
                        activeService === index
                          ? "hsl(40, 30%, 55%)"
                          : "transparent",
                      transition: "all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)",
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      style={{
                        color:
                          activeService === index
                            ? "hsl(0, 0%, 3%)"
                            : "hsl(0, 0%, 40%)",
                        transition:
                          "color 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
                      }}
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Expandable Details */}
              <div
                className="grid grid-cols-12 gap-4 md:gap-8 overflow-hidden"
                style={{
                  maxHeight: activeService === index ? "200px" : "0",
                  opacity: activeService === index ? 1 : 0,
                  marginTop: activeService === index ? "32px" : "0",
                  transition: "all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)",
                }}
              >
                <div className="col-span-12 md:col-start-2 md:col-span-10">
                  <div className="flex flex-wrap gap-3">
                    {service.details.map((detail, detailIndex) => (
                      <span
                        key={detailIndex}
                        className="px-5 py-2.5 rounded-full text-xs md:text-sm border transition-all duration-500 hover:bg-[hsl(40,30%,55%)] hover:text-[hsl(0,0%,3%)] hover:border-transparent"
                        style={{
                          borderColor: "hsl(40, 30%, 30%)",
                          color: "hsl(40, 30%, 70%)",
                          transitionDelay: `${detailIndex * 75}ms`,
                          transform:
                            activeService === index
                              ? "translateY(0)"
                              : "translateY(10px)",
                        }}
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          ref={ctaRef}
          className="mt-20 md:mt-32 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        >
          <div>
            <p
              className="text-2xl md:text-3xl lg:text-4xl font-serif mb-2"
              style={{ color: "hsl(0, 0%, 80%)" }}
            >
              Have a project in mind?
            </p>
            <p
              className="text-sm uppercase tracking-[0.2em]"
              style={{ color: "hsl(0, 0%, 40%)" }}
            >
              Let's create something extraordinary together
            </p>
          </div>
          <button
            className="group flex items-center gap-4 px-8 py-4 rounded-full border-2 transition-all duration-500 hover:bg-[hsl(40,30%,55%)] hover:border-[hsl(40,30%,55%)]"
            style={{ borderColor: "hsl(0, 0%, 25%)" }}
          >
            <span
              className="text-sm uppercase tracking-[0.15em] font-medium transition-colors duration-500 group-hover:text-[hsl(0,0%,3%)]"
              style={{ color: "hsl(0, 0%, 90%)" }}
            >
              Start a Conversation
            </span>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:bg-[hsl(0,0%,3%)]"
              style={{ backgroundColor: "hsl(40, 30%, 55%)" }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transition-transform duration-500 group-hover:translate-x-1"
                style={{ color: "hsl(0, 0%, 5%)" }}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
