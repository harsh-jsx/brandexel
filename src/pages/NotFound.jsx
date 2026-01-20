import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import CustomCursor from "../components/CustomCursor";

gsap.registerPlugin(SplitText);

const NotFound = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const btnRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Title Animation
            const titleSplit = new SplitText(titleRef.current, { type: "chars" });
            tl.from(titleSplit.chars, {
                y: 100,
                opacity: 0,
                rotateX: -90,
                stagger: 0.05,
                duration: 1,
                ease: "power4.out",
            });

            // Text Animation
            tl.from(textRef.current, {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
            }, "-=0.5");

            // Button Animation
            tl.from(btnRef.current, {
                scale: 0,
                opacity: 0,
                duration: 0.8,
                ease: "elastic.out(1, 0.5)",
            }, "-=0.6");

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Magnetic Button Logic
    useEffect(() => {
        const btn = btnRef.current;
        if (!btn) return;

        const handleMouseMove = (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: "power2.out",
            });
        };

        const handleMouseLeave = () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: "elastic.out(1, 0.4)",
            });
        };

        btn.addEventListener("mousemove", handleMouseMove);
        btn.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            btn.removeEventListener("mousemove", handleMouseMove);
            btn.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <>
            <CustomCursor />
            <div
                ref={containerRef}
                className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden text-center px-4"
            >
                {/* Background Gradients */}
                <div className="absolute top-0 right-0 w-[40vw] h-[40vh] bg-gradient-to-bl from-secondary/10 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-gradient-to-tr from-secondary/5 to-transparent pointer-events-none" />

                {/* Content */}
                <div className="relative z-10">
                    <h1
                        ref={titleRef}
                        className="font-[PPE] text-[12rem] md:text-[20rem] leading-[0.8] text-white select-none"
                    >
                        404
                    </h1>
                    <p
                        ref={textRef}
                        className="text-white/60 text-xl md:text-2xl font-light tracking-wide mt-8 mb-12"
                    >
                        The page you're looking for went off-script.
                    </p>

                    <Link to="/">
                        <button
                            ref={btnRef}
                            className="relative w-40 h-40 rounded-full border border-white/20 
              flex items-center justify-center group overflow-hidden bg-transparent"
                        >
                            <div className="absolute inset-0 bg-secondary scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                            <span className="relative z-10 text-white text-sm uppercase tracking-widest font-medium mix-blend-difference">
                                Go Home
                            </span>
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default NotFound;
