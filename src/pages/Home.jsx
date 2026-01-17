import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Navbar from "../components/Navbar";
import ImageMarquee from "../components/ImageMarquee";
import Services from "../components/Services";
import CustomCursor from "../components/CustomCursor";
import ClientLogos from "../components/ClientLogos";
// import Portfolio from "../components/Portfolio";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Home = ({ isPreloading }) => {
  const mainContainerRef = useRef(null);
  const heroSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const progressBarRef = useRef(null);
  const darkNavbarContainerRef = useRef(null);

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
  const curatinRef = useRef(null);
  const imagesIntroTl = useRef(null);
  const statNumberRefs = useRef([]);


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

  // Hero initial state
  useEffect(() => {
    gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], {
      opacity: 0,
      y: 50,
    });
    gsap.set(impossibleWrapperRef.current, { height: 0, overflow: "hidden" });
    gsap.set(impossibleRef.current, { opacity: 0, y: 30 });
    imagesRef.current.forEach((img, i) => {
      if (!img) return;
      gsap.set(img, {
        opacity: 0,
        scale: 0.8,
        x: initialPositions[i].x,
        y: initialPositions[i].y,
        rotation: initialPositions[i].rotate,
      });
    });
  }, []);

  // Hero animations
  useEffect(() => {
    if (isPreloading) return;
    imagesIntroTl.current = gsap.timeline();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.3 // Ensure the curtain has moved up a bit before we start
      });

      // (Sets moved to initial useEffect for stability)

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
              scrollTrigger: {
                trigger: heroSectionRef.current,
                start: "top top",
                end: "bottom center",
                scrub: 1,
              }
            });
          });
        });
    }, heroSectionRef);

    return () => ctx.revert();
  }, [isPreloading]);

  // Color transition on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(heroSectionRef.current, {
        backgroundColor: "rgb(233, 228, 217)",
        ease: "none",
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "center center",
          end: "bottom center",
          scrub: 0.5,
          onUpdate: (self) => {
            setIsNavbarDark(self.progress < 0.5);
          },
        },
      });

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

    gsap.to(darkNavbarContainerRef.current, {
      scrollTrigger: {
        trigger: darkNavbarContainerRef.current,
        start: "top 80%",
        end: "bottom 60%",
        scrub: 0.5,
        onUpdate: (self) => {
          setIsNavbarDark(true);
        }
      }
    })

    return () => ctx.revert();
  }, []);

  // Progress Bar
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

  // About Section Animations (UPDATED)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup
      const splitTexts = heroTextRef.current?.querySelectorAll("h1");
      const subSpan = subtitleRef.current?.querySelector("span");

      gsap.set(subSpan, { y: "110%" });
      if (splitTexts) gsap.set(splitTexts, { y: "110%" });

      gsap.set(globeRef.current, { x: 100, opacity: 0, rotation: -10 });
      gsap.set(globeBadgeRef.current, { scale: 0, opacity: 0 });
      gsap.set(descriptionRef.current, { opacity: 0, y: 30 });
      gsap.set(statsRef.current, { opacity: 0, y: 40 });

      // Image Curtain Setup
      const curtain = curatinRef.current;
      const mainImg = imageRef.current;
      if (curtain) gsap.set(curtain, { scaleY: 1 });
      if (mainImg) gsap.set(mainImg, { scale: 1.2 });

      // Main Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: "top 65%",
          end: "bottom bottom",
          toggleActions: "play none none reverse",
          // markers: true
        }
      });

      tl
        // Subtitle Reveal
        .to(subSpan, { y: "0%", duration: 0.8, ease: "power3.out" })

        // Headline Stagger
        .to(splitTexts, {
          y: "0%",
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out"
        }, "-=0.6")

        // Globe Entry
        .to(globeRef.current, {
          x: 0,
          opacity: 1,
          rotation: 0,
          duration: 1.4,
          ease: "expo.out"
        }, "<")

        // Badge Pop
        .to(globeBadgeRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)"
        }, "-=1")

        // Description Fade Up
        .to(descriptionRef.current, { opacity: 1, y: 0, duration: 1 }, "-=0.8")

        // Stats Stagger
        .to(statsRef.current, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, "-=0.8")

        // Image Curtain Reveal
        .to(curtain, { scaleY: 0, duration: 1.4, ease: "power4.inOut" }, "-=1")
        .to(mainImg, { scale: 1, duration: 1.4, ease: "power2.out" }, "<")

        // Number Counter Trigger
        .add(() => {
          stats.forEach((stat, index) => {
            const numEl = statNumberRefs.current[index];
            if (numEl) {
              gsap.fromTo(numEl,
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
        }, "-=1");

      // Magnetic Effect on Globe
      const handleMouseMove = (e) => {
        if (!aboutSectionRef.current) return;
        const { clientX, clientY } = e;
        // const { left, top, width, height } = aboutSectionRef.current.getBoundingClientRect();
        // Calculate relative to center of screen for simpler effect, or relative to section
        const xPos = (clientX / window.innerWidth - 0.5) * 60;
        const yPos = (clientY / window.innerHeight - 0.5) * 60;

        gsap.to(globeRef.current, {
          x: xPos,
          y: yPos,
          duration: 1.5,
          ease: "power2.out"
        });
      };
      window.addEventListener("mousemove", handleMouseMove);

      // Rotating Badge Loop
      gsap.to("svg", { // Targeting svg inside badge specifically if needed
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };

    }, aboutSectionRef);

    return () => ctx.revert();
  }, []);

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

      <div
        ref={progressBarRef}
        className="fixed top-0 left-16 right-0 h-[0px] z-[60] origin-left"
        style={{
          backgroundColor: "hsl(40, 30%, 55%)",
          transform: "scaleX(0)",
        }}
      />

      <div ref={mainContainerRef} className="relative">
        {/* HERO SECTION */}
        <section
          ref={heroSectionRef}
          className="min-h-screen overflow-hidden flex items-center justify-center relative z-10"
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
                className="font-[PPN] text-3xl sm:text-5xl md:text-6xl lg:text-9xl xl:text-10xl font-black tracking-tighter leading-none py-2 md:py-4 uppercase"
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

        {/* ABOUT SECTION (ENHANCED) */}
        <section
          ref={aboutSectionRef}
          className="min-h-screen overflow-x-hidden relative z-10 py-24"
          style={{ backgroundColor: "rgb(233, 228, 217)" }}
        >
          <div className="relative z-10 px-6 md:px-12 lg:px-20">
            {/* Header / Top Part */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 lg:mb-32 relative">

              {/* Rotating Badge */}
              <div
                ref={globeBadgeRef}
                className="absolute -top-10 right-0 lg:top-0 lg:right-10 w-24 h-24 lg:w-32 lg:h-32 rounded-full border border-neutral-400 flex items-center justify-center bg-[#E9E4D9] z-20"
              >
                <div className="text-center">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
              </div>

              {/* Text Blocks */}
              <div className="max-w-4xl relative z-10 mt-16 lg:mt-0">
                <p
                  ref={subtitleRef}
                  className="font-[PPN] text-sm tracking-[0.2em] mb-6 lg:mb-10 text-[hsl(40,30%,35%)] overflow-hidden"
                >
                  <span className="block">HOWDY, WE'RE ROGUE</span>
                </p>

                <div ref={heroTextRef} className="space-y-1">
                  {["MAKING CULTURE VISIBLE", "THROUGH DESIGN, TECH,", "AND A LITTLE MAGIC"].map((text, i) => (
                    <div key={i} className="overflow-hidden">
                      <h1 className="font-['Druk'] text-5xl sm:text-6xl md:text-8xl lg:text-9xl uppercase leading-[0.85] tracking-tight text-[hsl(0,0%,10%)]">
                        {text.includes("MAGIC") ? (
                          <>
                            AND <span className="font-[PPN] font-light italic text-[hsl(40,30%,40%)] lowercase tracking-normal">a little magic</span>
                          </>
                        ) : (
                          text
                        )}
                      </h1>
                    </div>
                  ))}
                </div>
              </div>

              {/* Magnetic Globe */}
              <div
                ref={globeRef}
                className="hidden lg:block absolute top-0 right-[20%] w-[350px] pointer-events-none mix-blend-multiply"
              >
                <img
                  src="https://rogue-studio.transforms.svdcdn.com/staging/globe.jpg?h=550&q=85&auto=format&fit=crop"
                  alt="Globe"
                  className="w-full h-auto object-contain drop-shadow-2xl opacity-90"
                />
              </div>
            </div>

            {/* Grid Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

              {/* Left Column */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 mb-8 text-[hsl(40,30%,45%)] animate-pulse">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" /></svg>
                  </div>

                  <p
                    ref={descriptionRef}
                    className="font-[PPN] text-xl md:text-2xl leading-[1.4] text-[hsl(0,0%,30%)] max-w-md"
                  >
                    Infusing <span className="italic text-black font-medium">playfulness</span> into everything we touch, creating distinctive brand solutions with extraordinary outcomes.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-12 mt-20">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      ref={(el) => (statsRef.current[index] = el)}
                      className="opacity-0 translate-y-8"
                    >
                      <p className="font-['Druk'] text-6xl md:text-7xl text-[hsl(0,0%,15%)] leading-none mb-2">
                        <span ref={(el) => (statNumberRefs.current[index] = el)}>0</span>
                        <span className="text-[hsl(0,0%,40%)] text-4xl align-top ml-1">{stat.suffix}</span>
                      </p>
                      <p className="font-[PPN] text-sm uppercase tracking-wider text-[hsl(0,0%,50%)] border-t border-[hsl(0,0%,80%)] pt-3 inline-block">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Image Reveal */}
              <div className="lg:col-span-7 relative pt-12 lg:pt-0">
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm group">
                  <div
                    ref={curatinRef}
                    className="absolute inset-0 bg-[hsl(40,30%,55%)] z-10 curtain-reveal"
                    style={{ transformOrigin: "bottom" }}
                  ></div>
                  <img
                    ref={imageRef}
                    src="https://picsum.photos/seed/creative1/1200/1500"
                    alt="Creative work"
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[1.5s] ease-out"
                  />

                  <div className="absolute bottom-8 left-8 z-20 mix-blend-difference text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="font-['Druk'] text-xl tracking-widest uppercase">Latest Work</p>
                    <p className="font-[PPN] text-sm">Brand Identity 2024</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>

      <div className="nav-dark" ref={darkNavbarContainerRef}>
        <ImageMarquee />
        <Services />
        <ClientLogos />
      </div>
    </>
  );
};

export default Home;
