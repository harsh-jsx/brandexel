import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import MobileNavbar from "./MobileNavbar";
import logo from "../assets/logo.png";

import { useLocation, useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollToPlugin);

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isMobile;
};

const Navbar = ({ isDarkMode = true, onScrollToSection }) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const contentRef = useRef(null);
  const dotsRef = useRef([]);
  const navigate = useNavigate();
  const tlRef = useRef(null);
  const location = useLocation();

  const navItems = [
    { label: "ABOUT", italic: "about", count: "(15)", sectionId: "/about" },
    { label: "WORK", italic: "selected", count: "(15)", sectionId: "selected-works" }, // Swapped CLIENTS for WORK as per context
    { label: "SERVICES", italic: "services", count: "(05)", sectionId: "services1" },
    { label: "CAREERS", italic: "Join Us", count: "(4)", sectionId: "/careers" },
    { label: "CONTACT", italic: "Contact", count: "", sectionId: "/contact" },
  ];

  const handleNavClick = (sectionId) => {
    if (!sectionId) return;

    // Close menu first
    setIsOpen(false);

    setTimeout(() => {
      if (sectionId.startsWith("/")) {
        // Route
        navigate(sectionId);
      } else {
        // Section
        if (location.pathname !== "/") {
          navigate("/", { state: { scrollTo: sectionId } });
        } else {
          if (onScrollToSection) {
            onScrollToSection(sectionId);
          } else {
            const el = document.getElementById(sectionId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    }, 500); // Wait for close animation
  };

  const handleLogoClick = () => {
    setIsOpen(false);
    setTimeout(() => {
      if (location.pathname !== "/") navigate("/");
      else window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  };

  useEffect(() => {
    if (!menuRef.current || !contentRef.current) return;

    // Kill previous timeline
    if (tlRef.current) {
      tlRef.current.kill();
    }

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" }
    });

    tlRef.current = tl;

    if (isOpen) {
      // ===== OPEN SEQUENCE =====
      tl
        // Expand container
        .to(menuRef.current, {
          width: "40vw",
          duration: 0.6
        })
        // Fade dots out
        .to(
          dotsRef.current,
          {
            opacity: 0,
            scale: 0,
            stagger: 0.05,
            duration: 0.25
          },
          "-=0.4"
        )
        // Fade content in
        .fromTo(
          contentRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          "-=0.2"
        );

    } else {
      // ===== CLOSE SEQUENCE =====
      tl
        // Fade content out first
        .to(contentRef.current, {
          opacity: 0,
          duration: 0.25
        })
        // Collapse container
        .to(menuRef.current, {
          width: "60px",
          duration: 0.5
        })
        // Restore dots
        .to(
          dotsRef.current,
          {
            opacity: (i) => (i < 2 ? 0.6 : 0),
            scale: (i) => (i < 2 ? 1 : 0),
            duration: 0.25,
            stagger: 0.05
          },
          "-=0.3"
        );
    }
  }, [isOpen]);

  // Colors based on dark/light mode (when not expanded)
  const closedBgColor = isDarkMode ? "hsl(0, 0%, 0%)" : "rgb(233, 228, 217)";
  const closedFgColor = isDarkMode ? "hsl(0, 0%, 100%)" : "hsl(0, 0%, 10%)";
  const closedBorderColor = isDarkMode ? "hsl(0, 0%, 20%)" : "hsl(0, 0%, 80%)";

  if (isMobile) {
    return <MobileNavbar onScrollToSection={onScrollToSection} navItems={navItems} />;
  }

  return (
    <div
      ref={menuRef}
      className="fixed left-0 top-0 h-screen z-[99999] flex flex-col justify-between overflow-hidden"
      style={{
        width: "60px",
        backgroundColor: isOpen ? "hsl(40, 20%, 95%)" : closedBgColor,
        borderRight: `1px solid ${isOpen ? "hsl(0, 0%, 80%)" : closedBorderColor}`,
        transition: "background-color 0.5s ease, border-color 0.5s ease",
      }}
    >
      {/* Logo */}
      <div className="p-4 flex items-center justify-center cursor-pointer" onClick={handleLogoClick}>
        <img
          src={logo}
          alt=""
          className="object-contain w-8 transition-all duration-500"
          style={{ filter: isDarkMode ? "none" : "invert(1)" }}
        />
      </div>

      {/* Dots Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col items-center gap-1.5 py-4 hover:opacity-70 transition-opacity"
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) dotsRef.current[i] = el;
            }}
            className="w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: isOpen ? "hsl(0, 0%, 10%)" : closedFgColor,
              opacity: isOpen ? 1 : (i < 2 ? 0.6 : 0),
              transform: isOpen ? "scale(1)" : (i >= 2 ? "scale(0)" : "scale(1)"),
              transition: "background-color 0.5s ease",
            }}
          />
        ))}
      </button>

      {/* Start a Project - Magnetic Vertical */}
      <div
        className={`pb-8 flex justify-center cursor-pointer relative z-50 transition-opacity duration-300 ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        onClick={() => navigate("/contact")}
      // onMouseMove={(e) => {
      //   const btn = e.currentTarget;
      //   const rect = btn.getBoundingClientRect();
      //   const x = e.clientX - rect.left - rect.width / 2;
      //   const y = e.clientY - rect.top - rect.height / 2;

      //   // Move button
      //   gsap.to(btn, { x: x * 0.4, y: y * 0.4, duration: 0.5, ease: "power2.out" });

      //   // Move dot
      //   const dot = btn.querySelector('.nav-dot');
      //   if (dot) gsap.to(dot, { x: x * 0.2, y: y * 0.2, duration: 0.5, ease: "power2.out" });
      // }}
      // onMouseLeave={(e) => {
      //   gsap.to([e.currentTarget, e.currentTarget.querySelector('.nav-dot')], {
      //     x: 0,
      //     y: 0,
      //     duration: 0.8,
      //     ease: "elastic.out(1, 0.3)"
      //   });
      // }}
      >
        <span
          className="text-xs tracking-widest uppercase flex items-center gap-2 group"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            color: isOpen ? "hsl(0, 0%, 10%)" : closedFgColor,
            transition: "color 0.5s ease",
          }}
        >
          <span
            className="nav-dot w-2 h-2 rounded-full transition-transform duration-300 group-hover:scale-150 shadow-[0_0_10px_#C02FFB]"
            style={{ backgroundColor: "#C02FFB" }}
          />
          START A PROJECT
        </span>
      </div>

      {/* Expanded Content */}
      <div
        ref={contentRef}
        className={`absolute inset-0 opacity-0 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        style={{ backgroundColor: "hsl(40, 20%, 95%)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <button
            onClick={handleLogoClick}
            className="hover:opacity-70 transition-opacity"
          >
            <img src={logo} alt="" className="h-10 w-10 object-contain" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-xs tracking-widest uppercase flex items-center gap-2 hover:opacity-70 transition-opacity"
            style={{ color: "hsl(0, 0%, 10%)" }}
          >
            CLOSE
            <span className="flex gap-0.5">
              <span className="w-1 h-1 rounded-full bg-current" />
              <span className="w-1 h-1 rounded-full bg-current" />
            </span>
          </button>
        </div>

        {/* Navigation Items with Marquee */}
        <div className="flex flex-col justify-center h-[50vh] px-4 mt-8">
          {navItems.map((item) => (
            <div
              key={item.label}
              onClick={() => handleNavClick(item.sectionId)}
              className="border-t py-4 group cursor-pointer overflow-hidden hover:bg-white/50 transition-colors"
              style={{ borderColor: "hsl(0, 0%, 80%)" }}
            >
              <div className="marquee-container">
                <div className="marquee-content animate-marquee-slow animate-marquee-paused">
                  {[...Array(6)].map((_, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-3 mr-6 whitespace-nowrap"
                    >
                      <span
                        className="font-albra text-3xl md:text-5xl font-light nav-item-text"
                      >
                        {item.label}
                      </span>
                      <span style={{ color: "hsl(0, 0%, 60%)" }}>✦</span>
                      <span
                        className="font-albra text-3xl md:text-5xl italic"
                        style={{ color: "hsl(40, 30%, 55%)" }}
                      >
                        {item.italic}
                      </span>
                      <span style={{ color: "hsl(0, 0%, 60%)" }}>✦</span>
                      <span
                        className="font-albra text-3xl md:text-5xl font-bold nav-item-text"
                      >
                        {item.label}
                      </span>
                      <span style={{ color: "hsl(0, 0%, 60%)" }}>✦</span>
                      <span
                        className="font-albra text-3xl md:text-5xl italic"
                        style={{ color: "hsl(40, 30%, 55%)" }}
                      >
                        {item.italic}
                      </span>
                      {item.count && (
                        <span
                          className="text-xs ml-1"
                          style={{ color: "hsl(0, 0%, 50%)" }}
                        >
                          {item.count}
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="mb-6">
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: "hsl(0, 0%, 50%)" }}
            >
              SAY HELLO
            </span>
            <a
              href="mailto:hello@brandexel.com"
              className="block mt-2 hover:opacity-70 transition-opacity"
              style={{ color: "hsl(0, 0%, 10%)" }}
            >
              hello@brandexel.com
            </a>
          </div>

          {/* <div
            className="flex items-center gap-3 rounded-full px-5 py-3 mb-6"
            style={{ backgroundColor: "hsl(0, 0%, 100%)" }}
          >
            <span style={{ color: "hsl(0, 0%, 40%)" }} className="text-sm">
              Hey pal
            </span>
            <span style={{ color: "hsl(0, 0%, 40%)" }}>→</span>
            <input
              type="email"
              placeholder="enter your email"
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: "hsl(0, 0%, 10%)" }}
            />
            <button
              className="px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider hover:opacity-90 transition-opacity"
              style={{
                backgroundColor: "hsl(40, 30%, 55%)",
                color: "hsl(0, 0%, 10%)",
              }}
            >
              SUBSCRIBE
            </button>
          </div> */}

          <div
            className="flex items-center gap-6 text-xs uppercase tracking-widest"
            style={{ color: "hsl(0, 0%, 40%)" }}
          >
            <a href="#" className="hover:opacity-70 transition-opacity">
              DRIBBBLE
            </a>
            <a href="#" className="hover:opacity-70 transition-opacity">
              BEHANCE
            </a>
            <a href="#" className="hover:opacity-70 transition-opacity">
              TWITTER
            </a>
            <a href="#" className="hover:opacity-70 transition-opacity">
              INSTAGRAM
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
