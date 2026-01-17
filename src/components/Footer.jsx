import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = ({ isLoading }) => {
  const footerRef = useRef(null);
  const containerRef = useRef(null);
  const revealRef = useRef(null);
  const charRefs = useRef([]);
  const maskLineRefs = useRef([]);
  const ctaRef = useRef(null);
  const ctaTextRef = useRef(null);
  const ctaArrowRef = useRef(null);
  const infoBlocksRef = useRef([]);
  const bottomLineRef = useRef(null);
  const timeRef = useRef(null);
  const marqueeRef = useRef(null);

  const brandName = "BRANDEXEL";

  useEffect(() => {
    if (isLoading) return;

    // Update time
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "UTC",
      });
      if (timeRef.current) {

        timeRef.current.textContent = `${timeString} UTC`;
      }
    };
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    const ctx = gsap.context(() => {
      // Set initial states
      charRefs.current.forEach((char) => {
        if (char) {
          gsap.set(char, {
            yPercent: 100,
            opacity: 0,
          });
        }
      });

      maskLineRefs.current.forEach((line) => {
        if (line) {
          gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
        }
      });

      gsap.set(revealRef.current, {
        clipPath: "inset(100% 0% 0% 0%)",
      });

      gsap.set(ctaRef.current, { opacity: 0, y: 60 });
      gsap.set(ctaArrowRef.current, { x: -20, opacity: 0 });

      infoBlocksRef.current.forEach((block) => {
        if (block) gsap.set(block, { opacity: 0, y: 40 });
      });

      gsap.set(bottomLineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      // Main reveal timeline
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Reveal the container with clip-path
      mainTl.to(revealRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.4,
        ease: "power4.inOut",
      });

      // Character animation - wave reveal from bottom
      mainTl.to(
        charRefs.current,
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          stagger: {
            each: 0.06,
            from: "start",
          },
          ease: "power4.out",
        },
        "-=0.8"
      );

      // Animate mask lines
      mainTl.to(
        maskLineRefs.current,
        {
          scaleX: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.inOut",
        },
        "-=0.6"
      );

      // CTA button
      mainTl.to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      );

      mainTl.to(
        ctaArrowRef.current,
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // Info blocks
      mainTl.to(
        infoBlocksRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.5"
      );

      // Bottom line
      mainTl.to(
        bottomLineRef.current,
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power2.inOut",
        },
        "-=0.8"
      );

      // Continuous marquee animation
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 30,
        ease: "none",
        repeat: -1,
      });

      // Hover effects for characters
      charRefs.current.forEach((char) => {
        if (char) {
          const handleEnter = () => {
            gsap.to(char, {
              yPercent: -15,
              duration: 0.4,
              ease: "power2.out",
            });
          };
          const handleLeave = () => {
            gsap.to(char, {
              yPercent: 0,
              duration: 0.4,
              ease: "power2.out",
            });
          };
          char.addEventListener("mouseenter", handleEnter);
          char.addEventListener("mouseleave", handleLeave);
        }
      });

      // CTA hover animation
      const ctaEl = ctaRef.current;
      if (ctaEl) {
        const handleCtaEnter = () => {
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
        };
        const handleCtaLeave = () => {
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
        };
        ctaEl.addEventListener("mouseenter", handleCtaEnter);
        ctaEl.addEventListener("mouseleave", handleCtaLeave);
      }
    }, footerRef);

    return () => {
      clearInterval(timeInterval);
      ctx.revert();
    };
  }, [isLoading]);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden "
      style={{ backgroundColor: "hsl(0, 0%, 3%)" }}
    >
      {/* Reveal Container */}
      <div ref={revealRef} className="relative">
        {/* Top Marquee */}
        <div
          className="overflow-hidden py-4 border-b"
          style={{ borderColor: "hsl(0, 0%, 12%)" }}
        >
          <div
            ref={marqueeRef}
            className="flex whitespace-nowrap"
            style={{ width: "200%" }}
          >
            {[...Array(8)].map((_, i) => (
              <span
                key={i}
                className="text-xs uppercase tracking-[0.3em] mx-12"
                style={{ color: "hsl(0, 0%, 30%)" }}
              >
                Available for projects
                <span className="mx-6" style={{ color: "hsl(40, 30%, 55%)" }}>
                  ◆
                </span>
                Let's collaborate
                <span className="mx-6" style={{ color: "hsl(40, 30%, 55%)" }}>
                  ◆
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div
          ref={containerRef}
          className="min-h-screen flex flex-col justify-between px-8 md:px-16 lg:px-24 py-16 relative"
        >
          {/* Top Section - CTA */}
          <div ref={ctaRef} className="group cursor-pointer mb-16 md:mb-0">
            <div className="flex items-center gap-4 md:gap-8" onClick={() => window.location.href = "/contact"}>
              <span
                ref={ctaTextRef}
                className="text-sm md:text-base uppercase tracking-[0.25em]"
                style={{ color: "hsl(40, 30%, 55%)" }}
              >
                Start a project
              </span>
              <div
                ref={ctaArrowRef}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full border flex items-center justify-center transition-colors duration-300 group-hover:bg-[hsl(40,30%,55%)]"
                style={{ borderColor: "hsl(40, 30%, 55%)" }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="transition-colors duration-300 group-hover:stroke-[hsl(0,0%,5%)]"
                  style={{ color: "hsl(40, 30%, 55%)" }}
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>
            <div
              ref={(el) => {
                if (el) maskLineRefs.current[0] = el;
              }}
              className="h-[1px] mt-6 max-w-xs"
              style={{ backgroundColor: "hsl(0, 0%, 20%)" }}
            />
          </div>

          {/* Center - Giant Brand Name */}
          <div className="flex-1 flex items-center justify-center py-8 md:py-16">
            <div className="overflow-hidden">
              <div className="flex justify-center items-end">
                {brandName.split("").map((char, index) => (
                  <span
                    key={index}
                    ref={(el) => {
                      if (el) charRefs.current[index] = el;
                    }}
                    className="font-[PPN] text-[12vw] md:text-[11vw] lg:text-[10vw] font-light tracking-[-0.04em] inline-block cursor-default select-none leading-none"
                    style={{
                      color: "hsl(0, 0%, 92%)",
                      WebkitTextStroke: "1px hsl(0, 0%, 25%)",
                      textShadow: "0 0 80px hsla(40, 30%, 55%, 0.15)",
                    }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section - Info Grid */}
          <div>
            <div
              ref={(el) => {
                if (el) maskLineRefs.current[1] = el;
              }}
              className="h-[1px] mb-12"
              style={{ backgroundColor: "hsl(0, 0%, 15%)" }}
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {/* Location */}
              <div
                ref={(el) => {
                  if (el) infoBlocksRef.current[0] = el;
                }}
              >
                <p
                  className="text-[10px] uppercase tracking-[0.3em] mb-3"
                  style={{ color: "hsl(0, 0%, 40%)" }}
                >
                  Location
                </p>
                <p
                  className="text-sm md:text-base"
                  style={{ color: "hsl(0, 0%, 70%)" }}
                >
                  Worldwide
                </p>
                <p
                  className="text-sm md:text-base"
                  style={{ color: "hsl(0, 0%, 70%)" }}
                >
                  Remote First
                </p>
              </div>

              {/* Contact */}
              <div
                ref={(el) => {
                  if (el) infoBlocksRef.current[1] = el;
                }}
              >
                <p
                  className="text-[10px] uppercase tracking-[0.3em] mb-3"
                  style={{ color: "hsl(0, 0%, 40%)" }}
                >
                  Contact
                </p>
                <a
                  href="mailto:hello@brandexel.com"
                  className="text-sm md:text-base block transition-colors duration-300 hover:text-[hsl(40,30%,55%)]"
                  style={{ color: "hsl(0, 0%, 70%)" }}
                >
                  hello@brandexel.com
                </a>
              </div>

              {/* Socials */}
              <div
                ref={(el) => {
                  if (el) infoBlocksRef.current[2] = el;
                }}
              >
                <p
                  className="text-[10px] uppercase tracking-[0.3em] mb-3"
                  style={{ color: "hsl(0, 0%, 40%)" }}
                >
                  Socials
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {["Ig", "Tw", "Li", "Be"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="text-sm md:text-base transition-colors duration-300 hover:text-[hsl(40,30%,55%)]"
                      style={{ color: "hsl(0, 0%, 70%)" }}
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>

              {/* Time */}
              <div
                ref={(el) => {
                  if (el) infoBlocksRef.current[3] = el;
                }}
              >
                <p
                  className="text-[10px] uppercase tracking-[0.3em] mb-3"
                  style={{ color: "hsl(0, 0%, 40%)" }}
                >
                  Local Time
                </p>
                <p
                  ref={timeRef}
                  className="text-sm md:text-base font-mono"
                  style={{ color: "hsl(0, 0%, 70%)" }}
                >
                  00:00 UTC
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center w-full mt-10">

              <p
                className="text-[15px] tracking-[0.2em] text-white uppercase text-center transition hover:text-[hsl(40,30%,55%)] hover:scale-125"
              >
                <a href="http://403labs.in" target="_blank" rel="noopener noreferrer" className="underline">Made with ❤️ by Technology Partner: 403 Labs </a>
              </p>
            </div>
          </div>

        </div>

        {/* Absolute Bottom Bar */}
        <div
          className="px-8 md:px-16 lg:px-24 py-6 flex flex-col md:flex-row justify-between items-center gap-4 border-t"
          style={{ borderColor: "hsl(0, 0%, 10%)" }}
        >
          <p
            className="text-[10px] tracking-[0.2em] uppercase"
            style={{ color: "hsl(0, 0%, 30%)" }}
          >
            © 2026 Brandexel Studio
          </p>



          <div
            ref={bottomLineRef}
            className="hidden md:block flex-1 h-[1px] mx-8"
            style={{ backgroundColor: "hsl(0, 0%, 12%)" }}
          />


          <p
            className="text-[10px] tracking-[0.2em] uppercase"
            style={{ color: "hsl(0, 0%, 30%)" }}
          >
            Crafted with precision
          </p>
        </div>
      </div>

      {/* Decorative vertical line */}
      <div
        className="absolute left-16 top-0 bottom-0 w-[1px]"
        style={{ backgroundColor: "hsl(0, 0%, 10%)" }}
      />
    </footer>
  );
};

export default Footer;
