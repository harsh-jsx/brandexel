import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrambleText from "./ScrambleText";
import { services } from "../data/services";
import { useNavigate } from "react-router-dom";
import MagneticButton from "./MagneticButton";
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
  let navigate = useNavigate();
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

  // Mouse move handler for shiny cards
  const handleCardMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  // Services section animations
  useEffect(() => {
    if (isLoading) return;
    gsap.defaults({
      ease: "power3.out",
      duration: 1,
    });

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

    const servicesTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
    servicesTl
      // 1. Lift the entire section subtly (depth)
      .fromTo(
        sectionRef.current,
        { y: 120, rotateX: 6, opacity: 0 },
        {
          y: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.6,
          ease: "power4.out",
        },
        0
      )

      // 2. Overlay fades like a curtain
      .to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 1.8,
          ease: "power2.out",
        },
        0.2
      )

      // 3. Subtitle floats in (soft)
      .fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        0.4
      )

      // 4. Title characters: depth + stagger (signature moment)
      .fromTo(
        titleCharsRef.current,
        {
          y: 120,
          opacity: 0,
          rotateX: 90,
          transformOrigin: "50% 100%",
          filter: "blur(10px)",
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1.4,
          stagger: {
            each: 0.03,
            from: "start",
          },
          ease: "power4.out",
        },
        0.5
      )

      // 5. Marquee slides in like momentum
      .fromTo(
        marqueeRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        0.8
      )

      // 6. Service cards cascade (editorial feel)
      .fromTo(
        cardsRef.current,
        {
          y: 80,
          opacity: 0,
          rotateX: 8,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.4,
          stagger: {
            each: 0.12,
            from: "start",
          },
          ease: "power3.out",
        },
        1
      )

      // 7. CTA arrives last (confidence)
      .fromTo(
        ctaRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        1.4
      );
    gsap.to(marqueeRef.current, {
      x: "-10%",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    return () => ctx.revert();
  }, [isLoading]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen overflow-hidden relative z-10 py-32 md:py-40"
      style={{
        backgroundColor: "#000000",
        perspective: "1200px",
        transformStyle: "preserve-3d",
      }}
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
        style={{ backgroundColor: "#000000" }}
      />

      <div className="px-8 md:px-16 relative z-10" >
        {/* Section Header */}
        <div className="mb-20 md:mb-32">
          <div className="flex items-center gap-4 mb-8">
            <div
              className="w-12 h-[1px]"
              style={{ backgroundColor: "#C02FFB" }}
            />
            <p
              ref={subtitleRef}
              className="text-xs uppercase tracking-[0.4em] font-light"
              style={{ color: "#C02FFB" }}
            >
              WHAT WE DO
            </p>
          </div>

          {/* SplitText Title */}
          <div ref={titleRef} className="max-w-5xl overflow-hidden" id="services1">
            <h2 className="font-[Albra] text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-normal leading-[0.95] tracking-tight">
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
            <h2 className="font-[Albra] text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-normal leading-[0.95] tracking-tight mt-2">
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
            <h2 className="font-[Albra] text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl italic leading-[0.95] tracking-tight mt-2">
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
                className={`font-[albra] text-6xl sm:text-7xl md:text-8xl lg:text-9xl mx-6 md:mx-10 transition-colors duration-300 ${word === "✦" ? "text-4xl sm:text-5xl md:text-6xl" : ""
                  }`}
                style={{
                  color: word === "✦" ? "#241D97" : "hsl(0, 0%, 95%)",
                  WebkitTextStroke:
                    word === "✦" ? "none" : "1px rgba(255,255,255,0.3)",
                  WebkitTextFillColor:
                    word === "✦" ? "hsl(40, 30%, 55%)" : "transparent",
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Services Grid (Shiny Cards) */}
        <div className="space-y-0 border-b border-white/20">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group border-t border-white/20 py-10 md:py-16 cursor-pointer relative overflow-hidden"
              onMouseEnter={() => setActiveService(index)}
              onMouseLeave={() => setActiveService(null)}
              onMouseMove={(e) => handleCardMouseMove(e, index)}
              style={{ "--mouse-x": "0px", "--mouse-y": "0px" }}
            >
              {/* Spotlight Shine Effect */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.03), transparent 40%)"
                }}
              />
              <div
                className="absolute inset-x-0 top-0 h-[1px] opacity-0 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(400px circle at var(--mouse-x) 0, #C02FFB, transparent 40%)"
                }}
              />

              <div className="grid grid-cols-12 gap-4 md:gap-8 items-center relative z-10 px-4">
                <div className="col-span-2 md:col-span-1">
                  <span className={`font-mono text-xs md:text-sm tracking-wider transition-colors duration-500 ${activeService === index ? "text-[hsl(40,30%,65%)]" : "text-white/40"}`}>
                    ({service.number})
                  </span>
                </div>

                <div className="col-span-10 md:col-span-5">
                  <h3 className={`font-albra text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-none transition-all duration-500 ${activeService === index ? "text-white translate-x-4" : "text-white/60"}`}>
                    <ScrambleText text={service.title} isHovered={activeService === index} className="inline-block" />
                  </h3>
                </div>

                <div className="col-span-12 md:col-span-4 mt-4 md:mt-0">
                  <p className={`text-sm md:text-base leading-relaxed max-w-sm transition-all duration-500 ${activeService === index ? "text-white/80 translate-x-3" : "text-white/40"}`}>
                    {service.description}
                  </p>
                </div>

                <div className="hidden md:flex col-span-2 justify-end items-center">
                  <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${activeService === index ? "border-[#C02FFB] bg-[#C02FFB] scale-110 rotate-0" : "border-white/20 bg-transparent -rotate-45"}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`transition-colors duration-500 ${activeService === index ? "text-black" : "text-white/50"}`}>
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Details (Enhanced) */}
              <div className={`grid grid-cols-12 gap-4 md:gap-8 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${activeService === index ? "max-h-[200px] opacity-100 mt-8" : "max-h-0 opacity-0 mt-0"}`}>
                <div className="col-span-12 md:col-start-2 md:col-span-10 px-4">
                  <div className="flex flex-wrap gap-3">
                    {service.details.map((detail, detailIndex) => (
                      <span
                        key={detailIndex}
                        className="px-6 py-2 rounded-full text-xs md:text-sm border border-white/20 text-white/50 relative overflow-hidden group/pill transition-all duration-300 hover:border-[#C02FFB] hover:text-white hover:shadow-[0_125px_150px_rgba(207,173,115,0.2)]"
                      >
                        <span className="relative z-10 transition-colors duration-300 group-hover/pill:text-white">
                          {detail}
                        </span>
                        {/* Moving Shine - Improved */}
                        <div className="absolute inset-0 translate-x-[-100%] group-hover/pill:animate-[shine_2s_ease-in-out_infinite] z-0 pointer-events-none bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA (Magnetic) */}
        <div ref={ctaRef} className="mt-20 md:mt-32 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-2xl md:text-3xl lg:text-4xl font-albra mb-2 text-[#cccccc]">Have a project in mind?</p>
            <p className="text-sm uppercase tracking-[0.2em] text-[#666666]">Let's create something extraordinary together</p>
          </div>

          <MagneticButton
            onClick={() => window.location.href = "/contact"}
            className="px-10 py-5 border border-white/20 hover:border-[#C02FFB]/50 transition-colors duration-300"
            fillColor="#C02FFB"
          >
            <div className="flex items-center gap-4">
              <span className="text-sm uppercase tracking-[0.15em] font-medium transition-colors duration-300 text-white group-hover:text-white">
                Start a Conversation
              </span>
              <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:-rotate-45 transition-transform duration-300">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

export default Services;
