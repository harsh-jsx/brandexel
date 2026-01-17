import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import CustomCursor from "../components/CustomCursor";

gsap.registerPlugin(ScrollTrigger);

const Careers = () => {
    const containerRef = useRef(null);
    const heroRef = useRef(null);
    const heroTextRef = useRef(null);
    const valuesRef = useRef(null);
    const rolesRef = useRef(null);

    // State for navbar/cursor color - starts dark (white text on black)
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Background Color Transition
            // Scrolls from Black (Hero) -> Cream (Values) -> Black (Roles)
            const anim = gsap.to(containerRef.current, {
                backgroundColor: "rgb(233, 228, 217)", // Cream
                color: "rgb(10, 10, 10)",
                scrollTrigger: {
                    trigger: valuesRef.current,
                    start: "top 60%",
                    end: "bottom 60%",
                    toggleActions: "play reverse play reverse",
                    onEnter: () => setIsDark(false),
                    onLeave: () => setIsDark(true),
                    onEnterBack: () => setIsDark(false),
                    onLeaveBack: () => setIsDark(true)
                }
            });

            // 2. Hero Text Reveal (Masked Slide Up)
            // We target the inner spans/divs to slide up
            const heroLines = heroTextRef.current.querySelectorAll(".hero-line-inner");
            gsap.from(heroLines, {
                yPercent: 120,
                rotate: 5,
                duration: 1.5,
                stagger: 0.15,
                ease: "power4.out",
                delay: 0.2
            });

            // Hero Description Fade
            gsap.from(".hero-desc", {
                opacity: 0,
                y: 20,
                duration: 1,
                delay: 1,
                ease: "power2.out"
            });

            // 3. Values Section Animations (Staggered Card Entry)
            const valueItems = valuesRef.current.querySelectorAll(".value-item");
            gsap.fromTo(valueItems,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: valuesRef.current,
                        start: "top 75%"
                    }
                }
            );

            // 4. Roles Section Animations (List Reveal)
            const roleItems = rolesRef.current.querySelectorAll(".role-item");
            gsap.fromTo(roleItems,
                { x: -50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: rolesRef.current,
                        start: "top 70%"
                    }
                }
            );

            // Roles Header Reveal
            gsap.from(rolesRef.current.querySelector("h2"), {
                y: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: rolesRef.current,
                    start: "top 80%"
                }
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    const values = [
        { title: "Chaos & Order", desc: "We embrace the messiness of creativity but deliver with surgical precision." },
        { title: "Ego Death", desc: "The best idea wins. Hierarchy is for corporations, not collectives." },
        { title: "Unreasonable", desc: "We set standards that seem impossible to others. Then we meet them." },
        { title: "Play Serious", desc: "We take our fun seriously. Boredom is the enemy of innovation." }
    ];

    const roles = [
        { title: "Senior Art Director", type: "Remote", dept: "Design" },
        { title: "Creative Developer", type: "London / Remote", dept: "Engineering" },
        { title: "Brand Strategist", type: "NY / Remote", dept: "Strategy" },
        { title: "Motion Designer", type: "Remote", dept: "Animation" }
    ];

    const scrollToSection = () => {
        // Placeholder
    };

    return (
        <>
            <CustomCursor isDark={!isDark} />
            <Navbar isDarkMode={isDark} onScrollToSection={scrollToSection} />

            <div ref={containerRef} className="min-h-screen bg-black text-white transition-colors duration-700">

                {/* HERO */}
                <section ref={heroRef} className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-24 relative">
                    <div ref={heroTextRef} className="mb-12">
                        {/* Line 1 */}
                        <div className="overflow-hidden">
                            <h1 className="hero-line-inner font-['Druk'] text-[12vw] md:text-[13vw] leading-[0.9] uppercase tracking-normal">
                                Join The
                            </h1>
                        </div>
                        {/* Line 2 */}
                        <div className="overflow-hidden">
                            <h1 className="hero-line-inner font-['Druk'] text-[12vw] md:text-[13vw] leading-[0.9] uppercase tracking-normal text-[hsl(40,30%,55%)]">
                                Rogue
                            </h1>
                        </div>
                        {/* Line 3 */}
                        <div className="overflow-hidden">
                            <h1 className="hero-line-inner font-['Druk'] text-[12vw] md:text-[13vw] leading-[0.9] uppercase tracking-normal">
                                Movement
                            </h1>
                        </div>
                    </div>

                    <div className="max-w-xl ml-auto mr-12 hero-desc">
                        <p className="font-[PPN] text-xl md:text-3xl leading-relaxed opacity-90">
                            We are not looking for employees. We are looking for obsessed craftspeople who want to build things that shouldn't be possible.
                        </p>
                    </div>
                </section>

                {/* VALUES */}
                <section ref={valuesRef} className="py-32 px-6 md:px-12 lg:px-20 min-h-[80vh]">
                    <div className="mb-24 border-b border-current pb-8 opacity-50">
                        <span className="font-[PPN] uppercase tracking-[0.2em] text-sm">Our DNA</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32">
                        {values.map((item, i) => (
                            <div key={i} className="value-item group">
                                <h3 className="font-['Druk'] text-5xl md:text-7xl mb-8 uppercase group-hover:text-[hsl(40,30%,45%)] transition-colors duration-500">
                                    {item.title}
                                </h3>
                                <p className="font-[PPN] text-xl md:text-2xl max-w-sm leading-relaxed border-l-2 border-current pl-8 group-hover:border-[hsl(40,30%,45%)] transition-colors duration-500 selection:bg-[hsl(40,30%,55%)] selection:text-white">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ROLES */}
                <section ref={rolesRef} className="py-40 px-6 md:px-12 lg:px-20 bg-black text-white rounded-t-[3rem] -mt-10 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-32">
                        <div>
                            <span className="font-[PPN] uppercase tracking-[0.2em] text-sm block mb-6 text-[hsl(40,30%,55%)]">Open Roles</span>
                            <h2 className="font-['Druk'] text-7xl md:text-9xl uppercase leading-none">Your Turn</h2>
                        </div>
                        <p className="font-[PPN] max-w-xs text-white/50 mt-12 md:mt-0 text-lg">
                            Don't see your role? Send us your portfolio anyway. We hire talent, not titles.
                        </p>
                    </div>

                    <div className="border-t border-white/20">
                        {roles.map((role, i) => (
                            <div key={i} className="role-item group flex flex-col md:flex-row justify-between items-start md:items-center py-16 border-b border-white/20 hover:bg-white/5 transition-colors cursor-pointer px-4 relative overflow-hidden">

                                {/* Hover Reveal Background or Glitch Effect could go here */}

                                <div className="relative z-10">
                                    <h4 className="font-['Druk'] text-4xl md:text-6xl mb-3 group-hover:translate-x-4 transition-transform duration-500 ease-out">{role.title}</h4>
                                    <span className="font-[PPN] text-base text-white/50 uppercase tracking-widest">{role.dept}</span>
                                </div>

                                <div className="flex items-center gap-8 mt-6 md:mt-0 relative z-10">
                                    <span className="font-[PPN] border border-white/30 rounded-full px-6 py-2 text-sm group-hover:bg-white group-hover:text-black transition-colors duration-300">{role.type}</span>
                                    <div className="w-16 h-16 rounded-full bg-[hsl(40,30%,55%)] text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-500">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </>
    );
};

export default Careers;
