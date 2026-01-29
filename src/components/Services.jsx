import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "../data/services";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const containerRef = useRef(null);
  const serviceRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial title animation
      gsap.from(".service-header-char", {
        y: 100,
        opacity: 0,
        rotateX: -90,
        stagger: 0.02,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });

      // 2. Service Items Scroll Reveal
      serviceRefs.current.forEach((el, index) => {
        if (!el) return;

        gsap.fromTo(el,
          {
            y: 50,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-black min-h-screen py-32 px-6 md:px-12 lg:px-24 overflow-hidden relative">

      {/* Background Grid/Noise (Premium Feel) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
          backgroundSize: "100px 100px"
        }}
      />

      {/* Header */}
      <div className="mb-24 md:mb-40">
        <h2 className="text-[#AF986A] font-abc text-xs md:text-sm tracking-[0.3em] uppercase mb-6 pl-1">What We Do</h2>
        <h1 className="text-white font-['Druk'] text-[15vw] leading-[0.8] tracking-tighter uppercase overflow-hidden">
          {"SERVICES".split("").map((char, i) => (
            <span key={i} className="service-header-char inline-block origin-bottom">{char}</span>
          ))}
        </h1>
      </div>

      {/* Services List */}
      <div className="space-y-32 md:space-y-48">
        {services.map((service, index) => (
          <div
            key={index}
            ref={el => serviceRefs.current[index] = el}
            className="group relative"
          >
            {/* Divider Line */}
            <div className="w-full h-[1px] bg-white/20 mb-12 origin-left transform scale-x-100 group-hover:bg-[#AF986A] group-hover:scale-x-105 transition-all duration-700 ease-out" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

              {/* Title Area */}
              <div className="lg:col-span-7">
                <h3 className="text-white font-['Druk'] text-6xl md:text-8xl lg:text-9xl uppercase leading-[0.9] tracking-tight mb-8 group-hover:text-[#AF986A] transition-colors duration-500">
                  {service.title}
                </h3>
                <p className="text-white/60 font-abc text-lg md:text-xl leading-relaxed max-w-xl group-hover:text-white transition-colors duration-500">
                  {service.description}
                </p>
              </div>

              {/* Details List */}
              <div className="lg:col-span-5 pt-4">
                <ul className="space-y-6">
                  {service.details.map((detail, idx) => (
                    <li key={idx} className="flex items-baseline gap-6 text-white/40 group-hover:text-white transition-all duration-500 border-b border-white/5 pb-4 last:border-0 hover:pl-4 hover:text-[#AF986A] cursor-default">
                      <span className="font-abc text-sm tracking-widest opacity-50">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="font-abc text-xl md:text-2xl tracking-tight">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Improved CTA Section */}
      <div className="mt-40 md:mt-60 border-t border-white/20 pt-20">
        <div className="flex flex-col items-start gap-8">
          <p className="font-abc text-white/50 text-sm tracking-[0.2em] uppercase">Ready to start?</p>

          <button
            onClick={() => navigate('/contact')}
            className="group relative overflow-hidden"
          >
            <span className="block text-white font-['Druk'] text-[10vw] leading-[0.8] uppercase group-hover:text-[#AF986A] transition-colors duration-300">
              Let's Talk
            </span>
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#AF986A] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left" />
          </button>
        </div>
      </div>

    </div>
  );
};

export default Services;
