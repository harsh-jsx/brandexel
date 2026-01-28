import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import CustomCursor from "../components/CustomCursor";
import { Link } from "react-router-dom";
import MagneticButton from "../components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const CaseStudyDuo = () => {
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

            // 3. Horizontal Scroll Gallery
            const sections = gsap.utils.toArray(".gallery-item");
            if (sections.length > 0) {
                gsap.to(sections, {
                    xPercent: -100 * (sections.length - 1),
                    ease: "none",
                    scrollTrigger: {
                        trigger: galleryRef.current,
                        pin: true,
                        scrub: 1,
                        end: "+=3000", // Makes the scroll longer
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
        title: "Duo Glam",
        client: "Duo Glam",
        services: "Brand Identity, Visual Direction, Web Design",
        year: "2025",
        description: "A CONTEMPORARY TAKE ON GLAMOUR DESIGNED FOR BOLD, FAST-MOVING FASHION. DUO GLAM BALANCES MINIMALISM WITH STATEMENT, LETTING FORM, TEXTURE, AND ATTITUDE LEAD. THE IDENTITY IS CLEAN, CONFIDENT, AND BUILT TO FEEL LUXURIOUS WITHOUT EXCESS."
    };

    return (
        <>
            <CustomCursor />
            <Navbar />

            <div ref={containerRef} className="bg-[#E9E4D9] text-[#1a1a1a] min-h-screen">

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

                    <div ref={titleRef} className="relative z-10 w-full mix-blend-difference text-[#E9E4D9]">
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
                        <p className="font-abc text-lg max-w-2xl leading-relaxed opacity-75 ">
                            The objective was not decoration, but direction. Every visual decision was driven by ease of recognition, legibility, and mass applicability. The identity system was designed to work seamlessly across packaging, logistics, and digital platforms—clear, efficient, and built to perform in high-volume, real-world environments.
                        </p>
                    </div>
                </section>

                {/* HORIZONTAL GALLERY */}
                <section ref={galleryRef} className="h-screen w-full overflow-hidden flex items-center bg-[#1a1a1a] text-[#E9E4D9]">
                    <div className="flex flex-nowrap h-[80vh] px-20 gap-20">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="gallery-item flex-shrink-0 w-[60vw] md:w-[40vw] h-full relative group overflow-hidden">
                                <img
                                    src={`https://picsum.photos/seed/neo${i}/800/1200`}
                                    alt={`Gallery ${i}`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 pointer-events-none">
                                    <div className="pointer-events-auto">
                                        {/* <MagneticButton className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 uppercase tracking-widest text-sm hover:border-white/50" strength={0.3} fillColor="white" textColor="black">
                                            View Full
                                        </MagneticButton> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* NEXT PROJECT */}
                <section ref={nextProjectRef} className="h-screen flex items-center justify-center bg-[#E9E4D9] relative overflow-hidden group cursor-pointer">
                    <Link to="/case-study-disposek" className="absolute inset-0 z-20" /> {/* Link back to home or next project */}

                    <div className="absolute inset-0 bg-black transform scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-bottom z-0" />

                    <div className="relative z-10 text-center mix-blend-difference text-[#1a1a1a] group-hover:text-[#E9E4D9] transition-colors duration-500">
                        <p className="font-abc uppercase tracking-[0.3em] mb-4">Next Case Study</p>
                        <h2 className="font-albra text-[10vw] leading-none uppercase">
                            Disposek
                        </h2>
                    </div>
                </section>

            </div>
        </>
    );
};

export default CaseStudyDuo;
