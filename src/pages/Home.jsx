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
import Globe from "../components/Globe";

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

  // Selected Works Refs
  const workListRef = useRef(null);
  const floatingImageRef = useRef(null);
  const worksHeaderRef = useRef(null);

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

      // Scroll Transition: Black -> White/Purple
      gsap.to(heroSectionRef.current, {
        backgroundColor: "#ffffff", // Transition to white base
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

  // Selected Works Animation Logic
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Reveal
      const headerSpans = worksHeaderRef.current?.querySelectorAll("span > span");
      if (headerSpans && headerSpans.length > 0) {
        gsap.fromTo(headerSpans,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: worksHeaderRef.current,
              start: "top 85%", // Trigger earlier
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // List Items Reveal
      const workItems = workListRef.current?.querySelectorAll(".work-item");
      if (workItems && workItems.length > 0) {
        gsap.fromTo(workItems,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: workListRef.current,
              start: "top 75%", // Trigger earlier
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Mouse Follow Logic
      const moveImage = (e) => {
        if (floatingImageRef.current) {
          gsap.to(floatingImageRef.current, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      };

      window.addEventListener("mousemove", moveImage);

      return () => window.removeEventListener("mousemove", moveImage);

    }, workListRef);

    return () => ctx.revert();
  }, []);

  const handleWorkHover = (image) => {
    if (floatingImageRef.current) {
      const imgEl = floatingImageRef.current.querySelector("img");
      if (imgEl && imgEl.src !== image) {
        imgEl.src = image;
      }
      gsap.to(floatingImageRef.current, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" });
    }
  };

  const handleWorkLeave = () => {
    if (floatingImageRef.current) {
      gsap.to(floatingImageRef.current, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
    }
  };

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
          {/* Light Effect for Home Page */}
          <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

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
                className="bg-gradient-to-r from-[#957E50] via-[#FAE1AE] to-[#957E50] bg-clip-text text-transparent  font-[druk] text-[20vw]  md:text-6xl  lg:text-9xl xl:text-[12vw] font-black md:py-1 uppercase"
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

        <section
          ref={aboutSectionRef}
          className="min-h-screen overflow-x-hidden relative z-10 py-24 overflow-hidden md:pl-[60px]"
          style={{ background: "linear-gradient(to bottom, #ffffff, #dbebff)" }} // White to Premium Blue gradient
        >
          {/* Noise Overlay */}
          <div className="bg-noise opacity-30 mix-blend-multiply" />

          {/* Background Gradient Orb */}
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[hsl(40,30%,55%)]/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          {/* Technical Grid Overlay REMOVED for cleaner look */}

          {/* Enhanced Gradient Orbs for Light Theme */}
          <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[#957E50]/20 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#C02FFB]/30 rounded-full blur-[100px] translate-y-1/4 translate-x-1/4 pointer-events-none" />

          {/* Tech Annotations */}
          <div className="absolute top-28 left-10 text-[10px] uppercase font-mono text-black/40 hidden md:block tracking-widest z-20">
            Ref: 2025-BX // V.2.0
          </div>
          <div className="absolute bottom-10 right-10 text-[10px] uppercase font-mono text-black/20 hidden md:block tracking-widest">
            Scroll // Explore
          </div>

          <div className="relative z-10  lg: pb-20 overflow-hidden">
            {/* Full Screen Video Block (Always Visible) */}
            <div className="w-screen h-[85vh] relative left-1/2 -ml-[50vw] mb-16 bg-black">
              <video
                ref={imageRef}
                src={brandVideo}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Wrapper for ScrollTrigger */}
            <div ref={aboutContentRef}>
              {/* Header / Top Part */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 relative">

                {/* Rotating Globe (Replaces Badge) */}
                <div
                  ref={globeRef}
                  className="absolute -top-20 right-0 lg:-top-10 lg:right-0 w-64 h-64 lg:w-[500px] lg:h-[500px] z-20 pointer-events-none mix-blend-multiply opacity-80"
                >
                  <Globe />
                </div>

                {/* Text Blocks */}
                <div className="max-w-4xl px-6 md:px-20 relative z-10 mt-16 lg:mt-0">
                  <p
                    ref={subtitleRef}
                    className="font-abc text-sm tracking-[0.2em] mb-6 lg:mb-10 text-black/50 overflow-hidden"
                  >
                    <span className="block">HOWDY, WE'RE ROGUE</span>
                  </p>

                  <div ref={heroTextRef} className="space-y-2">
                    {["MAKING CULTURE VISIBLE", "THROUGH DESIGN, TECH,", "AND A LITTLE MAGIC"].map((text, i) => (
                      <div key={i} className="overflow-hidden pb-4 -mb-4 pr-4 -mr-4">
                        <h1 className="font-[druk] text-[13vw] sm:text-6xl md:text-6xl lg:text-[7.5vw] uppercase leading-[1.1] md:leading-[0.85] text-black">
                          {text.includes("MAGIC") ? (
                            <span className="inline-block relative">
                              AND <span className="font-[druk] font-light italic bg-gradient-to-r from-[#8A2BE2] via-[#9370DB] to-[#8A2BE2] bg-clip-text text-transparent lowercase tracking-normal pr-4">a little magic</span>
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
                  <div ref={starRef} className="w-12 h-12 mb-8 text-[#8A2BE2]">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" /></svg>
                  </div>

                  <p
                    ref={descriptionRef}
                    className="font-abc text-2xl md:text-3xl leading-[1.2] text-black/80 font-medium"
                  >
                    Infusing <span className="italic text-black font-semibold">playfulness</span> into everything we touch, creating distinctive brand solutions with extraordinary outcomes.
                  </p>
                </div>

                {/* Stats Grid - Now 4 columns */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-t border-black/10 pt-12">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      ref={(el) => (statsRef.current[index] = el)}
                      className="opacity-0 translate-y-8 group/stat cursor-pointer hover:bg-black/5 p-4 rounded-lg transition-colors duration-500"
                    >
                      <p className="font-albra text-6xl md:text-7xl text-black leading-none mb-3 transition-transform duration-500 group-hover/stat:-translate-y-2 flex items-baseline">
                        <span ref={(el) => (statNumberRefs.current[index] = el)}>0</span>
                        <span className="text-black/60 text-4xl ml-1 group-hover/stat:text-black transition-colors">{stat.suffix}</span>
                      </p>
                      <p className="font-abc text-sm uppercase tracking-wider text-black/60 inline-block relative font-bold group-hover/stat:text-black transition-colors">
                        {stat.label}
                      </p>
                      {stat.description && (
                        <p className="font-abc text-xs text-black/40 mt-2">{stat.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section >

        {/* --- ROLLING MARQUEE SEPARATOR --- */}
        < div className="w-full relative py-12 bg-[#dbebff] overflow-hidden" >
          <div className="absolute inset-0 flex items-center justify-center  scale-110 z-10 pointer-events-none">
            <div className="w-full bg-[#8A2BE2] py-6 shadow-2xl">
              <div className="marquee-container">
                <div className="marquee-content animate-marquee-slower">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center">
                      {["STRATEGY", "DESIGN", "DEVELOPMENT", "MOTION"].map((word, j) => (
                        <div key={j} className="flex items-center px-12">
                          <span className="font-[druk] text-6xl lg:text-8xl text-[#ffffff] uppercase tracking-wide">{word}</span>
                          <span className="ml-12 text-[#ffffff] text-4xl">★</span>
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

        {/* SELECTED WORKS SECTION - PREMIUM WHITE */}
        <section
          id="selected-works"
          ref={workListRef}
          className="py-32 px-6 md:px-12 lg:px-20 relative z-10 bg-white text-[#1a1a1a] overflow-hidden"
        >
          {/* Noise Overlay - Multiply for light bg */}
          <div className="bg-noise opacity-30 mix-blend-multiply pointer-events-none" />

          {/* Floating Image Container (Fixed to Viewport or Absolute to Section) */}
          <div
            ref={floatingImageRef}
            className="fixed top-0 left-0 w-[400px] h-[300px] pointer-events-none z-50 opacity-0 scale-0 origin-center rounded-lg overflow-hidden shadow-2xl mix-blend-normal"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <img src="" alt="Project Preview" className="w-full h-full object-cover" />
            {/* Optional: Add an overlay or filter */}
            <div className="absolute inset-0 bg-black/10" />
          </div>

          <div
            ref={worksHeaderRef}
            className="mb-24 border-b border-[#1a1a1a]/20 pb-8 flex justify-between items-end relative z-10"
          >
            <span className="font-abc md:px-10 uppercase tracking-[0.2em] text-sm text-[#1a1a1a]/70 block overflow-hidden">
              <span className="block">Selected Works</span>
            </span>
            <span className="font-abc text-sm text-[#1a1a1a]/60 hidden md:block overflow-hidden">
              <span className="block">2023 — 2025</span>
            </span>
          </div>

          <div className="flex flex-col relative z-20">
            {/* Combine Static + Dynamic Data */}
            {[
              {
                name: "Disposek",
                cat: "Identity / Motion",
                image: "https://fastly.picsum.photos/id/421/1920/1080.jpg?hmac=Gnli2YQHiOKz_MtRW--3GUsvc7Hg_8ICnqBrQKBj5-8",
                link: "/case-study-disposek",
                year: "2024"
              }, {
                name: "Duo Glam",
                cat: "Identity / Design",
                image: "https://fastly.picsum.photos/id/421/1920/1080.jpg?hmac=Gnli2YQHiOKz_MtRW--3GUsvc7Hg_8ICnqBrQKBj5-8",
                link: "/case-study-duo",
                year: "2023"
              },

            ].map((work, i) => (
              <Link
                to={work.link}
                key={i}
                className="work-item group border-b md:px-10 border-[#1a1a1a]/10 py-16 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer transition-all duration-500 hover:bg-[#1a1a1a]/5"
                onMouseEnter={() => handleWorkHover(work.image)}
                onMouseLeave={handleWorkLeave}
              >
                <div className="flex items-center gap-8 transition-transform duration-500 group-hover:translate-x-4">
                  <h3 className="font-[druk] text-7xl md:text-[7vw] uppercase text-[#1a1a1a] transition-all duration-500 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#C02FFB] group-hover:to-[#957E50] group-hover:bg-clip-text">
                    {work.name}
                  </h3>
                </div>

                <div className="flex flex-col md:items-end mt-4 md:mt-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="font-abc text-sm uppercase tracking-wider mb-1 text-[#1a1a1a]">{work.cat}</span>
                  <span className="font-mono text-xs text-[#1a1a1a]/40">{work.year}</span>
                </div>
              </Link>
            ))}
          </div>



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
