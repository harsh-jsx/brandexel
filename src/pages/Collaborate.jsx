import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import CustomCursor from "../components/CustomCursor";

gsap.registerPlugin(SplitText);

const InlineInput = ({
    placeholder,
    value,
    onChange,
    index,
    type = "text",
    handleInputFocus,
    handleInputBlur,
    setRef
}) => (
    <span
        ref={(el) => setRef(index, el)}
        className="relative inline-block mx-2"
    >
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => handleInputFocus(index)}
            onBlur={() => handleInputBlur(index)}
            placeholder={placeholder}
            className="bg-transparent border-none outline-none text-secondary 
        placeholder:text-secondary/30 font-serif italic
        min-w-[140px] md:min-w-[200px]
        transition-all duration-300"
            style={{
                width: value ? `${Math.max(value.length * 14, 140)}px` : undefined,
            }}
        />
        <span className="input-line absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-secondary to-secondary/50 transform scale-x-0 origin-left" />
    </span>
);

const InlineSelect = ({ options, value, onChange, index, placeholder, handleInputFocus, handleInputBlur, setRef }) => (
    <span
        ref={(el) => setRef(index, el)}
        className="relative inline-block mx-2"
    >
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => handleInputFocus(index)}
            onBlur={() => handleInputBlur(index)}
            className="bg-black border-none outline-none text-secondary 
        font-serif italic cursor-pointer appearance-none pr-6
        min-w-[140px] md:min-w-[180px]
        transition-all duration-300"
        >
            <option value="" disabled className="bg-background text-white">
                {placeholder}
            </option>
            {options.map((opt) => (
                <option key={opt} value={opt} className="bg-background text-white">
                    {opt}
                </option>
            ))}
        </select>
        <svg
            className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary/50 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
            />
        </svg>
        <span className="input-line absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-secondary to-secondary/50 transform scale-x-0 origin-left" />
    </span>
);

const Collaborate = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const revealRef = useRef(null);
    const headerRef = useRef(null);
    const subheadRef = useRef(null);
    const formLinesRef = useRef([]);
    const inputRefs = useRef([]);
    const magnetRef = useRef(null);
    const footerRef = useRef(null);
    const contactInfoRef = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        contact: "", // Email or WhatsApp
        role: "",
        portfolio: "",
        details: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleInputFocus = (index) => {
        const wrapper = inputRefs.current[index];
        if (wrapper) {
            gsap.to(wrapper.querySelector(".input-line"), {
                scaleX: 1,
                duration: 0.6,
                ease: "power3.out",
            });
            gsap.to(wrapper, {
                y: -2,
                duration: 0.3,
                ease: "power2.out",
            });
        }
    };

    const handleInputBlur = (index) => {
        const wrapper = inputRefs.current[index];
        if (wrapper) {
            const input = wrapper.querySelector("input, textarea, select");
            gsap.to(wrapper, {
                y: 0,
                duration: 0.3,
                ease: "power2.out",
            });
            if (!input?.value) {
                gsap.to(wrapper.querySelector(".input-line"), {
                    scaleX: 0,
                    duration: 0.4,
                    ease: "power2.in",
                });
            }
        }
    };

    const setRef = (index, el) => {
        inputRefs.current[index] = el;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        console.log("Submitting collaboration form:", formData);
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Connect to backend later
        try {
            const response = await fetch('http://localhost:3000/api/collaborate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert("Application submitted! We'll review your portfolio.");
                navigate("/");
            } else {
                // Fallback for now if backend isn't running
                alert("Application submitted! (Frontend simulation)");
            }
        } catch (err) {
            // Fallback for now
            alert("Application submitted! (Frontend simulation)");
        }

        setIsSubmitting(false);
    };

    // Entrance animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Page reveal wipe
            tl.set(revealRef.current, { scaleY: 1, transformOrigin: "top" });
            tl.to(revealRef.current, {
                scaleY: 0,
                duration: 1.2,
                ease: "power4.inOut",
                delay: 0.1,
            });

            // Header split animation with blur
            if (headerRef.current) {
                const headerSplit = new SplitText(headerRef.current, {
                    type: "chars,words,lines",
                    linesClass: "overflow-hidden",
                });
                tl.from(
                    headerSplit.chars,
                    {
                        opacity: 0,
                        y: 120,
                        rotateX: -90,
                        filter: "blur(10px)",
                        stagger: 0.03,
                        duration: 1,
                        ease: "power4.out",
                    },
                    "-=0.5"
                );
            }

            // Subhead animation
            if (subheadRef.current) {
                const subSplit = new SplitText(subheadRef.current, {
                    type: "words",
                    wordsClass: "overflow-hidden inline-block",
                });
                tl.from(
                    subSplit.words,
                    {
                        opacity: 0,
                        y: 40,
                        rotateY: 45,
                        stagger: 0.05,
                        duration: 0.8,
                        ease: "power3.out",
                    },
                    "-=0.6"
                );
            }

            // Form lines with character-by-character reveal
            formLinesRef.current.filter(Boolean).forEach((line, i) => {
                const textNodes = line.querySelectorAll(".form-text font-[PPE]");
                textNodes.forEach((textNode) => {
                    // Basic fade in for robustness if splittext fails for complex nesting
                    gsap.from(textNode, {
                        opacity: 0,
                        y: 20,
                        duration: 0.8,
                        delay: 0.5 + i * 0.1
                    });
                });
            });

            // Magnetic submit button
            tl.from(
                magnetRef.current,
                {
                    opacity: 0,
                    scale: 0.5,
                    rotation: -20,
                    duration: 1,
                    ease: "elastic.out(1, 0.5)",
                },
                "-=0.3"
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Magnetic button effect (Copy from Contact.jsx)
    useEffect(() => {
        const btn = magnetRef.current;
        if (!btn) return;

        const handleMouseMove = (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.4,
                y: y * 0.4,
                duration: 0.4,
                ease: "power2.out",
            });
        };

        const handleMouseLeave = () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: "elastic.out(1, 0.3)",
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

            {/* Reveal overlay */}
            <div
                ref={revealRef}
                className="fixed inset-0 z-[100] bg-secondary pointer-events-none text-white"
            />

            {/* Back button */}
            <button
                onClick={() => navigate("/")}
                className="fixed top-8 left-8 z-50 group flex items-center gap-4"
            >
                <div
                    className="relative w-12 h-12 rounded-full border border-foreground/20 
          flex items-center justify-center overflow-hidden
          group-hover:border-secondary transition-colors duration-500"
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-white relative z-10 transform 
              group-hover:-translate-x-1 transition-transform duration-300"
                    >
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    <div
                        className="absolute inset-0 bg-secondary scale-0 group-hover:scale-100 
            transition-transform duration-500 rounded-full origin-center"
                    />
                </div>
                <span
                    className="text-white/60 text-xs tracking-[0.2em] uppercase
          group-hover:text-white transition-colors duration-300"
                >
                    Back
                </span>
            </button>

            <div
                ref={containerRef}
                className="min-h-screen bg-background relative overflow-hidden"
            >
                {/* Background elements */}
                <div className="fixed inset-0 pointer-events-none">
                    {/* Grid pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.02]"
                        style={{
                            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
                            backgroundSize: "80px 80px",
                        }}
                    />
                </div>

                <div
                    className="relative z-10 min-h-screen flex flex-col justify-center 
          px-8 md:px-16 lg:px-24 xl:px-32 py-32"
                >
                    {/* Header */}
                    <div className="mb-16 md:mb-20">
                        <p className="text-secondary text-xs tracking-[0.4em] uppercase mb-6 font-serif">
                            ✦ Join the Collective
                        </p>
                        <h1
                            ref={headerRef}
                            className="font-[PPE] text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.1]"
                            style={{ perspective: "1000px" }}
                        >
                            Collaborate
                        </h1>
                        <p
                            ref={subheadRef}
                            className="text-white/50 text-lg md:text-xl mt-6 max-w-xl"
                        >
                            We are always looking for exceptional talent to partner with.
                        </p>
                    </div>

                    {/* Conversational Form */}
                    <form onSubmit={handleSubmit} className="max-w-5xl">
                        {/* Line 1 */}
                        <p
                            ref={(el) => (formLinesRef.current[0] = el)}
                            className="text-white/90 text-2xl md:text-3xl lg:text-3xl leading-[1.8] mb-4"
                        >
                            <span className="form-text font-[PPE]">Hi, I'm</span>
                            <InlineInput
                                placeholder="your name"
                                value={formData.name}
                                onChange={(val) => handleChange("name", val)}
                                index={0}
                                handleInputFocus={handleInputFocus}
                                handleInputBlur={handleInputBlur}
                                setRef={setRef}
                            />
                            <span className="form-text font-[PPE]">and I work as a</span>
                            <InlineSelect
                                options={["Photographer", "Videographer", "Designer", "Editor", "Influencer", "Other"]}
                                value={formData.role}
                                onChange={(val) => handleChange("role", val)}
                                index={1}
                                placeholder="select role"
                                handleInputFocus={handleInputFocus}
                                handleInputBlur={handleInputBlur}
                                setRef={setRef}
                            />
                        </p>

                        {/* Line 2 */}
                        <p
                            ref={(el) => (formLinesRef.current[1] = el)}
                            className="text-white/90 text-2xl md:text-3xl lg:text-3xl leading-[1.8] mb-4"
                        >
                            <span className="form-text font-[PPE]">
                                You can see my work here:
                            </span>
                            <InlineInput
                                placeholder="portfolio link (required)"
                                value={formData.portfolio}
                                onChange={(val) => handleChange("portfolio", val)}
                                index={2}
                                handleInputFocus={handleInputFocus}
                                handleInputBlur={handleInputBlur}
                                setRef={setRef}
                            />
                        </p>

                        {/* Line 3 */}
                        <p
                            ref={(el) => (formLinesRef.current[2] = el)}
                            className="text-white/90 text-2xl md:text-3xl lg:text-3xl leading-[1.8] mb-12"
                        >
                            <span className="form-text font-[PPE]">Contact me via</span>
                            <InlineInput
                                placeholder="email or whatsapp"
                                value={formData.contact}
                                onChange={(val) => handleChange("contact", val)}
                                index={3}
                                handleInputFocus={handleInputFocus}
                                handleInputBlur={handleInputBlur}
                                setRef={setRef}
                            />
                        </p>

                        {/* Submit section */}
                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                            <button
                                ref={magnetRef}
                                type="submit"
                                disabled={isSubmitting}
                                className="group relative w-44 h-44 md:w-52 md:h-52"
                            >
                                {/* Rotating text */}
                                <svg
                                    className="absolute inset-0 w-full h-full animate-spin"
                                    style={{ animationDuration: "25s" }}
                                    viewBox="0 0 200 200"
                                >
                                    <defs>
                                        <path
                                            id="circlePathCollaborate"
                                            d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
                                        />
                                    </defs>
                                    <text className="fill-foreground/50 text-[11px] uppercase tracking-[0.5em] font-light">
                                        <textPath href="#circlePathCollaborate">
                                            Join Us • Create Impact • Be Bold •
                                        </textPath>
                                    </text>
                                </svg>

                                {/* Center circle */}
                                <div
                                    className="absolute inset-10 md:inset-12 rounded-full bg-secondary 
                  flex items-center justify-center overflow-hidden
                  group-hover:scale-110 transition-transform duration-700 ease-out
                  shadow-[0_0_40px_rgba(var(--secondary-rgb),0.3)]"
                                >
                                    {isSubmitting ? (
                                        <div
                                            className="w-6 h-6 border-2 border-background border-t-transparent 
                      rounded-full animate-spin"
                                        />
                                    ) : (
                                        <svg
                                            width="28"
                                            height="28"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            className="text-background transform group-hover:translate-x-1 
                        group-hover:-translate-y-1 transition-transform duration-500"
                                        >
                                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                                        </svg>
                                    )}
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Collaborate;
