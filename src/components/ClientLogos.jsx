import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import client1 from "../assets/client1.jpeg";
import client2 from "../assets/client2.jpeg";
import client3 from "../assets/client3.jpeg";
import client4 from "../assets/client4.jpeg";
import client5 from "../assets/client5.jpeg";
import client6 from "../assets/client6.jpeg";
import client7 from "../assets/client7.jpeg";
import client8 from "../assets/client8.jfif";

gsap.registerPlugin(ScrollTrigger);

const clients = [
  { name: "Google", logo: client1 },
  { name: "Apple", logo: client2 },
  { name: "Meta", logo: client3 },
  { name: "Amazon", logo: client4 },
  { name: "Microsoft", logo: client5 },
  { name: "Netflix", logo: client6 },
  { name: "Netflix", logo: client7 },
  { name: "Netflix", logo: client8 },
];

export default function ClientLogos({ isLoading }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const logosRef = useRef([]);
  const ctaRef = useRef(null);
  const ctaTextRef = useRef(null);
  const ctaArrowRef = useRef(null);
  const lineRef = useRef(null);
  const linesContainerRef = useRef(null);

  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(titleRef.current, { opacity: 0, y: 60 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 40 });
      gsap.set(logosRef.current, { opacity: 0, y: 50, scale: 0.9 });
      gsap.set(ctaRef.current, { opacity: 0, y: 40 });
      gsap.set(lineRef.current, { scaleX: 0 });

      // Background vertical lines animation
      const lines = linesContainerRef.current?.querySelectorAll(".bg-line");
      if (lines) {
        gsap.set(lines, { scaleY: 0 });
        gsap.to(lines, {
          scaleY: 1,
          duration: 1.5,
          stagger: 0.1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
          },
        });
      }

      // Main reveal timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(lineRef.current, {
        scaleX: 1,
        duration: 1.2,
        ease: "power3.inOut",
      })
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .to(
          logosRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.3"
        );

      // Logo hover animations (image-safe)
      logosRef.current.forEach((logo) => {
        if (!logo) return;
        const img = logo.querySelector(".logo-img");

        const enter = () => {
          gsap.to(logo, {
            scale: 1.06,
            y: -8,
            duration: 0.35,
            ease: "power2.out",
          });
          gsap.to(img, {
            filter: "brightness(1.15)",
            duration: 0.3,
          });
          gsap.to(logo, {
            borderColor: "hsla(40, 30%, 55%, 0.5)",
            duration: 0.3,
          });
        };

        const leave = () => {
          gsap.to(logo, {
            scale: 1,
            y: 0,
            duration: 0.35,
            ease: "power2.out",
          });
          gsap.to(img, {
            filter: "brightness(1)",
            duration: 0.3,
          });
          gsap.to(logo, {
            borderColor: "hsla(0, 0%, 100%, 0.1)",
            duration: 0.3,
          });
        };

        logo.addEventListener("mouseenter", enter);
        logo.addEventListener("mouseleave", leave);

        // Cleanup
        logo._cleanup = () => {
          logo.removeEventListener("mouseenter", enter);
          logo.removeEventListener("mouseleave", leave);
        };
      });

      // CTA hover
      const cta = ctaRef.current;
      const enterCTA = () => {
        gsap.to(ctaArrowRef.current, { x: 10, duration: 0.3 });
        gsap.to(ctaTextRef.current, { x: -5, duration: 0.3 });
      };
      const leaveCTA = () => {
        gsap.to(ctaArrowRef.current, { x: 0, duration: 0.3 });
        gsap.to(ctaTextRef.current, { x: 0, duration: 0.3 });
      };

      cta.addEventListener("mouseenter", enterCTA);
      cta.addEventListener("mouseleave", leaveCTA);
    }, sectionRef);

    return () => {
      logosRef.current.forEach((logo) => logo?._cleanup?.());
      ctx.revert();
    };
  }, [isLoading]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden py-24 md:py-32"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[hsl(0,0%,3%)]" />

      {/* Animated background lines */}
      <div
        ref={linesContainerRef}
        className="absolute inset-0 pointer-events-none"
      >
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="bg-line absolute top-0 bottom-0 w-px origin-top"
            style={{
              left: `${(i + 1) * (100 / 13)}%`,
              background:
                "linear-gradient(to bottom, transparent, hsla(0,0%,100%,0.03) 20%, hsla(0,0%,100%,0.03) 80%, transparent)",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Divider */}
        <div
          ref={lineRef}
          className="h-px bg-gradient-to-r from-transparent via-[hsl(40,30%,55%)] to-transparent mb-20 origin-left"
        />

        {/* Header */}
        <div className="text-center mb-20">
          <p
            ref={subtitleRef}
            className="text-[hsl(40,30%,55%)] tracking-[0.3em] uppercase mb-4"
          >
            Trusted by industry leaders
          </p>
          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-serif text-white"
          >
            Our Clients
          </h2>
        </div>

        {/* Logos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-28">
          {clients.map((client, index) => (
            <div
              key={client.name}
              ref={(el) => (logosRef.current[index] = el)}
              className="group relative flex items-center justify-center py-10 md:py-14 border border-white/10 rounded-xl backdrop-blur-sm"
              style={{
                background:
                  "linear-gradient(135deg, hsla(0,0%,100%,0.02), transparent)",
              }}
            >
              <img
                src={client.logo}
                alt={client.name}
                className="logo-img max-h-12 md:max-h-14 opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-white/50 text-lg mb-8">
            Ready to join our roster of successful brands?
          </p>
          <a
            ref={ctaRef}
            href="/contact"
            className="inline-flex items-center gap-4 px-10 py-5 border border-[hsl(40,30%,55%)] rounded-full text-[hsl(40,30%,55%)] hover:bg-[hsl(40,30%,55%)] hover:text-black transition-colors"
          >
            <span ref={ctaTextRef} className="uppercase tracking-wider">
              Start Your Project
            </span>
            <svg
              ref={ctaArrowRef}
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
