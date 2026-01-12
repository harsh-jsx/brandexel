import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import MobileNavbar from "./MobileNavbar";
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
// const MobileNavbar = ({ onScrollToSection }) => {
//   const [open, setOpen] = useState(false);
//   const overlayRef = useRef(null);
//   const itemsRef = useRef([]);

//   useEffect(() => {
//     if (!open) return;

//     gsap.fromTo(
//       overlayRef.current,
//       { yPercent: -100 },
//       {
//         yPercent: 0,
//         duration: 0.8,
//         ease: "power4.inOut",
//       }
//     );

//     gsap.fromTo(
//       itemsRef.current,
//       { y: 60, opacity: 0 },
//       {
//         y: 0,
//         opacity: 1,
//         stagger: 0.08,
//         delay: 0.3,
//         duration: 0.8,
//         ease: "power4.out",
//       }
//     );
//   }, [open]);

//   const navItems = [
//     { label: "Work", sectionId: "about" },
//     { label: "Ideas", sectionId: null },
//     { label: "Contact", sectionId: null },
//   ];

//   const handleClick = (id) => {
//     setOpen(false);
//     if (id && onScrollToSection) {
//       setTimeout(() => onScrollToSection(id), 500);
//     }
//   };

//   return (
//     <>
//       {/* Top Bar */}
//       <div className="fixed top-0 left-0 right-0 z-50 bg-black px-5 py-4 flex justify-between items-center">
//         <span className="text-white font-serif text-lg">BRANDEXEL</span>
//         <button
//           onClick={() => setOpen(true)}
//           className="text-white text-xs tracking-widest uppercase"
//         >
//           MENU
//         </button>
//       </div>

//       {/* Overlay */}
//       {open && (
//         <div
//           ref={overlayRef}
//           className="fixed inset-0 z-[100] bg-[hsl(40,20%,95%)] flex flex-col justify-center px-8"
//         >
//           <button
//             onClick={() => setOpen(false)}
//             className="absolute top-6 right-6 text-xs tracking-widest uppercase text-black"
//           >
//             CLOSE
//           </button>

//           <nav className="space-y-8">
//             {navItems.map((item, i) => (
//               <div
//                 key={item.label}
//                 ref={(el) => (itemsRef.current[i] = el)}
//                 onClick={() => handleClick(item.sectionId)}
//                 className="cursor-pointer"
//               >
//                 <h2 className="font-serif text-5xl tracking-tight text-black">
//                   {item.label}
//                 </h2>
//               </div>
//             ))}
//           </nav>

//           <div className="absolute bottom-8 left-8 text-xs uppercase tracking-widest text-black/50">
//             hello@rogue.studio
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

const Navbar = ({ isDarkMode = true, onScrollToSection }) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const contentRef = useRef(null);
  const dotsRef = useRef([]);

  const navItems = [
    { label: "WORK", italic: "Work", count: "(15)", sectionId: "about" },
    {
      label: "IDEAS",
      italic: "Ideas",
      count: "(05)",
      subtitle: "[Coming Soon]",
      sectionId: null,
    },
    { label: "CONTACT", italic: "Contact", count: "", sectionId: null },
  ];

  const handleNavClick = (sectionId) => {
    if (sectionId && onScrollToSection) {
      setIsOpen(false);
      setTimeout(() => onScrollToSection(sectionId), 300);
    }
  };

  const handleLogoClick = () => {
    setIsOpen(false);
    setTimeout(() => {
      if (onScrollToSection) {
        onScrollToSection("hero");
      }
    }, 300);
  };

  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        width: "40vw",
        duration: 0.6,
        ease: "power3.inOut",
      });
      gsap.to(contentRef.current, { opacity: 1, duration: 0.4, delay: 0.3 });
      dotsRef.current.forEach((dot, i) => {
        if (dot) {
          gsap.to(dot, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            delay: 0.2 + i * 0.05,
            ease: "back.out(2)",
          });
        }
      });
    } else {
      gsap.to(contentRef.current, { opacity: 0, duration: 0.2 });
      gsap.to(menuRef.current, {
        width: "60px",
        duration: 0.5,
        ease: "power3.inOut",
        delay: 0.1,
      });
      dotsRef.current.forEach((dot, i) => {
        if (dot && i >= 2) {
          gsap.to(dot, { opacity: 0, scale: 0, duration: 0.2 });
        }
      });
    }
  }, [isOpen]);

  // Colors based on dark/light mode (when not expanded)
  const closedBgColor = isDarkMode ? "hsl(0, 0%, 0%)" : "rgb(233, 228, 217)";
  const closedFgColor = isDarkMode ? "hsl(0, 0%, 100%)" : "hsl(0, 0%, 10%)";
  const closedBorderColor = isDarkMode ? "hsl(0, 0%, 20%)" : "hsl(0, 0%, 80%)";

  // Logo SVG Component
  const Logo = ({ color }) => (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      style={{ color }}
    >
      <path
        d="M14 2C7.373 2 2 7.373 2 14s5.373 12 12 12 12-5.373 12-12S20.627 2 14 2zm0 22c-5.523 0-10-4.477-10-10S8.477 4 14 4s10 4.477 10 10-4.477 10-10 10z"
        fill="currentColor"
      />
      <path
        d="M14 8c-3.314 0-6 2.686-6 6s2.686 6 6 6c1.5 0 2.5-1 2.5-1"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
  if (isMobile) {
    return <MobileNavbar onScrollToSection={onScrollToSection} />;
  }
  return (
    <div
      ref={menuRef}
      className="fixed  left-0 top-0 h-screen z-50 flex flex-col justify-between overflow-hidden"
      style={{
        width: "60px",
        backgroundColor: isOpen ? "hsl(40, 20%, 95%)" : closedBgColor,
        borderRight: `1px solid ${
          isOpen ? "hsl(0, 0%, 80%)" : closedBorderColor
        }`,
        transition: "background-color 0.5s ease, border-color 0.5s ease",
      }}
    >
      {/* Logo */}
      <div className="p-4 flex items-center justify-center">
        <Logo color={isOpen ? "hsl(0, 0%, 10%)" : closedFgColor} />
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
              opacity: i < 2 ? 0.6 : 0,
              transform: i >= 2 ? "scale(0)" : "scale(1)",
              transition: "background-color 0.5s ease",
            }}
          />
        ))}
      </button>

      {/* Start a Project */}
      <div className="pb-8 flex justify-center">
        <span
          className="text-xs tracking-widest uppercase flex items-center gap-2"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            color: isOpen ? "hsl(0, 0%, 10%)" : closedFgColor,
            transition: "color 0.5s ease",
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "hsl(40, 30%, 55%)" }}
          />
          START A PROJECT
        </span>
      </div>

      {/* Expanded Content */}
      <div
        ref={contentRef}
        className={`absolute inset-0 opacity-0 ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ backgroundColor: "hsl(40, 20%, 95%)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <button
            onClick={handleLogoClick}
            className="hover:opacity-70 transition-opacity"
          >
            <Logo color="hsl(0, 0%, 10%)" />
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
              className={`border-t py-4 group cursor-pointer overflow-hidden ${
                item.subtitle
                  ? "opacity-40 pointer-events-none"
                  : "hover:opacity-80"
              }`}
              style={{ borderColor: "hsl(0, 0%, 80%)" }}
            >
              <div className="marquee-container">
                <div className="marquee-content animate-marquee-slow group-hover:animate-marquee">
                  {[...Array(6)].map((_, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-3 mr-6 whitespace-nowrap"
                    >
                      <span
                        className="font-serif text-3xl md:text-5xl font-light"
                        style={{
                          color: "hsl(0, 0%, 50%)",
                          WebkitTextStroke: "1px hsl(0, 0%, 50%)",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {item.label}
                      </span>
                      <span style={{ color: "hsl(0, 0%, 60%)" }}>✦</span>
                      <span
                        className="font-serif text-3xl md:text-5xl italic"
                        style={{ color: "hsl(40, 30%, 55%)" }}
                      >
                        {item.italic}
                      </span>
                      <span style={{ color: "hsl(0, 0%, 60%)" }}>✦</span>
                      <span
                        className="font-serif text-3xl md:text-5xl font-bold"
                        style={{ color: "hsl(0, 0%, 20%)" }}
                      >
                        {item.label}
                      </span>
                      <span style={{ color: "hsl(0, 0%, 60%)" }}>✦</span>
                      <span
                        className="font-serif text-3xl md:text-5xl italic"
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
              {item.subtitle && (
                <span
                  className="text-xs mt-1 block"
                  style={{ color: "hsl(0, 0%, 50%)" }}
                >
                  {item.subtitle}
                </span>
              )}
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
              href="mailto:hello@rogue.studio"
              className="block mt-2 hover:opacity-70 transition-opacity"
              style={{ color: "hsl(0, 0%, 10%)" }}
            >
              hello@rogue.studio
            </a>
          </div>

          <div
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
          </div>

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
