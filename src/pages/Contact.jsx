import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import CustomCursor from "../components/CustomCursor";

gsap.registerPlugin(SplitText);

// Moved outside to prevent re-creation on every render
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

const Contact = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const revealRef = useRef(null);
  const headerRef = useRef(null);
  const subheadRef = useRef(null);
  const formLinesRef = useRef([]);
  const inputRefs = useRef([]);
  const footerRef = useRef(null);
  const contactInfoRef = useRef(null);

  const [formType, setFormType] = useState("client"); // "client" | "creator"

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    goal: "",
    timeline: "",
    budget: "",
    email: "",
    details: "",
  });

  const [creatorData, setCreatorData] = useState({
    name: "",
    skill: "",
    portfolio: "",
    experience: "",
    email: "",
    whyBrandexel: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    if (formType === "client") {
      setFormData((prev) => ({ ...prev, [field]: value }));
    } else {
      setCreatorData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dataToSend = formType === "client" ? formData : creatorData;
    const endpoint = formType === "client" ? "/api/contact" : "/api/collaborate";

    try {
      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
      if (response.ok) {
        alert("Thank you! We'll be in touch within 24 hours.");
      } else {
        alert("Thank you! (Simulation - Backend not responding)");
      }
    } catch (err) {
      alert("Thank you! (Simulation - Backend not responding)");
    }

    setIsSubmitting(false);
    if (formType === "client") {
      setFormData({
        name: "",
        company: "",
        goal: "",
        timeline: "",
        budget: "",
        email: "",
        details: "",
      });
    } else {
      setCreatorData({
        name: "",
        skill: "",
        portfolio: "",
        experience: "",
        email: "",
        whyBrandexel: "",
      });
    }
  };

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

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
          const split = new SplitText(textNode, {
            type: "chars,words",
            charsClass: "inline-block",
          });
          tl.from(
            split.chars,
            {
              opacity: 0,
              y: 60,
              rotateX: -45,
              filter: "blur(4px)",
              stagger: 0.015,
              duration: 0.6,
              ease: "power3.out",
            },
            `-=${0.45 + i * 0.05}`
          );
        });
      });

      // Contact info
      if (contactInfoRef.current) {
        const infoItems = contactInfoRef.current.querySelectorAll(".info-item");
        infoItems.forEach((item, i) => {
          const label = item.querySelector(".info-label");
          const value = item.querySelector(".info-value");

          if (label) {
            tl.from(
              label,
              {
                opacity: 0,
                x: -30,
                duration: 0.5,
                ease: "power2.out",
              },
              `-=${0.4 - i * 0.05}`
            );
          }
          if (value) {
            const valueSplit = new SplitText(value, { type: "chars" });
            tl.from(
              valueSplit.chars,
              {
                opacity: 0,
                y: 30,
                rotateY: 90,
                stagger: 0.02,
                duration: 0.5,
                ease: "power3.out",
              },
              "-=0.3"
            );
          }
        });
      }

      // Footer
      if (footerRef.current) {
        const footerSplit = new SplitText(footerRef.current, { type: "words" });
        tl.from(
          footerSplit.words,
          {
            opacity: 0,
            y: 20,
            stagger: 0.03,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.2"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [formType]); // Re-run animation when form type changes



  // Input focus animation
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



  return (
    <>
      <CustomCursor />

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

          {/* Corner accents */}
          <div
            className="absolute top-0 right-0 w-[40vw] h-[40vh] 
            bg-gradient-to-bl from-secondary/5 to-transparent"
          />
          <div
            className="absolute bottom-0 left-0 w-[30vw] h-[30vh] 
            bg-gradient-to-tr from-secondary/3 to-transparent"
          />
        </div>

        <div
          className="relative z-10 min-h-screen flex flex-col justify-center 
          px-8 md:px-16 lg:px-24 xl:px-32 py-32"
        >
          {/* Toggle Switch */}
          <div className="flex gap-6 mb-12">
            <button
              onClick={() => setFormType("client")}
              className={`text-sm tracking-[0.2em] uppercase transition-all duration-300 relative
                ${formType === "client" ? "text-white" : "text-white/40 hover:text-white/70"}`}
            >
              For Clients
              {formType === "client" && (
                <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-secondary" />
              )}
            </button>
            <button
              onClick={() => setFormType("creator")}
              className={`text-sm tracking-[0.2em] uppercase transition-all duration-300 relative
                ${formType === "creator" ? "text-white" : "text-white/40 hover:text-white/70"}`}
            >
              For Creators
              {formType === "creator" && (
                <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-secondary" />
              )}
            </button>
          </div>

          {/* Header */}
          <div className="mb-16 md:mb-20">
            <p className="text-secondary text-xs tracking-[0.4em] uppercase mb-6 font-serif">
              {formType === "client" ? "✦ Let's Create Together" : "✦ Join the Team"}
            </p>
            <h1
              ref={headerRef}
              key={formType} // Re-trigger animation on change
              className="font-[PPE] text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.1]"
              style={{ perspective: "1000px" }}
            >
              {formType === "client" ? "Start a Project" : "Work With Us"}
            </h1>
            <p
              ref={subheadRef}
              key={`${formType}-sub`}
              className="text-white/50 text-lg md:text-xl mt-6 max-w-xl"
            >
              {formType === "client"
                ? "Tell us about your vision and we'll bring it to life."
                : "We're always looking for talented creators to join our network."}
            </p>
          </div>

          {/* Conversational Form */}
          <form onSubmit={handleSubmit} className="max-w-5xl">
            {formType === "client" ? (
              // CLIENT FORM
              <>
                {/* Line 1 */}
                <p
                  ref={(el) => (formLinesRef.current[0] = el)}
                  className="text-white/90 text-2xl md:text-3xl lg:text-4xl leading-[1.8] mb-4"
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
                  <span className="form-text font-[PPE]">from</span>
                  <InlineInput
                    placeholder="company name"
                    value={formData.company}
                    onChange={(val) => handleChange("company", val)}
                    index={1}
                    handleInputFocus={handleInputFocus}
                    handleInputBlur={handleInputBlur}
                    setRef={setRef}
                  />
                </p>

                {/* Line 2 */}
                <p
                  ref={(el) => (formLinesRef.current[1] = el)}
                  className="text-white/90 text-2xl md:text-3xl lg:text-4xl leading-[1.8] mb-4"
                >
                  <span className="form-text font-[PPE]">
                    I'm looking for a partner to help me with
                  </span>
                  <InlineInput
                    placeholder="your project goal"
                    value={formData.goal}
                    onChange={(val) => handleChange("goal", val)}
                    index={2}
                    handleInputFocus={handleInputFocus}
                    handleInputBlur={handleInputBlur}
                    setRef={setRef}
                  />
                </p>

                {/* Line 3 */}
                <p
                  ref={(el) => (formLinesRef.current[2] = el)}
                  className="text-white/90 text-2xl md:text-3xl lg:text-4xl leading-[1.8] mb-4"
                >
                  <span className="form-text font-[PPE]">
                    I'd like to complete this project within
                  </span>
                  <InlineSelect
                    className="bg-black text-white"
                    options={["1 month", "2-3 months", "3-6 months", "6+ months"]}
                    value={formData.timeline}
                    onChange={(val) => handleChange("timeline", val)}
                    index={3}
                    placeholder="timeline"
                    handleInputFocus={handleInputFocus}
                    handleInputBlur={handleInputBlur}
                    setRef={setRef}
                  />
                </p>

                {/* Line 4 */}
                <p
                  ref={(el) => (formLinesRef.current[3] = el)}
                  className="text-white/90 text-2xl md:text-3xl lg:text-4xl leading-[1.8] mb-4"
                >
                  <span className="form-text font-[PPE]">
                    and my budget is around
                  </span>
                  <InlineSelect
                    options={[
                      "$5K - $15K",
                      "$15K - $50K",
                      "$50K - $100K",
                      "$100K+",
                    ]}
                    value={formData.budget}
                    onChange={(val) => handleChange("budget", val)}
                    index={4}
                    placeholder="budget range"
                    handleInputFocus={handleInputFocus}
                    handleInputBlur={handleInputBlur}
                    setRef={setRef}
                  />
                </p>

                {/* Line 5 */}
                <p
                  ref={(el) => (formLinesRef.current[4] = el)}
                  className="text-white/90 text-2xl md:text-3xl lg:text-4xl leading-[1.8] mb-8"
                >
                  <span className="form-text font-[PPE]">You can reach me at</span>
                  <InlineInput
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(val) => handleChange("email", val)}
                    index={5}
                    type="email"
                    handleInputFocus={handleInputFocus}
                    handleInputBlur={handleInputBlur}
                    setRef={setRef}
                  />
                </p>

                {/* Optional details */}
                <div ref={(el) => (formLinesRef.current[5] = el)} className="mb-12">
                  <p className="form-text font-[PPE] text-white/60 text-lg md:text-xl mb-4">
                    Optionally, share more about your project:
                  </p>
                  <div
                    ref={(el) => (inputRefs.current[6] = el)}
                    className="relative max-w-2xl"
                  >
                    <textarea
                      value={formData.details}
                      onChange={(e) => handleChange("details", e.target.value)}
                      onFocus={() => handleInputFocus(6)}
                      onBlur={() => handleInputBlur(6)}
                      placeholder="Additional details, links, inspiration..."
                      rows={3}
                      className="w-full bg-foreground/[0.02] border border-foreground/10 font-[PPE] rounded-xl
                        text-white/80 text-lg placeholder:text-white
                        p-5 outline-none resize-none 
                        focus:border-secondary/30 focus:bg-foreground/[0.04]
                        transition-all duration-500"
                    />
                    <span className="input-line absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-secondary to-secondary/50 transform scale-x-0 origin-left rounded-full" />
                  </div>
                </div>
              </>
            ) : (
              // CREATOR FORM
              <>
                {/* Line 1 */}
                <p
                  ref={(el) => (formLinesRef.current[0] = el)}
                  className="text-white/90 text-2xl md:text-3xl lg:text-4xl leading-[1.8] mb-4"
                >
                  <span className="form-text font-[PPE]">Hi, I'm</span>
                  <InlineInput
                    placeholder="your name"
                    value={creatorData.name}
                    onChange={(val) => handleChange("name", val)}
                    index={0}
                    handleInputFocus={handleInputFocus}
                    handleInputBlur={handleInputBlur}
                    setRef={setRef}
                  />
                  <span className="form-text font-[PPE]">and I specialize in</span>
                  <InlineInput
                    placeholder="skill (e.g. Design)"
                    value={creatorData.skill}
                    onChange={(val) => handleChange("skill", val)}
                    index={1}
                    handleInputFocus={handleInputFocus}
                    handleInputBlur={handleInputBlur}
                    setRef={setRef}
                  />
                </p>

                {/* Line 2 */}
                <p
                  ref={(el) => (formLinesRef.current[1] = el)}
                  className="text-white/90 text-2xl md:text-3xl lg:text-4xl leading-[1.8] mb-4"
                >
                  <span className="form-text font-[PPE]">
                    You can check out my work at
                  </span>
                  <InlineInput
                    placeholder="portfolio/social link"
                    value={creatorData.portfolio}
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
                  className="text-white/90 text-2xl md:text-3xl lg:text-4xl leading-[1.8] mb-4"
                >
                  <span className="form-text font-[PPE]">
                    I have
                  </span>
                  <InlineSelect
                    className="bg-black text-white"
                    options={["0-1 years", "1-3 years", "3-5 years", "5+ years"]}
                    value={creatorData.experience}
                    onChange={(val) => handleChange("experience", val)}
                    index={3}
                    placeholder="experience level"
                    handleInputFocus={handleInputFocus}
                    handleInputBlur={handleInputBlur}
                    setRef={setRef}
                  />
                  <span className="form-text font-[PPE]">of experience.</span>
                </p>

                {/* Line 4 */}
                <p
                  ref={(el) => (formLinesRef.current[3] = el)}
                  className="text-white/90 text-2xl md:text-3xl lg:text-4xl leading-[1.8] mb-8"
                >
                  <span className="form-text font-[PPE]">Contact me at</span>
                  <InlineInput
                    placeholder="email@example.com"
                    value={creatorData.email}
                    onChange={(val) => handleChange("email", val)}
                    index={4}
                    type="email"
                    handleInputFocus={handleInputFocus}
                    handleInputBlur={handleInputBlur}
                    setRef={setRef}
                  />
                </p>

                {/* Why Brandexel */}
                <div ref={(el) => (formLinesRef.current[4] = el)} className="mb-12">
                  <p className="form-text font-[PPE] text-white/60 text-lg md:text-xl mb-4">
                    Why do you want to join Brandexel?
                  </p>
                  <div
                    ref={(el) => (inputRefs.current[5] = el)}
                    className="relative max-w-2xl"
                  >
                    <textarea
                      value={creatorData.whyBrandexel}
                      onChange={(e) => handleChange("whyBrandexel", e.target.value)}
                      onFocus={() => handleInputFocus(5)}
                      onBlur={() => handleInputBlur(5)}
                      placeholder="Tell us what drives you..."
                      rows={3}
                      className="w-full bg-foreground/[0.02] border border-foreground/10 font-[PPE] rounded-xl
                        text-white/80 text-lg placeholder:text-white
                        p-5 outline-none resize-none 
                        focus:border-secondary/30 focus:bg-foreground/[0.04]
                        transition-all duration-500"
                    />
                    <span className="input-line absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-secondary to-secondary/50 transform scale-x-0 origin-left rounded-full" />
                  </div>
                </div>
              </>
            )}

            {/* Submit section */}
            <div className="flex flex-col md:flex-row items-center justify-center mt-20">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative px-12 py-5 bg-white rounded-full overflow-hidden transition-transform duration-300 hover:scale-105"
              >
                {/* Hover fill effect */}
                <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]" />

                <div className="relative z-10 flex items-center gap-4">
                  <span className="font-[PPE] text-lg uppercase tracking-wider text-black group-hover:text-white transition-colors duration-300">
                    {isSubmitting ? "Sending..." : "Submit Inquiry"}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-black group-hover:bg-white transition-colors duration-300" />
                </div>
              </button>
            </div>

            {/* Contact info */}
            <div ref={contactInfoRef} className="flex flex-col md:flex-row justify-between gap-12 border-t border-white/10 pt-12 mt-20">
              <div className="info-item">
                <p className="info-label text-white/40 text-xs tracking-[0.2em] uppercase mb-2">
                  Email
                </p>
                <a
                  href="mailto:hello@brandexel.com"
                  className="info-value text-white hover:text-secondary transition-colors duration-300 text-xl font-serif"
                >
                  hello@brandexel.com
                </a>
              </div>
              <div className="info-item">
                <p className="info-label text-white/40 text-xs tracking-[0.2em] uppercase mb-2">
                  Phone
                </p>
                <a
                  href="tel:+12345678901"
                  className="info-value text-white hover:text-secondary transition-colors duration-300 text-xl font-serif"
                >
                  +1 (234) 567-8901
                </a>
              </div>
              <div className="info-item">
                <p className="info-label text-white/40 text-xs tracking-[0.2em] uppercase mb-2">
                  Address
                </p>
                <p className="info-value text-white/70 text-xl font-serif">
                  123 Creative Ave, NYC
                </p>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-24 pt-12 border-t border-foreground/10">
            <p ref={footerRef} className="text-white/30 text-sm">
              © 2024 Brandexel. All rights reserved. We typically respond within
              24 hours.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
