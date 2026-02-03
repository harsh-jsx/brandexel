import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Navbar from "../components/Navbar";
import ImageMarquee from "../components/ImageMarquee";
import Services from "../components/Services";
import CustomCursor from "../components/CustomCursor";
import ClientLogos from "../components/ClientLogos";
import globe1 from '../assets/globe1.webp'
import { Link, useLocation } from "react-router-dom";
// import { fetchAPI, getStrapiMedia } from "../lib/strapi";
import ScrambleText from "../components/ScrambleText";
import brandVideo from '../assets/brandexel.mp4';
import h1 from '../assets/h1.webp'
import h2 from '../assets/h2.webp'
import h3 from '../assets/h3.webp'
import h4 from '../assets/h4.webp'
import h5 from '../assets/h5.webp'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Home = ({ isPreloading }) => {
  const mainContainerRef = useRef(null);
  const heroSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const progressBarRef = useRef(null);
  const darkNavbarContainerRef = useRef(null);

  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const sectionId = location.state.scrollTo;
      // Small delay to allow mounting/preloading
      setTimeout(() => {
        gsap.to(window, { scrollTo: `#${sectionId}`, duration: 1.5, ease: "power4.inOut" });
      }, 500);
    }
  }, [location]);

  // State for navbar dark mode
  const [isNavbarDark, setIsNavbarDark] = useState(true);
  const [isScrambling, setIsScrambling] = useState(false);

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
  const starRef = useRef(null);
  const aboutContentRef = useRef(null);


  const images = [
    {
      src: h1,
      alt: "Portrait 1",
      width: "w-40 md:w-56 lg:w-64",
      height: "h-52 md:h-72 lg:h-80",
    },
    {
      src: h2,
      alt: "Portrait 2",
      width: "w-36 md:w-44 lg:w-52",
      height: "h-48 md:h-56 lg:h-64",
    },
    {
      src: h3,
      alt: "Portrait 3",
      width: "w-32 md:w-44 lg:w-52",
      height: "h-44 md:h-60 lg:h-72",
    },
    {
      src: h4,
      alt: "Album Cover",
      width: "w-28 md:w-40 lg:w-48",
      height: "h-28 md:h-40 lg:h-48",
    },
    {
      src: h5,
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

  // State for Case Studies
  const [caseStudies, setCaseStudies] = useState([]);

  // Fetch Case Studies
  // Fetch Case Studies
  // useEffect(() => {
  //   const getCaseStudies = async () => {
  //     try {
  //       const response = await fetchAPI("/case-studies?populate=thumbnail");
  //       if (response.data) {
  //         setCaseStudies(response.data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching case studies:", error);
  //     }
  //   };
  //   getCaseStudies();
  // }, []);

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
      // Create the timeline and assign to ref
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 1.2, // Wait for preloader wipe
        onComplete: () => {
          // Ensure we don't double-trigger if forced
        }
      });
      imagesIntroTl.current = tl;

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
            x: (i) => finalPositions[i].x,
            y: (i) => finalPositions[i].y,
            rotation: (i) => finalPositions[i].rotate,
            duration: 1.2,
            stagger: 0.08,
            ease: "power4.out",
          },
          "-=0.3"
        )
        // Ensure we explicitly set the state before transferring valid control
        .addLabel("complete")
        .add(() => {
          // Determine where we are starting from.
          // If we arrived here naturally, images are at 'finalPositions'.
          // If we skipped, they should also be at 'finalPositions' due to the tween completing.

          initialPositions.forEach((pos, i) => {
            // Create the scroll-driven tween
            // We use immediateRender: false to prevent it from seizing control 
            // before the scroll actually happens (though scrub:1 makes it reactive).
            gsap.to(imagesRef.current[i], {
              x: pos.x,
              y: pos.y,
              rotate: pos.rotate,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: heroSectionRef.current,
                start: "top top",
                end: "bottom center",
                scrub: 1,
                invalidateOnRefresh: true, // Handle resize better
              }
            });
          });
          ScrollTrigger.refresh();
        });

      // Setup a listener to skip intro on scroll
      ScrollTrigger.create({
        trigger: document.body,
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (imagesIntroTl.current && imagesIntroTl.current.isActive() && self.scroll() > 5) {
            // Force completion if user scrolls
            imagesIntroTl.current.progress(1);
          }
        }
      });

    }, heroSectionRef);

    // Force refresh to ensure ScrollTrigger picks up the layout
    setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => ctx.revert();
  }, [isPreloading]);

  // Image loading tracking
  const loadedImagesCount = useRef(0);
  const totalImages = images.length;

  const handleImageLoad = () => {
    loadedImagesCount.current++;
    if (loadedImagesCount.current === totalImages) {
      ScrollTrigger.refresh();
    }
  };


  // Ensure ScrollTrigger refreshes when everything is ready
  useEffect(() => {
    if (!isPreloading) {
      // Multiple refreshes to catch layout shifts
      const t1 = setTimeout(() => ScrollTrigger.refresh(), 500);
      const t2 = setTimeout(() => ScrollTrigger.refresh(), 1000);

      // Force a refresh immediately in case images are already cached/loaded
      if (loadedImagesCount.current === totalImages) {
        ScrollTrigger.refresh();
      }

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [isPreloading]);

  // Color transition on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial State: Black background
      gsap.set(heroSectionRef.current, { backgroundColor: "#000000" });

      // Scroll Transition: Black -> Off-White
      gsap.to(heroSectionRef.current, {
        backgroundColor: "#E9E4D9",
        ease: "none",
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "center center",
          end: "bottom center",
          scrub: 0.5,
          onUpdate: (self) => {
            // Navbar mode logic - User requested Black Navbar on About section too.
            // Keeping it true (Black) for now as per specific request.
            if (!isNavbarDark) setIsNavbarDark(true);
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
            color: "#1a1a1a", // Transition to Dark Text
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
        color: "#1a1a1a",
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
          trigger: aboutContentRef.current, // Changed trigger to content
          start: "top 80%", // Trigger a bit earlier
          end: "bottom center",
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

      // Star Animation
      if (starRef.current) {
        gsap.to(starRef.current, {
          rotation: 360,
          duration: 8,
          repeat: -1,
          ease: "none"
        });
      }

      // Parallax Video Effect
      // if (imageRef.current) {
      //   gsap.to(imageRef.current, {
      //     yPercent: 20,
      //     scale: 1.15, // Parallax Size Increase
      //     ease: "none",
      //     scrollTrigger: {
      //       trigger: aboutSectionRef.current,
      //       start: "top bottom",
      //       end: "bottom top",
      //       scrub: true,
      //     }
      //   });
      // }

      // Trigger text scrambling
      ScrollTrigger.create({
        trigger: aboutSectionRef.current,
        start: "top 60%",
        onEnter: () => setIsScrambling(true),
        onLeaveBack: () => setIsScrambling(false), // Optional: reset on scroll back?
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
        className="fixed top-0 left-16 right-0 h-0 z-[60] origin-left "
        style={{
          backgroundColor: "hsl(40, 30%, 55%)",
          transform: "scaleX(0)",
        }}
      />

      <div ref={mainContainerRef} className="relative">
        {/* HERO SECTION */}
        <section
          ref={heroSectionRef}
          className="min-h-screen overflow-hidden flex items-center justify-center relative z-9999"
          style={{ backgroundColor: "#000000" }}
        >
          <div className="text-center relative z-10 px-4">
            <h1
              ref={line1Ref}
              className="font-[Neue-Regular] z-9999 text-white text-6xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-normal tracking-tight leading-none"
            >
              CREATING
            </h1>
            <h1
              ref={line2Ref}
              className=" z-9999 font-[Neue-Regular] text-white text-6xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-normal tracking-tight leading-none mt-1 md:mt-2 flex items-center justify-center gap-1 md:gap-2"
            >
              BRANDS
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[#957E50]">
                ✦
              </span>
            </h1>

            <div ref={impossibleWrapperRef}>
              <h2
                ref={impossibleRef}
                className="bg-gradient-to-r from-[#957E50] via-[#957E50] to-[#957E50] bg-clip-text text-transparent  font-[druk] text-[20vw]  md:text-6xl  lg:text-9xl xl:text-[12vw] font-black md:py-1 uppercase"
                style={{ fontWeight: 900, }}
              >
                IMPOSSIBLE
              </h2>
            </div>

            <h1
              ref={line3Ref}
              className="font-[Neue-Regular] z-9999 text-white text-6xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-normal tracking-tight leading-none"
            >
              TO IGNORE
            </h1>
          </div>

          <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
            {images.map((image, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) imagesRef.current[index] = el;
                }}
                className={`absolute ${image.width} ${image.height} z-10 rounded-lg overflow-hidden shadow-2xl transition-shadow duration-300 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]`}
                style={{ zIndex: index === 2 ? 5 : 20 + index }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover opacity-50"
                />
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT SECTION (ENHANCED) */}
        <section
          ref={aboutSectionRef}
          className="min-h-screen overflow-x-hidden relative z-10 py-24 overflow-hidden"
          style={{ backgroundColor: "#E9E4D9" }}
        >
          {/* Noise Overlay */}
          <div className="bg-noise" />

          {/* Background Gradient Orb */}
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[hsl(40,30%,55%)]/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          {/* Technical Grid Overlay REMOVED for cleaner look */}

          {/* Enhanced Gradient Orbs */}
          <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[hsl(40,30%,55%)]/15 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#C02FFB]/5 rounded-full blur-[80px] translate-y-1/4 translate-x-1/4 pointer-events-none" />

          {/* Tech Annotations */}
          <div className="absolute top-10 left-10 text-[10px] uppercase font-mono text-[#1a1a1a]/40 hidden md:block tracking-widest">
            Ref: 2025-BX // V.2.0
          </div>
          <div className="absolute bottom-10 right-10 text-[10px] uppercase font-mono text-[#1a1a1a]/40 hidden md:block tracking-widest">
            Scroll // Explore
          </div>

          <div className="relative z-10  lg: pb-20 overflow-hidden">
            {/* Full Screen Parallax Video Block (Above Text) */}
            <div className="w-full h-[100vh] relative overflow-hidden mb-16 rounded-xl">
              <video
                ref={imageRef}
                src={brandVideo}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-[120%] object-cover object-center"
                style={{ top: "-10%" }}
              />
            </div>

            {/* Content Wrapper for ScrollTrigger */}
            <div ref={aboutContentRef}>
              {/* Header / Top Part */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 relative">

                {/* Rotating Badge */}
                <div
                  ref={globeBadgeRef}
                  className="absolute -top-10 right-0 lg:top-0 lg:right-10 w-24 h-24 lg:w-32 lg:h-32 rounded-full border border-neutral-400 flex items-center justify-center bg-[#E9E4D9]/80 backdrop-blur-sm z-20"
                >
                  <div className="text-center">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </div>
                </div>

                {/* Text Blocks */}
                <div className="max-w-4xl px-6 md:px-20 relative z-10 mt-16 lg:mt-0">
                  <p
                    ref={subtitleRef}
                    className="font-abc text-sm tracking-[0.2em] mb-6 lg:mb-10 text-[#1a1a1a]/70 overflow-hidden"
                  >
                    <span className="block">HOWDY, WE'RE ROGUE</span>
                  </p>

                  <div ref={heroTextRef} className="space-y-2">
                    {["MAKING CULTURE VISIBLE", "THROUGH DESIGN, TECH,", "AND A LITTLE MAGIC"].map((text, i) => (
                      <div key={i} className="overflow-hidden pb-4 -mb-4 pr-4 -mr-4">
                        <h1 className="font-[druk] text-[13vw] sm:text-6xl md:text-6xl lg:text-[7.5vw] uppercase leading-[1.1] md:leading-[0.85] text-black mix-blend-multiply">
                          {text.includes("MAGIC") ? (
                            <span className="inline-block relative">
                              AND <span className="font-[druk] font-light italic bg-gradient-to-r from-[#957E50] via-[#957E50] to-[#957E50] bg-clip-text text-transparent lowercase tracking-normal pr-4">a little magic</span>
                            </span>
                          ) : (
                            <ScrambleText text={text} isHovered={isScrambling} className="inline-block" />
                          )}
                        </h1>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content & Stats */}
              <div className="flex flex-col gap-24 px-6 md:px-22  overflow-hidden mt-20">
                {/* Description */}
                <div className="lg:w-2/3">
                  <div ref={starRef} className="w-12 h-12 mb-8 text-[hsl(40,30%,45%)]">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" /></svg>
                  </div>

                  <p
                    ref={descriptionRef}
                    className="font-abc text-2xl md:text-3xl leading-[1.2] text-black font-medium"
                  >
                    Infusing <span className="italic text-black font-semibold">playfulness</span> into everything we touch, creating distinctive brand solutions with extraordinary outcomes.
                  </p>
                </div>

                {/* Stats Grid - Now 4 columns */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-t border-[#1a1a1a]/10 pt-12">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      ref={(el) => (statsRef.current[index] = el)}
                      className="opacity-0 translate-y-8 group/stat cursor-pointer hover:bg-[#1a1a1a]/5 p-4 rounded-lg transition-colors duration-500"
                    >
                      <p className="font-albra text-6xl md:text-7xl text-[#1a1a1a] leading-none mb-3 transition-transform duration-500 group-hover/stat:-translate-y-2 flex items-baseline">
                        <span ref={(el) => (statNumberRefs.current[index] = el)}>0</span>
                        <span className="text-[#1a1a1a]/60 text-4xl ml-1 group-hover/stat:text-[#1a1a1a] transition-colors">{stat.suffix}</span>
                      </p>
                      <p className="font-abc text-sm uppercase tracking-wider text-[#1a1a1a]/60 inline-block relative font-bold group-hover/stat:text-[#1a1a1a] transition-colors">
                        {stat.label}
                      </p>
                      {stat.description && (
                        <p className="font-abc text-xs text-[#1a1a1a]/40 mt-2">{stat.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section >

        {/* --- ROLLING MARQUEE SEPARATOR --- */}
        < div className="w-full relative py-12 bg-[#E9E4D9] overflow-hidden" >
          <div className="absolute inset-0 flex items-center justify-center  scale-110 z-10 pointer-events-none">
            <div className="w-full bg-[#957E50] py-6 shadow-2xl">
              <div className="marquee-container">
                <div className="marquee-content animate-marquee-slower">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center">
                      {["STRATEGY", "DESIGN", "DEVELOPMENT", "MOTION"].map((word, j) => (
                        <div key={j} className="flex items-center px-12">
                          <span className="font-[druk] text-6xl lg:text-8xl text-[#E9E4D9] uppercase tracking-wide">{word}</span>
                          <span className="ml-12 text-[#000000] text-4xl">★</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Spacer to maintain height given that the marquee is absolute/rotated (optional, or just let it float) */}
          <div className="h-32 md:h-48 w-full"></div>
        </div >

        {/* SELECTED WORKS SECTION */}
        < section id="selected-works" className="py-32 px-6 md:px-12 lg:px-20 relative z-10 bg-[#E9E4D9]" >
          <div className="mb-24 border-b border-[#1a1a1a]/20 pb-8 flex justify-between items-end">
            <span className="font-abc md:px-10 uppercase tracking-[0.2em] text-sm text-[#1a1a1a]/70">Selected Works</span>
            <span className="font-abc text-sm text-[#1a1a1a]/60 hidden md:block">2023 — 2025</span>
          </div>

          <div className="flex flex-col">
            {/* Combine Static + Dynamic Data */}
            {[
              // Static Item
              {
                name: "Disposek",
                cat: "Identity / Motion",
                image: "https://picsum.photos/seed/neotokyo/800/600",
                link: "/case-study-disposek"
              }, {
                name: "Duo Glam",
                cat: "Identity / Design",
                image: "https://picsum.photos/seed/neotokyo/800/600",
                link: "/case-study-duo"
              },
              // Dynamic Items
              // ...caseStudies.map(study => {
              //   const attributes = study.attributes || study;
              //   return {
              //     name: attributes.title || "Untitled Project",
              //     cat: attributes.category || "Case Study",
              //     image: getStrapiMedia(attributes.thumbnail),
              //     link: attributes.slug ? `/case-study/${attributes.slug}` : "#"
              //   };
              // })
            ].map((work, i) => (
              <Link to={work.link} key={i} className="group border-b md:px-10 border-[#1a1a1a]/20 py-12 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer transition-all duration-500 hover:px-8 hover:bg-[#1a1a1a]/5">
                <h3 className="font-[druk] text-7xl md:text-[8vw] uppercase text-[#1a1a1a] transition-all duration-500 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#957E50] group-hover:via-[#957E50] group-hover:to-[#957E50] group-hover:bg-clip-text flex items-center gap-4">
                  {work.name}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-0 group-hover:w-auto overflow-hidden">
                    <span className="text-2xl md:text-4xl text-[#1a1a1a]">↗</span>
                  </div>
                </h3>
                <span className="font-abc text-lg text-[#1a1a1a]/60 group-hover:text-[#1a1a1a] mt-2 md:mt-0">{work.cat}</span>

                {/* Hover Image Float (Simple version) */}
                <div className="absolute pointer-events-none opacity-0 group-hover:opacity-10 scale-50 group-hover:scale-100 transition-all duration-500 z-20 w-[300px] h-[200px] right-20 top-1/2 -translate-y-1/2 hidden lg:block rounded- overflow-hidden shadow-2xl rotate-3 group-hover:-rotate-2">
                  {work.image && <img src={work.image} alt={work.name} className="w-full h-full object-cover" />}
                </div>
              </Link>
            ))}
          </div>

          {/* <div className="mt-24 text-center">
            <a href="/case-study" className="inline-block border border-[#1a1a1a] px-8 py-4 rounded-full font-abc uppercase tracking-wider hover:bg-[#1a1a1a] hover:text-[#E9E4D9] transition-all duration-300">
              View All Projects
            </a>
          </div> */}

        </section >
      </div >

      <div className="nav-dark" ref={darkNavbarContainerRef}>
        <ImageMarquee />
        <Services />
        <ClientLogos />
      </div>
    </>
  );
};

export default Home;
