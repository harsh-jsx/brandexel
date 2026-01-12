import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Luminary",
    category: "Brand Identity",
    image: "https://picsum.photos/seed/project1/800/1000",
    year: "2024",
  },
  {
    id: 2,
    title: "Ethereal",
    category: "Web Design",
    image: "https://picsum.photos/seed/project2/800/1000",
    year: "2024",
  },
  {
    id: 3,
    title: "Nexus",
    category: "Digital Campaign",
    image: "https://picsum.photos/seed/project3/800/1000",
    year: "2023",
  },
  {
    id: 4,
    title: "Aurora",
    category: "E-Commerce",
    image: "https://picsum.photos/seed/project4/800/1000",
    year: "2023",
  },
  {
    id: 5,
    title: "Prism",
    category: "App Design",
    image: "https://picsum.photos/seed/project5/800/1000",
    year: "2023",
  },
];

export default function Portfolio({ isLoading }) {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const projectRefs = useRef([]);
  const progressRef = useRef(null);

  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(titleRef.current, { opacity: 0, y: 80 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 40 });
      gsap.set(progressRef.current, { scaleX: 0 });

      // Header animation
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      headerTl
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
        })
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.8"
        );

      // Horizontal scroll
      const scrollContainer = scrollContainerRef.current;
      const scrollWidth = scrollContainer.scrollWidth - window.innerWidth;

      gsap.to(scrollContainer, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            gsap.to(progressRef.current, {
              scaleX: self.progress,
              duration: 0.1,
              ease: "none",
            });
          },
        },
      });

      // Project card animations
      projectRefs.current.forEach((project) => {
        if (!project) return;

        const image = project.querySelector(".project-image");
        const overlay = project.querySelector(".project-overlay");
        const info = project.querySelector(".project-info");
        const reveal = project.querySelector(".image-reveal");

        gsap.set(reveal, { yPercent: 0 });
        gsap.set(info, { opacity: 0, y: 20 });

        project.addEventListener("mouseenter", () => {
          gsap.to(reveal, {
            yPercent: -100,
            duration: 0.8,
            ease: "power3.inOut",
          });
          gsap.to(image, {
            scale: 1.1,
            duration: 0.8,
            ease: "power3.out",
          });
          gsap.to(overlay, {
            opacity: 1,
            duration: 0.4,
          });
          gsap.to(info, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.2,
            ease: "power3.out",
          });
        });

        project.addEventListener("mouseleave", () => {
          gsap.to(reveal, {
            yPercent: 0,
            duration: 0.6,
            ease: "power3.inOut",
          });
          gsap.to(image, {
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
          });
          gsap.to(overlay, {
            opacity: 0,
            duration: 0.4,
          });
          gsap.to(info, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            ease: "power3.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading]);

  return (
    <section ref={sectionRef} className="relative bg-black">
      {/* Header */}
      <div className="relative z-10 pt-24 md:pt-32 pb-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <p
            ref={subtitleRef}
            className="text-[hsl(40,30%,55%)] text-sm md:text-base tracking-[0.3em] uppercase mb-4"
          >
            Selected Work
          </p>
          <h2
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight"
          >
            Portfolio
          </h2>
        </div>
      </div>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 pointer-events-none">
        <div
          ref={progressRef}
          className="h-full bg-[hsl(40,30%,55%)] origin-left"
        />
      </div>

      {/* Horizontal scroll container */}
      <div ref={triggerRef} className="relative overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex gap-8 md:gap-12 pl-6 md:pl-12 py-12"
          style={{ width: "max-content" }}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (projectRefs.current[index] = el)}
              className="relative w-[70vw] md:w-[40vw] lg:w-[30vw] h-[70vh] md:h-[75vh] cursor-pointer group flex-shrink-0"
            >
              {/* Card container */}
              <div className="relative w-full h-full overflow-hidden rounded-lg">
                {/* Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image w-full h-full object-cover"
                />

                {/* Image reveal overlay */}
                <div className="image-reveal absolute inset-0 bg-black z-10" />

                {/* Hover overlay */}
                <div className="project-overlay absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 z-20" />

                {/* Project info */}
                <div className="project-info absolute bottom-0 left-0 right-0 p-6 md:p-8 z-30">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[hsl(40,30%,55%)] text-sm tracking-[0.2em] uppercase mb-2">
                        {project.category}
                      </p>
                      <h3 className="text-3xl md:text-4xl font-serif text-white">
                        {project.title}
                      </h3>
                    </div>
                    <span className="text-white/50 text-sm">
                      {project.year}
                    </span>
                  </div>

                  {/* View project link */}
                  <div className="mt-6 flex items-center gap-2 text-white">
                    <span className="text-sm tracking-wider uppercase">
                      View Project
                    </span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300"
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
                  </div>
                </div>

                {/* Project number */}
                <div className="absolute top-6 right-6 z-30">
                  <span className="text-white/20 text-7xl md:text-9xl font-serif">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Decorative border */}
              <div className="absolute -inset-px rounded-lg border border-white/10 pointer-events-none group-hover:border-[hsl(40,30%,55%)]/30 transition-colors duration-500" />
            </div>
          ))}

          {/* End spacer */}
          <div className="w-[20vw] flex-shrink-0" />
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 right-8 text-white/30 text-sm tracking-wider uppercase flex items-center gap-3">
        <span>Scroll</span>
        <svg
          className="w-6 h-6 animate-pulse"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </div>
    </section>
  );
}
