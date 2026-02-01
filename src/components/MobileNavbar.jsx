import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useNavigate, useLocation } from "react-router-dom";

const MobileNavbar = ({ onNavigate, navItems }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // We use a container ref for GSAP context scoping
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const itemRefs = useRef([]);
  const lineRefs = useRef([]);
  const footerRef = useRef(null);

  /* ===============================
     OPEN / CLOSE ANIMATION
  =============================== */
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Ensure initial state
      gsap.set(overlayRef.current, { yPercent: 100 });
      gsap.set(itemRefs.current, { yPercent: 120, opacity: 0 });
      gsap.set(lineRefs.current, { scaleX: 0 });
      gsap.set(footerRef.current, { opacity: 0, y: 30 });

      tl.to(overlayRef.current, {
        yPercent: 0,
        duration: 0.9,
        ease: "power4.inOut",
      })
        .to(
          lineRefs.current,
          {
            scaleX: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.4" // Overlap with overlay movement
        )
        .to(
          itemRefs.current,
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.08,
            ease: "power4.out",
          },
          "-=0.8" // Start appearing while lines are drawing
        )
        .to(
          footerRef.current,
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        );
    }, containerRef);

    return () => {
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, [open]);

  const closeMenu = (callback) => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setOpen(false);
          if (callback) callback();
        },
      });

      tl.to(itemRefs.current, {
        yPercent: 120,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.in",
      })
        .to(footerRef.current, { opacity: 0, duration: 0.4 }, "<") // Fade out footer with items
        .to(
          overlayRef.current,
          {
            yPercent: 100,
            duration: 0.8,
            ease: "power4.inOut",
          },
          "-=0.3"
        );
    }, containerRef);
  };

  const handleNavClick = (sectionId) => {
    if (!sectionId) return;

    closeMenu(() => {
      setTimeout(() => {
        if (sectionId.startsWith("/")) {
          // Route
          navigate(sectionId);
        } else {
          // Section
          if (location.pathname !== "/") {
            navigate("/", { state: { scrollTo: sectionId } });
          } else {
            // If already on home, we might need to handle scrolling
            // If passed onNavigate prop handles it (from parent)
            if (onNavigate) {
              onNavigate(sectionId);
            } else {
              const el = document.getElementById(sectionId);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
      }, 300); // Wait for close animation
    });
  };

  return (
    <div ref={containerRef}>
      {/* Top Bar - Z-Index 99 to serve as base, but Overlay will be higher */}
      <div className="fixed top-0 left-0 right-0 z-[99] flex justify-between items-center px-5 py-4 bg-black">
        <button className="text-white text-lg">◔</button>
        <span className="text-white tracking-[0.3em] text-xs">BRANDEXEL</span>
        <button
          onClick={() => setOpen(true)}
          className="text-white text-xs tracking-widest uppercase"
        >
          MENU
        </button>
      </div>

      {/* Overlay - Z-Index 100 to cover the Top Bar */}
      {open && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[100] bg-black text-white px-6 pt-14"
        >
          {/* Close Button - Now correctly clickable on top of everything */}
          <button
            onClick={() => closeMenu()}
            className="absolute top-6 right-6 w-10 h-10 rounded flex items-center justify-center z-[101]"
          >
            ✕
          </button>

          {/* Menu */}
          <nav className="space-y-1">
            {navItems && navItems.map((item, i) => (
              <div key={item.label}>
                <div
                  className="flex items-center justify-between cursor-pointer py-2"
                  onClick={() => handleNavClick(item.sectionId)}
                >
                  <h2
                    ref={(el) => (itemRefs.current[i] = el)}
                    className="font-[druk] text-[15vw] tracking-tight leading-[0.85] uppercase"
                    style={{
                      textShadow: "0 0 40px hsla(40,30%,55%,0.15)",
                    }}
                  >
                    {item.label}
                  </h2>
                  <span className="text-sm text-white/50">{item.count}</span>
                </div>

                <div
                  ref={(el) => (lineRefs.current[i] = el)}
                  className="h-px bg-white/20 origin-left"
                />
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div ref={footerRef} className="absolute bottom-8 left-6 right-6">
            <p className="text-xs tracking-widest text-white/40 mb-2">
              SAY HELLO
            </p>
            <p className="text-white mb-6">hello@brandexel.com</p>

            <div className="flex gap-6 text-xs text-white/50 uppercase tracking-widest mb-8">
              <span>Dribbble</span>
              <span>Behance</span>
              <span>Twitter</span>
              <span>Instagram</span>
            </div>

            <div className="border border-white/30 py-4 text-center tracking-[0.3em] text-xs uppercase cursor-pointer hover:bg-white hover:text-black transition-colors duration-300" onClick={() => window.location.href = "/contact"}>
              START A PROJECT →
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
