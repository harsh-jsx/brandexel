import { useRef, useEffect } from "react";
import gsap from "gsap";

const PageTransition = ({ children }) => {
    const curtainRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Set initial state - Curtain covers everything
            gsap.set(curtainRef.current, {
                height: "100%",
                transformOrigin: "bottom center" // We want it to sink down, or rise up?
                // Let's do a "Curtain Rise" (Reveal from bottom) -> Origin Top, ScaleY 0
                // OR "Curtain Drop" (Reveal from top) -> Origin Bottom, ScaleY 0
                // Elegant is usually "Rise" (Top origin, scaleY 0)
            });

            // Animation
            gsap.to(curtainRef.current, {
                height: "0%",
                duration: 1.2,
                ease: "power4.inOut",
                delay: 0.1,
                transformOrigin: "top center" // Ensures it shrinks upwards
            });

        }, containerRef);

        // Provide a small fade-in for content to avoid instant flash if curtain lags (rare but safe)
        gsap.fromTo(containerRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, delay: 0.2 }
        );

        // Scroll to top on mount (handled by Lenis in App.jsx usually, but good to enforce)
        window.scrollTo(0, 0);

        return () => ctx.revert();
    }, []);

    return (
        <div className="relative w-full min-h-screen">
            {/* The Curtain Overlay - High Z-index */}
            <div
                ref={curtainRef}
                className="fixed inset-0 z-[9999] bg-[hsl(40,30%,55%)] pointer-events-none w-full"
                style={{ height: "100%" }}
            >
                {/* Optional Branding or Loader in the curtain? */}
            </div>

            {/* The Page Content */}
            <div ref={containerRef} className="opacity-0">
                {children}
            </div>
        </div>
    );
};

export default PageTransition;
