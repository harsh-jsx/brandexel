import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import CustomCursor from "../components/CustomCursor";
import Footer from "../components/Footer";
import ImageMarquee from "../components/ImageMarquee";
// Video removed
import ScrambleText from "../components/ScrambleText";

gsap.registerPlugin(ScrollTrigger);

// Robust Split Text Component
const SplitText = ({ text, className, type = "char", delay = 0 }) => {
    if (type === "word") {
        return (
            <span className={`inline-block leading-tight ${className}`}>
                {text.split(" ").map((word, i) => (
                    <span key={i} className="word-wrapper inline-block overflow-hidden mr-[0.2em] -mb-[0.2em]">
                        <span className="word inline-block transform translate-y-full">
                            {word}
                        </span>
                    </span>
                ))}
            </span>
        );
    }

    // Char splitting
    return (
        <span className={`inline-block leading-none ${className}`}>
            {text.split("").map((char, i) => (
                <span key={i} className="char-wrapper inline-block overflow-hidden">
                    <span className="char inline-block transform translate-y-full">
                        {char === " " ? "\u00A0" : char}
                    </span>
                </span>
            ))}
        </span>
    );
};

const About = ({ isPreloading }) => {
    const containerRef = useRef(null);
    const heroRef = useRef(null);

    useEffect(() => {
        if (isPreloading) return; // Wait for preloader

        const ctx = gsap.context(() => {

            // 1. HERO ANIMATION
            // Reveal text
            gsap.to(".char", {
                y: 0,
                duration: 1.2,
                stagger: 0.03,
                ease: "power4.out",
                delay: 0.2
            });

            // Reveal Hero Image
            gsap.from(".hero-img", {
                scale: 1.2,
                opacity: 0,
                duration: 1.5,
                ease: "expo.out",
                delay: 0.5
            });

            // Video parallax removed

            // 2. MANIFESTO (Scrub opacity)
            const manifestoText = document.querySelectorAll(".manifesto-word");
            if (manifestoText.length > 0) {
                gsap.fromTo(manifestoText,
                    { opacity: 0.1 },
                    {
                        opacity: 1,
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: ".manifesto-section",
                            start: "top 70%",
                            end: "bottom 60%",
                            scrub: true
                        }
                    }
                );
            }

            // 3. VALUES - Parallax & Fade
            gsap.utils.toArray(".value-card").forEach((card, i) => {
                gsap.from(card, {
                    y: 100,
                    opacity: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%"
                    }
                });
            });

            // 4. PROCESS - Animate items in
            const processItems = gsap.utils.toArray(".process-item");
            if (processItems.length > 0) {
                processItems.forEach((item, i) => {
                    gsap.from(item.querySelector(".p-num"), {
                        scale: 0,
                        opacity: 0,
                        duration: 1,
                        scrollTrigger: {
                            trigger: item,
                            start: "top 80%",
                        }
                    });
                });
            }

            // 5. TEAM - Horizontal Drive
            const teamTrack = document.querySelector(".team-track");
            if (teamTrack) {
                gsap.to(teamTrack, {
                    x: () => -(teamTrack.scrollWidth - window.innerWidth),
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".team-section",
                        start: "top top",
                        end: () => "+=" + teamTrack.scrollWidth,
                        pin: true,
                        scrub: 1
                    }
                });
            }

            // 6. DECORATIVE ELEMENTS - Rotate/Float
            gsap.to(".floating-shape", {
                rotation: 360,
                duration: 20,
                repeat: -1,
                ease: "none"
            });

            gsap.to(".floating-shape-2", {
                y: -30,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

        }, containerRef);

        return () => ctx.revert();
    }, [isPreloading]);

    return (
        <>
            <CustomCursor />
            <Navbar isDarkMode={false} />

            <div ref={containerRef} className="bg-[#101010] text-[#E9E4D9] min-h-screen">

                {/* --- HERO SECTION --- */}
                {/* --- HERO SECTION --- */}
                <section ref={heroRef} className="relative pt-20 md:pt-0 min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 overflow-hidden bg-[#101010]">

                    {/* Background Elements */}
                    <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full border border-[#E9E4D9]/5 animate-spin-slow opacity-30 pointer-events-none"></div>
                    <div className="absolute bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] rounded-full border border-[#E9E4D9]/5 animate-spin-slow opacity-30 pointer-events-none" style={{ animationDirection: 'reverse' }}></div>

                    {/* Text Section */}
                    <div className="relative z-10 flex flex-col items-center justify-center text-center w-full">
                        <div className="flex flex-col items-center justify-center leading-[0.8] tracking-tighter text-[#E9E4D9]">
                            {/* Line 1: WE (Circle) CRAFT */}
                            <div className="flex items-center justify-center gap-2 md:gap-6 w-full">
                                <span className="font-[abc] text-[13.5vw]  md:text-[16vw] uppercase inline-block"><SplitText text="WE" delay={0.1} /></span>

                                <div className="w-[12vw] h-[12vw] md:w-[10vw] md:h-[10vw] rounded-full bg-[#E9E4D9] text-[#101010] flex items-center justify-center rotate-12 shrink-0 mt-[1vw]">
                                    <span className="font-[abc] text-[2.5vw] md:text-[2.5vw] tracking-widest">EST.23</span>
                                </div>

                                <span className="font-[abc] text-[13.5vw] md:text-[16vw] uppercase inline-block"><SplitText text="CRAFT" delay={0.1} /></span>
                            </div>

                            {/* Line 2: DIGITAL */}
                            <div className="font-[abc] text-[13.5vw] md:text-[16vw] uppercase overflow-hidden mt-[-2vw] z-10">
                                <SplitText text="DIGITAL" delay={0.2} />
                            </div>

                            {/* Line 3: LEGACIES (Outlined) */}
                            <div className="font-[abc] text-[13.5vw] md:text-[16vw] uppercase overflow-hidden text-outline-white text-transparent mt-[-2vw] pb-[2vw]">
                                <SplitText text="LEGACIES" delay={0.3} />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-4xl mt-16 md:mt-24 pt-8 border-t border-[#E9E4D9]/20">
                            <p className="font-abc text-sm md:text-base uppercase tracking-widest opacity-60">Global Branding Agency</p>
                            <p className="font-abc max-w-md text-center md:text-right text-lg opacity-80 leading-relaxed mt-4 md:mt-0">
                                Defining the aesthetics of the future web.<br />
                                We merge art, code, and strategy.
                            </p>
                        </div>
                    </div>
                </section>

                {/* --- MANIFESTO SECTION --- */}
                <section className="manifesto-section py-32 md:py-56 px-6 md:px-12 lg:px-20 bg-[#E9E4D9] text-[#1a1a1a] relative overflow-hidden">
                    <div className="absolute top-10 left-10 w-40 h-40 border border-[#1a1a1a]/10 rounded-full floating-shape pointer-events-none" />
                    <div className="max-w-5xl mx-auto relative z-10">
                        <p className="font-[druk] text-4xl md:text-7xl leading-[1.1] uppercase text-center">
                            {/* Manually split for control */}
                            {"Basic exists to be broken. Normal is a curse. We believe that to be seen, you must first have the courage to disappear from the crowd. BrandExel is the glitch in the matrix.".split(" ").map((word, i) => (
                                <span key={i} className="manifesto-word inline-block mr-[0.25em]">{word}</span>
                            ))}
                        </p>
                    </div>
                </section>

                {/* --- VALUES GRID --- */}
                <section className="py-32 px-6 md:px-12 lg:px-20 bg-[#101010] relative overflow-hidden">
                    <div className="mb-24 relative z-10">
                        <span className="font-abc text-[#E9E4D9] uppercase tracking-[0.2em] text-sm opacity-50">Our DNA</span>
                        <h2 className="font-[druk] text-[#E9E4D9] text-6xl md:text-8xl mt-4 uppercase">
                            <ScrambleText text="The Code" className="block" />
                            <ScrambleText text="We Live By" className="block" />
                        </h2>
                    </div>

                    {/* Decorative Background Elements */}
                    <div className="absolute top-20 right-20 w-32 h-32 border border-[#E9E4D9]/20 rounded-full floating-shape pointer-events-none opacity-50" />
                    <div className="absolute bottom-40 left-10 w-24 h-24 border border-[#E9E4D9]/20 rotate-45 floating-shape-2 pointer-events-none opacity-50" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Radical Truth", desc: "No fluff. No jargon. We strip away the excess to find the core message that actually matters." },
                            { title: "Design Chaos", desc: "Order is boring. We embrace controlled chaos to create visual languages that feel alive and unpredictable." },
                            { title: "Speed & Soul", desc: "We move fast, but we never lose the human touch. Technology is the tool, emotion is the goal." }
                        ].map((item, i) => (
                            <div key={i} className="value-card border border-[#E9E4D9]/20 p-10 hover:bg-[#E9E4D9] hover:text-[#101010] transition-colors duration-500 group min-h-[400px] flex flex-col justify-between cursor-default">
                                <span className="font-abc text-sm opacity-50">0{i + 1}</span>
                                <div>
                                    <h3 className="font-[druk] text-6xl mb-6 uppercase">
                                        <ScrambleText text={item.title} />
                                    </h3>
                                    <p className="font-abc text-lg opacity-70 group-hover:opacity-100">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- PROCESS --- */}
                <section className="py-32 bg-[#E9E4D9] text-[#1a1a1a]">
                    <div className="px-6 md:px-12 lg:px-20 mb-20">
                        <h2 className="font-[druk] text-8xl uppercase mb-8">Process</h2>
                    </div>

                    <div className="flex flex-col w-full">
                        {[
                            { step: "01", name: "DISCOVERY", desc: "We dig deep. We ask the uncomfortable questions to find the raw truth of your brand." },
                            { step: "02", name: "DIRECTION", desc: "We set the visual compass. Moodboards, motion tests, and typographic exploration." },
                            { step: "03", name: "DESIGN", desc: "Pixels, vectors, and code. We build the system that will define your future." },
                            { step: "04", name: "DEPLOY", desc: "Launch day. We ensure everything is pixel-perfect and ready for the world." }
                        ].map((p, i) => (
                            <div key={i} className="process-item group relative border-t border-[#1a1a1a]/20 py-16 px-6 md:px-12 lg:px-20 flex flex-col md:flex-row md:items-start gap-10 hover:bg-white transition-colors duration-300">
                                <span className="p-num font-[druk] text-6xl md:text-8xl text-[#1a1a1a]/20 group-hover:text-[#1a1a1a] transition-colors duration-500">{p.step}</span>
                                <div className="flex-1 pt-4">
                                    <h3 className="font-[druk] text-5xl md:text-6xl uppercase mb-4">{p.name}</h3>
                                    <p className="font-abc text-xl max-w-lg opacity-70">{p.desc}</p>
                                </div>
                                <div className="hidden md:block w-32 h-32 rounded-full border border-[#1a1a1a]/20 group-hover:bg-[#1a1a1a] group-hover:text-[#E9E4D9] transition-all duration-500 flex items-center justify-center">
                                    <span className="font-abc text-2xl">↓</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- TEAM HORIZONTAL --- */}
                <section className="team-section h-screen bg-[#101010] text-[#E9E4D9] overflow-hidden flex flex-col justify-center">
                    <div className="px-6 md:px-12 lg:px-20 mb-12">
                        <h2 className="font-[druk] md:text-[8vw] text-[15vw] uppercase leading-none pt-12">The<br />Outlaws</h2>
                    </div>

                    <div className="team-track flex gap-10 px-6 md:px-12 lg:px-20 w-fit">
                        {[
                            { name: "ALEX", img: "https://picsum.photos/seed/alex/500/700" },
                            { name: "SARAH", img: "https://picsum.photos/seed/sarah/500/700" },
                            { name: "MARCUS", img: "https://picsum.photos/seed/marcus/500/700" },
                            { name: "ELENA", img: "https://picsum.photos/seed/elena/500/700" },
                            { name: "JAY", img: "https://picsum.photos/seed/jay/500/700" },
                        ].map((m, i) => (
                            <div key={i} className="relative w-[300px] md:w-[400px] flex-shrink-0 group">
                                <div className="w-full aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                                    <img src={m.img} alt={m.name} className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700" />
                                </div>
                                <div className="mt-4 border-t border-[#E9E4D9] pt-2 flex justify-between items-baseline">
                                    <span className="font-[druk] text-4xl uppercase">{m.name}</span>
                                    <span className="font-abc text-sm opacity-50">0{i + 1}</span>
                                </div>
                            </div>
                        ))}
                        {/* End spacer */}
                        <div className="w-[100px] flex-shrink-0" />
                    </div>
                </section>

            </div>
        </>
    );
};

export default About;
