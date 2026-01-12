import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Navbar from "../components/Navbar";
import ImageMarquee from "../components/ImageMarquee";
import Services from "../components/Services";
import { image } from "motion/react-client";
import CustomCursor from "../components/CustomCursor";
import ClientLogos from "../components/ClientLogos";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Custom Cursor Component (embedded)

const Home = () => {
  const mainContainerRef = useRef(null);
  const heroSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const progressBarRef = useRef(null);

  // State for navbar dark mode
  const [isNavbarDark, setIsNavbarDark] = useState(true);

  // Hero refs
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const impossibleRef = useRef(null);
  const impossibleWrapperRef = useRef(null);
  const imagesRef = useRef([]);

  // About refs
  const heroTextRef = useRef(null);
  const subtitleRef = useRef(null);
  const globeRef = useRef(null);
  const statsRef = useRef([]);
  const descriptionRef = useRef(null);
  const imageRef = useRef(null);
  const globeBadgeRef = useRef(null);
  const imagesIntroTl = useRef(null);

  const images = [
    {
      src: "https://picsum.photos/seed/portrait1/400/600",
      alt: "Portrait 1",
      width: "w-40 md:w-56 lg:w-64",
      height: "h-52 md:h-72 lg:h-80",
    },
    {
      src: "https://picsum.photos/seed/portrait2/350/500",
      alt: "Portrait 2",
      width: "w-36 md:w-44 lg:w-52",
      height: "h-48 md:h-56 lg:h-64",
    },
    {
      src: "https://picsum.photos/seed/portrait3/400/550",
      alt: "Portrait 3",
      width: "w-32 md:w-44 lg:w-52",
      height: "h-44 md:h-60 lg:h-72",
    },
    {
      src: "https://picsum.photos/seed/album1/400/400",
      alt: "Album Cover",
      width: "w-28 md:w-40 lg:w-48",
      height: "h-28 md:h-40 lg:h-48",
    },
    {
      src: "https://picsum.photos/seed/vintage1/350/350",
      alt: "Vintage Cover",
      width: "w-24 md:w-36 lg:w-40",
      height: "h-24 md:h-36 lg:h-40",
    },
  ];

  const initialPositions = [
    { x: -20, y: 10, rotate: -8 },
    { x: 25, y: -5, rotate: 12 },
    { x: 0, y: 0, rotate: -3 },
    { x: -15, y: -20, rotate: 6 },
    { x: 30, y: 15, rotate: -10 },
  ];

  const finalPositions = [
    { x: "-45vw", y: "5vh", rotate: -5 },
    { x: "42vw", y: "30vh", rotate: 4 },
    { x: "0vw", y: "0vh", rotate: 2 },
    { x: "40vw", y: "-25vh", rotate: 6 },
    { x: "-35vw", y: "-30vh", rotate: -8 },
  ];

  const stats = [
    {
      number: 58,
      suffix: "+",
      label: "Awards",
      description: "For design & brand innovation",
    },
    {
      number: 75,
      suffix: "+",
      label: "launches",
      description: "For happy, amazing clients",
    },
    { number: 4, suffix: "", label: "Team Members", description: "" },
    { number: 100, suffix: "%", label: "Remote workplace", description: "" },
  ];

  const statNumberRefs = useRef([]);

  // Hero animations
  useEffect(() => {
    imagesIntroTl.current = gsap.timeline();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], {
        opacity: 0,
        y: 50,
      });
      gsap.set(impossibleWrapperRef.current, { height: 0, overflow: "hidden" });
      gsap.set(impossibleRef.current, { opacity: 0, y: 30 });

      imagesRef.current.forEach((img, i) => {
        gsap.set(img, {
          opacity: 0,
          scale: 0.8,
          x: initialPositions[i].x,
          y: initialPositions[i].y,
          rotation: initialPositions[i].rotate,
        });
      });

      tl.to(line1Ref.current, { opacity: 1, y: 0, duration: 0.8 })
        .to(line2Ref.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
        .to(line3Ref.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
        .to(
          impossibleWrapperRef.current,
          { height: "auto", duration: 0.8, ease: "power2.inOut" },
          "+=0.2"
        )
        .to(
          impossibleRef.current,
          { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" },
          "-=0.5"
        )
        .to(
          imagesRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "back.out(1.2)",
          },
          "-=0.3"
        )
        .to({}, { duration: 0.8 })
        .add(() => {
          finalPositions.forEach((pos, i) => {
            gsap.to(imagesRef.current[i], {
              x: pos.x,
              y: pos.y,
              rotate: pos.rotate,
              duration: 1.2,
              delay: i * 0.05,
              ease: "power2.out",
            });
          });
        });
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  // Color transition on scroll - changes at halfway point of hero section
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate hero section background color
      gsap.to(heroSectionRef.current, {
        backgroundColor: "rgb(233, 228, 217)",
        ease: "none",
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "center center",
          end: "bottom center",
          scrub: 0.5,
          onUpdate: (self) => {
            // Update navbar dark mode based on scroll progress
            setIsNavbarDark(self.progress < 0.5);
          },
        },
      });

      // Animate hero text colors from white to dark
      const heroTextElements = [
        line1Ref.current,
        line2Ref.current,
        line3Ref.current,
      ];

      heroTextElements.forEach((el) => {
        if (el) {
          gsap.to(el, {
            color: "hsl(0, 0%, 10%)",
            ease: "none",
            scrollTrigger: {
              trigger: heroSectionRef.current,
              start: "center center",
              end: "bottom center",
              scrub: 0.5,
            },
          });
        }
      });

      // Animate "IMPOSSIBLE" text color
      gsap.to(impossibleRef.current, {
        color: "hsl(40, 30%, 35%)",
        ease: "none",
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "center center",
          end: "bottom center",
          scrub: 0.5,
        },
      });
    }, mainContainerRef);

    return () => ctx.revert();
  }, []);

  // Scroll progress bar animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(progressBarRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: mainContainerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });
    }, mainContainerRef);

    return () => ctx.revert();
  }, []);

  // About section animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
      gsap.set(heroTextRef.current?.children || [], { opacity: 0, y: 60 });
      gsap.set(globeRef.current, { opacity: 0, x: 100, rotation: -15 });
      gsap.set(globeBadgeRef.current, { opacity: 0, scale: 0 });
      gsap.set(descriptionRef.current, { opacity: 0, y: 30 });
      gsap.set(imageRef.current, { opacity: 0, y: 50, scale: 0.95 });
      statsRef.current.forEach((stat) => {
        if (stat) gsap.set(stat, { opacity: 0, y: 40 });
      });

      // Create timeline with ScrollTrigger
      const aboutTl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      aboutTl
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.2)
        .to(
          heroTextRef.current?.children || [],
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power4.out",
          },
          0.4
        )
        .to(
          globeRef.current,
          {
            opacity: 1,
            x: 0,
            rotation: -15,
            duration: 1.2,
            ease: "power2.out",
          },
          0.6
        )
        .to(
          globeBadgeRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(2)",
          },
          1.2
        )
        .to(descriptionRef.current, { opacity: 1, y: 0, duration: 0.8 }, 1)
        .to(
          statsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
          },
          1.2
        )
        .add(() => {
          // Animate stat numbers counting up
          stats.forEach((stat, index) => {
            const numEl = statNumberRefs.current[index];
            if (numEl) {
              gsap.fromTo(
                numEl,
                { innerText: 0 },
                {
                  innerText: stat.number,
                  duration: 2,
                  ease: "power2.out",
                  snap: { innerText: 1 },
                  delay: index * 0.1,
                }
              );
            }
          });
        }, 1.3)
        .to(
          imageRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out",
          },
          1.4
        );

      // Floating animation for globe
      gsap.to(globeRef.current, {
        y: -15,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2,
      });

      // Rotate badge slowly
      gsap.to(globeBadgeRef.current, {
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1,
      });
    }, aboutSectionRef);

    return () => ctx.revert();
  }, []);

  // Smooth scroll to section function
  const scrollToSection = (sectionId) => {
    const targetRef = sectionId === "hero" ? heroSectionRef : aboutSectionRef;
    if (targetRef.current) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: targetRef.current, offsetY: 0 },
        ease: "power3.inOut",
      });
    }
  };

  return (
    <>
      <CustomCursor isDark={isNavbarDark} />
      <Navbar isDarkMode={isNavbarDark} onScrollToSection={scrollToSection} />

      {/* Scroll Progress Bar */}
      <div
        ref={progressBarRef}
        className="fixed top-0 left-16 right-0 h-[2px] z-[60] origin-left"
        style={{
          backgroundColor: "hsl(40, 30%, 55%)",
          transform: "scaleX(0)",
        }}
      />

      <div ref={mainContainerRef} className="relative">
        {/* Hero Section - Black Background that transitions to cream */}
        <section
          ref={heroSectionRef}
          className="min-h-screen overflow-hidden flex items-center justify-center relative pl-16 z-10"
          style={{ backgroundColor: "hsl(0, 0%, 0%)" }}
        >
          <div className="text-center relative z-10 px-4">
            <h1
              ref={line1Ref}
              className="font-serif text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-normal tracking-tight leading-none"
            >
              CREATING
            </h1>
            <h1
              ref={line2Ref}
              className="font-serif text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-normal tracking-tight leading-none mt-1 md:mt-2 flex items-center justify-center gap-1 md:gap-2"
            >
              BRANDS
              <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                ✦
              </span>
            </h1>

            <div ref={impossibleWrapperRef}>
              <h2
                ref={impossibleRef}
                className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-none py-2 md:py-4 uppercase"
                style={{ fontWeight: 900, color: "hsl(40, 30%, 55%)" }}
              >
                IMPOSSIBLE
              </h2>
            </div>

            <h1
              ref={line3Ref}
              className="font-serif text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-normal tracking-tight leading-none"
            >
              TO IGNORE
            </h1>
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {images.map((image, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) imagesRef.current[index] = el;
                }}
                className={`absolute ${image.width} ${image.height} rounded-lg overflow-hidden shadow-2xl transition-shadow duration-300 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]`}
                style={{ zIndex: index === 2 ? 5 : 20 + index }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* About Section - Light Background */}
        <section
          ref={aboutSectionRef}
          className="min-h-screen overflow-x-hidden pl-16 relative z-10"
          style={{ backgroundColor: "rgb(233, 228, 217)" }}
        >
          {/* Hero Content */}
          <div className="min-h-screen relative px-8 md:px-16 pt-24 pb-16">
            {/* Globe Badge */}
            <div
              ref={globeBadgeRef}
              className="absolute top-8 right-8 w-16 h-16 rounded-full border flex items-center justify-center"
              style={{ borderColor: "hsl(0, 0%, 30%)" }}
            >
              <div className="text-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
            </div>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-xs uppercase tracking-[0.3em] mb-8"
              style={{ color: "hsl(40, 30%, 35%)" }}
            >
              HOWDY, WE'RE ROGUE
            </p>

            {/* Main Heading */}
            <div ref={heroTextRef} className="max-w-5xl">
              <h1
                className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.1] tracking-tight"
                style={{ color: "hsl(0, 0%, 10%)" }}
              >
                MAKING CULTURE VISIBLE
              </h1>
              <h1
                className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.1] tracking-tight"
                style={{ color: "hsl(0, 0%, 10%)" }}
              >
                THROUGH DESIGN, TECH,
              </h1>
              <h1
                className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.1] tracking-tight"
                style={{ color: "hsl(0, 0%, 10%)" }}
              >
                AND{" "}
                <span className="italic" style={{ color: "hsl(40, 30%, 40%)" }}>
                  A LITTLE MAGIC
                </span>
              </h1>
            </div>

            {/* Globe Image */}
            <div
              ref={globeRef}
              className="relative mt-8 md:absolute md:-top-8 md:right-0 lg:right-8 w-48 sm:w-64 md:w-72 lg:w-[400px] mx-auto md:mx-0"
            >
              <img
                src="https://rogue-studio.transforms.svdcdn.com/staging/globe.jpg?h=550&q=85&auto=format&fit=crop&dm=1689577916&s=73bc3a36b1873efe4182a5d695ea4f0f"
                alt="Globe sculpture"
                className="w-full h-auto object-contain about-globe show-eyes"
                style={{
                  filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15))",
                  transform: "rotate(-15deg)",
                }}
              />
            </div>
          </div>

          {/* Stats Section */}
          <div className="px-8 md:px-16 py-16 grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left Column - Description and Stats */}
            <div>
              {/* Decorative star with animated dot */}
              <div className="mb-8 relative">
                <span style={{ color: "hsl(40, 30%, 45%)" }}>✦</span>
              </div>

              {/* Description */}
              <p
                ref={descriptionRef}
                className="text-lg md:text-xl leading-relaxed mb-20 max-w-md mt-12"
                style={{ color: "hsl(0, 0%, 35%)" }}
              >
                Infusing{" "}
                <span className="italic" style={{ color: "hsl(0, 0%, 25%)" }}>
                  playfulness
                </span>{" "}
                into everything we touch, creating distinctive brand solutions
                with extraordinary outcomes.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 md:gap-x-20 gap-y-10 md:gap-y-16">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    ref={(el) => {
                      if (el) statsRef.current[index] = el;
                    }}
                    className="opacity-0"
                  >
                    <p
                      className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight mb-3 tracking-tight"
                      style={{ color: "hsl(0, 0%, 15%)" }}
                    >
                      <span
                        ref={(el) => {
                          if (el) statNumberRefs.current[index] = el;
                        }}
                      >
                        0
                      </span>
                      <span style={{ color: "hsl(0, 0%, 40%)" }}>
                        {stat.suffix}
                      </span>
                    </p>
                    <p
                      className="text-base md:text-lg mb-1 font-normal"
                      style={{ color: "hsl(0, 0%, 15%)" }}
                    >
                      {stat.label}
                    </p>
                    {stat.description && (
                      <p
                        className="text-sm italic"
                        style={{ color: "hsl(0, 0%, 50%)" }}
                      >
                        {stat.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Image */}
            <div
              ref={imageRef}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              style={{ minHeight: "500px" }}
            >
              <img
                src="https://picsum.photos/seed/creative1/800/1000"
                alt="Creative work"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      </div>
      <ImageMarquee />
      <Services />
      <ClientLogos />
    </>
  );
};

export default Home;
