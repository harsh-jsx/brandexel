import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const clients = [
  { name: "Google", logo: "GOOGLE" },
  { name: "Apple", logo: "APPLE" },
  { name: "Meta", logo: "META" },
  { name: "Amazon", logo: "AMAZON" },
  { name: "Microsoft", logo: "MICROSOFT" },
  { name: "Netflix", logo: "NETFLIX" },
  { name: "Spotify", logo: "SPOTIFY" },
  { name: "Adobe", logo: "ADOBE" },
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
  const marqueeRef = useRef(null);

  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(titleRef.current, { opacity: 0, y: 60 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 40 });
      gsap.set(logosRef.current, { opacity: 0, y: 50, scale: 0.9 });
      gsap.set(ctaRef.current, { opacity: 0, y: 40 });
      gsap.set(lineRef.current, { scaleX: 0 });

      // Main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom bottom",
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
            stagger: 0.1,
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

      // Marquee animation
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 20,
        ease: "none",
        repeat: -1,
      });

      // Logo hover animations
      logosRef.current.forEach((logo) => {
        if (!logo) return;

        logo.addEventListener("mouseenter", () => {
          gsap.to(logo, {
            scale: 1.1,
            y: -10,
            duration: 0.4,
            ease: "power2.out",
          });
          gsap.to(logo.querySelector(".logo-text"), {
            color: "hsl(40, 30%, 55%)",
            duration: 0.3,
          });
        });

        logo.addEventListener("mouseleave", () => {
          gsap.to(logo, {
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          });
          gsap.to(logo.querySelector(".logo-text"), {
            color: "white",
            duration: 0.3,
          });
        });
      });

      // CTA hover
      const cta = ctaRef.current;
      cta.addEventListener("mouseenter", () => {
        gsap.to(ctaArrowRef.current, {
          x: 10,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(ctaTextRef.current, {
          x: -5,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      cta.addEventListener("mouseleave", () => {
        gsap.to(ctaArrowRef.current, {
          x: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(ctaTextRef.current, {
          x: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden py-24 md:py-32"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[hsl(0,0%,3%)]" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Top line */}
        <div
          ref={lineRef}
          className="h-px bg-gradient-to-r from-transparent via-[hsl(40,30%,55%)] to-transparent mb-16 md:mb-24 origin-left"
        />

        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <p
            ref={subtitleRef}
            className="text-[hsl(40,30%,55%)] text-sm md:text-base tracking-[0.3em] uppercase mb-4"
          >
            Trusted by industry leaders
          </p>
          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-serif text-white tracking-tight"
          >
            Our Clients
          </h2>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-20 md:mb-32">
          {clients.map((client, index) => (
            <div
              key={client.name}
              ref={(el) => (logosRef.current[index] = el)}
              className="group flex items-center justify-center py-8 md:py-12 border border-white/10 rounded-lg cursor-pointer transition-colors hover:border-[hsl(40,30%,55%)]/30 hover:bg-white/[0.02]"
            >
              <span className="logo-text text-xl md:text-2xl font-light tracking-[0.2em] text-white transition-colors">
                {client.logo}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <p className="text-white/50 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Ready to join our roster of successful brands?
          </p>
          <a
            ref={ctaRef}
            href="#contact"
            className="group inline-flex items-center gap-4 px-10 py-5 border border-[hsl(40,30%,55%)] rounded-full text-[hsl(40,30%,55%)] hover:bg-[hsl(40,30%,55%)] hover:text-black transition-colors duration-300"
          >
            <span
              ref={ctaTextRef}
              className="text-lg md:text-xl tracking-wider uppercase"
            >
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

      {/* Bottom marquee */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden py-6 border-t border-white/5">
        <div ref={marqueeRef} className="flex whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="text-white/5 text-[8vw] font-serif tracking-tight mx-8"
            >
              BRANDEXEL ◆ CREATIVE AGENCY ◆
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
