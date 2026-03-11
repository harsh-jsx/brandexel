import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import CustomCursor from "../components/CustomCursor";
import { Link } from "react-router-dom";
import MagneticButton from "../components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const CaseStudyStatic = () => {
    const containerRef = useRef(null);
    const heroImageRef = useRef(null);
    const titleRef = useRef(null);
    const detailsRef = useRef(null);
    const galleryRef = useRef(null);
    const nextProjectRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // 1. Hero Parallax & Title Reveal
            gsap.from(titleRef.current.querySelectorAll("h1"), {
                yPercent: 120,
                duration: 1.5,
                stagger: 0.1,
                ease: "power4.out",
                delay: 0.2
            });

            gsap.to(heroImageRef.current, {
                scale: 1.1,
                yPercent: 10,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            // 2. Details Section - Fade Up
            gsap.from(detailsRef.current.children, {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: detailsRef.current,
                    start: "top 80%"
                }
            });

            // 3. Horizontal Scroll Gallery (desktop only; mobile uses native touch scroll)
            const sections = gsap.utils.toArray(".gallery-item");
            const isMobile = window.matchMedia("(max-width: 768px)").matches;
            if (sections.length > 0 && !isMobile) {
                gsap.to(sections, {
                    xPercent: -100 * (sections.length - 1),
                    ease: "none",
                    scrollTrigger: {
                        trigger: galleryRef.current,
                        pin: true,
                        scrub: 1,
                        end: "+=3000",
                    }
                });
            }

            // 4. Next Project Reveal
            gsap.from(nextProjectRef.current.querySelector("h2"), {
                y: 100,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: nextProjectRef.current,
                    start: "top 70%"
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const project = {
        title: "NEO TOKYO",
        client: "Future Corp",
        services: "Brand Identity, Web Design, Motion",
        year: "2025",
        description: "A radical reimagining of urban mobility for the post-cyberpunk era. We stripped away the neon clichés to find the raw, industrial soul of the city, translating it into a visual language that feels both ancient and inevitable."
    };

    return (
        <>
            <CustomCursor />
            <Navbar />

            <div ref={containerRef} className="text-[#1a1a1a] min-h-screen relative overflow-hidden" style={{ background: "linear-gradient(135deg, #f5eeff 0%, #ebe5ff 50%, #e0d8ff 100%)" }}>

                {/* HERO */}
                <section className="relative h-screen overflow-hidden flex items-end pb-24 px-6 md:px-12 lg:px-20">
                    <div className="absolute inset-0 z-0 select-none pointer-events-none">
                        <img
                            ref={heroImageRef}
                            src="https://picsum.photos/seed/tokyo/1920/1080"
                            alt="Project Hero"
                            className="w-full h-full object-cover origin-bottom"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                    </div>

                    <div ref={titleRef} className="relative z-10 w-full mix-blend-difference" style={{ color: "#f0e6ff" }}>
                        <div className="overflow-hidden">
                            <h1 className="font-albra md:text-[15vw] text-[25vw] leading-[0.8] uppercase tracking-tighter">
                                {project.title.split(" ")[0]}
                            </h1>
                        </div>
                        <div className="overflow-hidden">
                            <h1 className="font-albra md:text-[15vw] text-[25vw] leading-[0.8] uppercase tracking-tighter ml-[10vw]">
                                {project.title.split(" ")[1]}
                            </h1>
                        </div>
                    </div>
                </section>

                {/* DETAILS */}
                <section ref={detailsRef} className="py-32 px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-4 space-y-8">
                        <div>
                            <p className="font-abc text-sm uppercase tracking-widest opacity-50 mb-2">Client</p>
                            <p className="font-abc text-xl">{project.client}</p>
                        </div>
                        <div>
                            <p className="font-abc text-sm uppercase tracking-widest opacity-50 mb-2">Services</p>
                            <p className="font-abc text-xl">{project.services}</p>
                        </div>
                        <div>
                            <p className="font-abc text-sm uppercase tracking-widest opacity-50 mb-2">Year</p>
                            <p className="font-abc text-xl">{project.year}</p>
                        </div>
                    </div>
                    <div className="md:col-span-8">
                        <p className="font-albra text-4xl md:text-6xl leading-[0.9] uppercase mb-12">
                            {project.description}
                        </p>
                        <p className="font-abc text-lg max-w-2xl leading-relaxed opacity-75 indent-12">
                            The challenge was not just to design a logo, but to design a behavior. The identity needed to move, breathe, and adapt to the chaotic rhythm of the city. We utilized generative algorithms to create a logo system that is never the same twice, yet always recognizable.
                        </p>
                    </div>
                </section>

                {/* HORIZONTAL GALLERY - native scroll on mobile, GSAP scrub on desktop */}
                <section ref={galleryRef} className="min-h-[55vh] md:h-screen w-full flex items-center text-[#e8e4ff] overflow-visible md:overflow-hidden" style={{ background: "linear-gradient(180deg, #1a1625 0%, #0f0d18 100%)" }}>
                    <div className="flex flex-nowrap h-[55vh] md:h-[80vh] px-4 py-4 md:px-20 md:py-0 gap-4 md:gap-20 overflow-x-auto overflow-y-hidden md:overflow-visible snap-x snap-mandatory md:snap-none scrollbar-hide w-full [-webkit-overflow-scrolling:touch]">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="gallery-item flex-shrink-0 w-[82vw] md:w-[40vw] min-w-[82vw] md:min-w-0 h-full relative group overflow-hidden rounded-lg md:rounded-none snap-center snap-always">
                                <img
                                    src={`https://picsum.photos/seed/neo${i}/800/600`}
                                    alt={`Gallery ${i}`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 pointer-events-none">
                                    <div className="pointer-events-auto">
                                        <MagneticButton className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 uppercase tracking-widest text-sm hover:border-white/50" strength={0.3} fillColor="white" textColor="black">
                                            View Full
                                        </MagneticButton>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* NEXT PROJECT */}
                <section ref={nextProjectRef} className="h-screen flex items-center justify-center relative overflow-hidden group cursor-pointer" style={{ background: "linear-gradient(135deg, #f5eeff 0%, #e0d8ff 100%)" }}>
                    <Link to="/" className="absolute inset-0 z-20" /> {/* Link back to home or next project */}

                    <div className="absolute inset-0 bg-black transform scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-bottom z-0" />

                    <div className="relative z-10 text-center mix-blend-difference text-[#1a1a1a] group-hover:text-[#f0e6ff] transition-colors duration-500">
                        <p className="font-abc uppercase tracking-[0.3em] mb-4">Next Case Study</p>
                        <h2 className="font-albra text-[10vw] leading-none uppercase">
                            Velvet <br /> Void
                        </h2>
                    </div>
                </section>

            </div>
        </>
    );
};

export default CaseStudyStatic;
