import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const NAV_ITEMS = [
  { label: "WORK", count: "(15)", id: "work" },
  { label: "ABOUT", count: "(01)", id: "about" },
  { label: "SERVICES", count: "(08)", id: "services" },
  { label: "CLIENTS", count: "(12)", id: "clients" },
  { label: "CONTACT", count: "", id: "contact" },
];

const MobileNavbar = ({ onNavigate }) => {
  const [open, setOpen] = useState(false);

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

    const tl = gsap.timeline();

    tl.set(overlayRef.current, { yPercent: 100 })
      .to(overlayRef.current, {
        yPercent: 0,
        duration: 0.9,
        ease: "power4.inOut",
      })
      .fromTo(
        lineRefs.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .fromTo(
        itemRefs.current,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.08,
          ease: "power4.out",
        },
        "-=0.6"
      )
      .fromTo(
        footerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      );

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => {
    const tl = gsap.timeline({
      onComplete: () => setOpen(false),
    });

    tl.to(itemRefs.current, {
      yPercent: 120,
      opacity: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: "power3.in",
    }).to(
      overlayRef.current,
      {
        yPercent: 100,
        duration: 0.8,
        ease: "power4.inOut",
      },
      "-=0.3"
    );
  };

  const handleClick = (id) => {
    closeMenu();
    if (onNavigate) {
      setTimeout(() => onNavigate(id), 700);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-5 py-4 bg-black">
        <button className="text-white text-lg">◔</button>
        <span className="text-white tracking-[0.3em] text-xs">BRANDEXEL</span>
        <button
          onClick={() => setOpen(true)}
          className="text-white text-xs tracking-widest uppercase"
        >
          MENU
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[100] bg-black text-white px-6 pt-24"
        >
          {/* Close */}
          <button
            onClick={closeMenu}
            className="absolute top-6 right-6 w-10 h-10   rounded flex items-center justify-center"
          >
            ✕
          </button>

          {/* Menu */}
          <nav className="space-y-6">
            {NAV_ITEMS.map((item, i) => (
              <div key={item.label}>
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => handleClick(item.id)}
                >
                  <h2
                    ref={(el) => (itemRefs.current[i] = el)}
                    className="font-serif text-5xl tracking-tight"
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
                  className="h-px bg-white/20 mt-4 origin-left"
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

            <div className="border border-white/30 py-4 text-center tracking-[0.3em] text-xs uppercase">
              START A PROJECT →
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavbar;
