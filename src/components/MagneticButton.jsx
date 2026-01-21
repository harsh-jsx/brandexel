import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const MagneticButton = ({
    children,
    onClick,
    className = "",
    strength = 0.5,
    fillColor = "hsl(40, 30%, 55%)",
    textColor = "black"
}) => {
    const btnRef = useRef(null);
    const fillRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const btn = btnRef.current;
        const fill = fillRef.current;
        const text = textRef.current;
        if (!btn || !fill) return;

        const handleMouseMove = (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Move button (Magnetic)
            gsap.to(btn, {
                x: x * strength,
                y: y * strength,
                duration: 0.5,
                ease: "power2.out",
            });

            // Move fill circle (Parallax within button)
            gsap.to(fill, {
                x: x * 0.2, // Slight lag for depth
                y: y * 0.2,
                duration: 0.5,
                ease: "power2.out",
            });

            // Move text (Opposite or slight lag)
            if (text) {
                gsap.to(text, {
                    x: x * 0.1,
                    y: y * 0.1,
                    duration: 0.5,
                    ease: "power2.out",
                });
            }
        };

        const handleMouseLeave = () => {
            gsap.to([btn, fill, text], {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: "elastic.out(1, 0.3)",
            });
        };

        const handleMouseEnter = (e) => {
            // Position fill circle at mouse entry point for ripple effect
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            gsap.set(fill, { left: x, top: y, xPercent: -50, yPercent: -50 });
            gsap.to(fill, { scale: 3, duration: 0.6, ease: "power2.out" });
        };

        const handleMouseExitFill = () => {
            gsap.to(fill, { scale: 0, duration: 0.5, ease: "power2.in" });
        }

        btn.addEventListener("mousemove", handleMouseMove);
        btn.addEventListener("mouseleave", handleMouseLeave);
        btn.addEventListener("mouseenter", handleMouseEnter);
        btn.addEventListener("mouseleave", handleMouseExitFill);

        return () => {
            btn.removeEventListener("mousemove", handleMouseMove);
            btn.removeEventListener("mouseleave", handleMouseLeave);
            btn.removeEventListener("mouseenter", handleMouseEnter);
            btn.removeEventListener("mouseleave", handleMouseExitFill);
        };
    }, [strength]);

    return (
        <button
            ref={btnRef}
            onClick={onClick}
            className={`relative overflow-hidden rounded-full group cursor-pointer ${className}`}
        >
            {/* Fill Circle */}
            <div
                ref={fillRef}
                className="absolute w-full aspect-square rounded-full pointer-events-none transform scale-0 z-0 origin-center"
                style={{ backgroundColor: fillColor, width: '150%' }}
            />

            {/* Content */}
            <div ref={textRef} className="relative z-10 transition-colors duration-300" style={{ color: "inherit" }}>
                {children}
            </div>
        </button>
    );
};

export default MagneticButton;
