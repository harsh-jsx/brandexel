import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// SVG Logo Components
const GoogleLogo = () => (
  <svg viewBox="0 0 272 92" className="w-full h-full">
    <path
      fill="#4285F4"
      d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.33 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
    />
    <path
      fill="#EA4335"
      d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.33 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
    />
    <path
      fill="#FBBC05"
      d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"
    />
    <path fill="#4285F4" d="M225 3v65h-9.5V3h9.5z" />
    <path
      fill="#34A853"
      d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"
    />
    <path
      fill="#EA4335"
      d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"
    />
  </svg>
);

const AppleLogo = () => (
  <svg viewBox="0 0 170 170" className="w-full h-full">
    <path
      fill="currentColor"
      d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-4.929.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.032-7.08-9.169-15.29-12.41-24.65-3.471-10.11-5.211-19.9-5.211-29.378 0-10.857 2.346-20.221 7.045-28.068 3.693-6.303 8.606-11.275 14.755-14.925s12.793-5.51 19.948-5.629c3.915 0 9.049 1.211 15.429 3.591 6.362 2.388 10.447 3.599 12.238 3.599 1.339 0 5.877-1.416 13.57-4.239 7.275-2.618 13.415-3.702 18.445-3.275 13.63 1.1 23.87 6.473 30.68 16.153-12.19 7.386-18.22 17.731-18.1 31.002.11 10.337 3.86 18.939 11.23 25.769 3.34 3.17 7.07 5.62 11.22 7.36-.9 2.61-1.85 5.11-2.86 7.51zM119.11 7.24c0 8.102-2.96 15.667-8.86 22.669-7.12 8.324-15.732 13.134-25.071 12.375a25.222 25.222 0 0 1-.188-3.07c0-7.778 3.386-16.102 9.399-22.908 3.002-3.446 6.82-6.311 11.45-8.597 4.62-2.252 8.99-3.497 13.1-3.71.12 1.083.17 2.166.17 3.24z"
    />
  </svg>
);

const MetaLogo = () => (
  <svg viewBox="0 0 512 512" className="w-full h-full">
    <path
      fill="currentColor"
      d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm130.1 380.1c-11.7 11.7-28.9 15.2-44.5 8.9-48.3-19.5-100.8-19.5-149.2 0-15.6 6.3-32.8 2.8-44.5-8.9-11.7-11.7-15.2-28.9-8.9-44.5 19.5-48.3 19.5-100.8 0-149.2-6.3-15.6-2.8-32.8 8.9-44.5 11.7-11.7 28.9-15.2 44.5-8.9 48.3 19.5 100.8 19.5 149.2 0 15.6-6.3 32.8-2.8 44.5 8.9 11.7 11.7 15.2 28.9 8.9 44.5-19.5 48.3-19.5 100.8 0 149.2 6.3 15.6 2.8 32.8-8.9 44.5z"
    />
  </svg>
);

const AmazonLogo = () => (
  <svg viewBox="0 0 603 182" className="w-full h-full">
    <path
      fill="currentColor"
      d="M374.01 142.79c-34.41 25.39-84.31 38.92-127.27 38.92-60.21 0-114.45-22.26-155.48-59.29-3.22-2.91-.33-6.88 3.53-4.62 44.29 25.76 99.07 41.26 155.63 41.26 38.15 0 80.13-7.9 118.75-24.27 5.82-2.47 10.7 3.82 4.84 7.99z"
    />
    <path
      fill="currentColor"
      d="M387.86 127.12c-4.39-5.63-29.08-2.66-40.16-1.34-3.37.41-3.89-2.53-.85-4.65 19.67-13.83 51.93-9.84 55.69-5.21 3.77 4.66-.98 36.97-19.45 52.38-2.84 2.37-5.55 1.11-4.29-2.03 4.16-10.39 13.49-33.63 9.07-39.15z"
    />
    <path
      fill="currentColor"
      d="M348.62 21.16V6.64c0-2.21 1.67-3.68 3.68-3.68h65.04c2.09 0 3.76 1.51 3.76 3.68v12.42c-.02 2.09-1.79 4.82-4.91 9.16l-33.7 48.12c12.51-.31 25.72 1.56 37.07 7.96 2.56 1.44 3.25 3.57 3.45 5.66v15.5c0 2.13-2.35 4.62-4.82 3.33-20.13-10.55-46.87-11.7-69.13.11-2.27 1.22-4.64-1.24-4.64-3.37v-14.72c0-2.39.04-6.47 2.43-10.1l39.05-56.02h-34c-2.09 0-3.76-1.49-3.76-3.66l-.02-.01-.5.33z"
    />
    <path
      fill="currentColor"
      d="M124.59 105.99h-19.78c-1.89-.14-3.39-1.56-3.53-3.37V7.21c0-2.03 1.69-3.66 3.78-3.66h18.43c1.91.09 3.45 1.56 3.57 3.41v13.56h.37c4.78-13.08 13.77-19.17 25.87-19.17 12.28 0 19.97 6.09 25.5 19.17 4.76-13.08 15.58-19.17 27.23-19.17 8.26 0 17.28 3.41 22.8 11.06 6.27 8.51 5 20.88 5 31.73l-.02 58.32c0 2.03-1.69 3.68-3.78 3.68h-19.76c-1.96-.14-3.53-1.73-3.53-3.68V52.43c0-4.27.37-14.92-.56-18.96-1.49-6.78-5.94-8.69-11.7-8.69-4.82 0-9.87 3.22-11.92 8.37-2.06 5.16-1.87 13.77-1.87 19.28v50.02c0 2.03-1.69 3.68-3.78 3.68h-19.76c-1.98-.14-3.53-1.73-3.53-3.68l-.02-50.02c0-11.33 1.86-28 -12.26-28-14.31 0-13.75 16.26-13.75 28v50.02c0 2.03-1.69 3.68-3.78 3.68v-.14z"
    />
    <path
      fill="currentColor"
      d="M469.26 1.35c29.35 0 45.24 25.21 45.24 57.26 0 30.96-17.55 55.54-45.24 55.54-28.79 0-44.49-25.21-44.49-56.63 0-31.59 15.89-56.17 44.49-56.17zm.19 20.72c-14.56 0-15.48 19.85-15.48 32.22 0 12.4-.19 38.86 15.29 38.86 15.29 0 16.02-21.35 16.02-34.35 0-8.57-.37-18.81-2.99-26.93-2.24-7.04-6.69-9.81-12.84-9.81z"
    />
    <path
      fill="currentColor"
      d="M549.14 105.99h-19.71c-1.96-.14-3.53-1.73-3.53-3.68l-.02-95.28c.17-1.87 1.8-3.33 3.78-3.33h18.36c1.71.09 3.12 1.27 3.51 2.88v14.56h.37c5.5-13.19 13.21-19.48 26.79-19.48 8.82 0 17.42 3.19 22.94 11.88 5.13 8.08 5.13 21.66 5.13 31.52v57.68c-.21 1.8-1.84 3.24-3.78 3.24h-19.85c-1.82-.14-3.31-1.51-3.49-3.24V51.61c0-11.09 1.29-27.34-12.46-27.34-4.84 0-9.31 3.24-11.52 8.16-2.8 6.22-3.17 12.42-3.17 19.17v50.71c-.02 2.03-1.73 3.68-3.82 3.68h.47z"
    />
    <path
      fill="currentColor"
      d="M299.49 59.2c0 7.72.19 14.17-3.71 21.04-3.15 5.59-8.16 9.03-13.73 9.03-7.61 0-12.07-5.8-12.07-14.36 0-16.89 15.13-19.97 29.51-19.97v4.27zm20.02 48.37c-1.31 1.17-3.21 1.24-4.69.47-6.59-5.48-7.78-8.02-11.38-13.24-10.88 11.09-18.6 14.41-32.71 14.41-16.7 0-29.7-10.31-29.7-30.93 0-16.11 8.72-27.08 21.15-32.43 10.79-4.74 25.87-5.59 37.41-6.9v-2.56c0-4.72.37-10.29-2.41-14.36-2.41-3.66-7.04-5.16-11.13-5.16-7.56 0-14.29 3.88-15.94 11.92-.33 1.8-1.65 3.57-3.45 3.66l-19.22-2.07c-1.63-.37-3.43-1.69-2.97-4.2C249.56 6.04 270.82 0 289.98 0c9.8 0 22.61 2.6 30.35 10.03 9.8 9.16 8.87 21.38 8.87 34.68v31.42c0 9.44 3.92 13.58 7.61 18.69 1.29 1.84 1.57 4.04-.07 5.41-4.11 3.43-11.42 9.81-15.44 13.39l-.21-.05h.42z"
    />
    <path
      fill="currentColor"
      d="M55.17 59.2c0 7.72.19 14.17-3.71 21.04-3.15 5.59-8.14 9.03-13.71 9.03-7.61 0-12.09-5.8-12.09-14.36 0-16.89 15.13-19.97 29.51-19.97v4.27zm20.02 48.37c-1.31 1.17-3.21 1.24-4.69.47-6.59-5.48-7.78-8.02-11.38-13.24-10.88 11.09-18.6 14.41-32.71 14.41C9.71 109.21-3.29 98.9-3.29 78.28c0-16.11 8.72-27.08 21.15-32.43 10.79-4.74 25.87-5.59 37.41-6.9v-2.56c0-4.72.37-10.29-2.41-14.36-2.41-3.66-7.04-5.16-11.13-5.16-7.56 0-14.29 3.88-15.94 11.92-.33 1.8-1.65 3.57-3.45 3.66L3.12 30.38c-1.63-.37-3.43-1.69-2.97-4.2C5.24 6.04 26.5 0 45.66 0c9.8 0 22.61 2.6 30.35 10.03 9.8 9.16 8.87 21.38 8.87 34.68v31.42c0 9.44 3.92 13.58 7.61 18.69 1.29 1.84 1.57 4.04-.07 5.41-4.11 3.43-11.42 9.81-15.44 13.39l-.21-.05h.42z"
    />
  </svg>
);

const MicrosoftLogo = () => (
  <svg viewBox="0 0 23 23" className="w-full h-full">
    <path fill="#f35325" d="M1 1h10v10H1z" />
    <path fill="#81bc06" d="M12 1h10v10H12z" />
    <path fill="#05a6f0" d="M1 12h10v10H1z" />
    <path fill="#ffba08" d="M12 12h10v10H12z" />
  </svg>
);

const NetflixLogo = () => (
  <svg viewBox="0 0 111 30" className="w-full h-full">
    <path
      fill="#E50914"
      d="M105.062 14.28L111 30c-1.75-.25-3.499-.563-5.28-.845l-3.345-8.686-3.437 7.969c-1.687-.282-3.344-.376-5.031-.595l6.031-13.75L94.468 0h5.063l3.062 7.874L105.875 0h5.124l-5.937 14.28zM90.47 0h-4.594v27.25c1.5.094 3.062.156 4.594.343V0zm-8.563 26.937c-4.187-.281-8.375-.53-12.656-.625V0h4.687v21.875c2.688.062 5.375.28 7.969.405v4.657zM64.25 10.657v4.687h-6.406V26H53.22V0h13.125v4.687h-8.5v5.97h6.406zm-18.906-5.97V26.25c-1.563 0-3.156 0-4.688.062V4.687h-4.844V0h14.406v4.687h-4.874zM30.75 0v21.875c2.75.156 5.5.343 8.28.594v4.5L26.062 26V0h4.688zm-16.156 8.345c1.969 0 3.281-1.406 3.281-3.156 0-1.78-1.312-3.156-3.281-3.156H10.5v6.312h4.094zm6.594 18.28L16 16.97h-5.5V27c-1.656.063-3.25.156-4.875.22V0h10.062C21.22 0 25 3.938 25 8.188c0 3.5-2.125 6.125-5.156 7.125l6.187 11.187c-1.656.063-3.25.156-4.844.125z"
    />
  </svg>
);

const SpotifyLogo = () => (
  <svg viewBox="0 0 168 168" className="w-full h-full">
    <path
      fill="#1ED760"
      d="M84 0C37.6 0 0 37.6 0 84s37.6 84 84 84 84-37.6 84-84S130.4 0 84 0zm38.5 121.2c-1.5 2.5-4.7 3.2-7.1 1.7-19.5-11.9-44-14.6-72.9-8-2.8.6-5.6-1.1-6.2-3.9-.6-2.8 1.1-5.6 3.9-6.2 31.5-7.2 58.6-4.1 80.5 9.3 2.5 1.5 3.3 4.7 1.8 7.1zm10.3-22.9c-1.9 3-5.9 4-8.9 2.1-22.3-13.7-56.3-17.7-82.7-9.7-3.3 1-6.9-.9-7.9-4.2-1-3.3.9-6.9 4.2-7.9 30.1-9.1 67.5-4.7 93.1 11.1 3 1.8 4 5.9 2.2 8.6zm.9-23.9c-26.8-15.9-71-17.4-96.6-9.6-4.1 1.3-8.4-1.1-9.6-5.2-1.3-4.1 1.1-8.4 5.2-9.6 29.4-8.9 78.3-7.2 109.2 11.1 3.7 2.2 4.9 6.9 2.7 10.6-2.2 3.7-6.9 4.9-10.6 2.7h-.3z"
    />
  </svg>
);

const AdobeLogo = () => (
  <svg viewBox="0 0 240 234" className="w-full h-full">
    <path
      fill="#FF0000"
      d="M42.5 0h155v234h-155zM0 0h42.5v234L0 0zm197.5 0H240L197.5 234V0zM87.5 164.5h25l-12.5-35-37.5 104.5h-25l50-140h25l50 140h-25l-12.5-34.5h-37.5l12.5-35z"
    />
  </svg>
);

const clients = [
  { name: "Google", Logo: GoogleLogo, colored: true },
  { name: "Apple", Logo: AppleLogo, colored: false },
  { name: "Meta", Logo: MetaLogo, colored: false },
  { name: "Amazon", Logo: AmazonLogo, colored: false },
  { name: "Microsoft", Logo: MicrosoftLogo, colored: true },
  { name: "Netflix", Logo: NetflixLogo, colored: true },
  { name: "Spotify", Logo: SpotifyLogo, colored: true },
  { name: "Adobe", Logo: AdobeLogo, colored: true },
];

export default function ClientLogos({ isLoading }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const logosRef = useRef([]);
  const ctaRef = useRef(null);
  const ctaTextRef = useRef(null);
  const ctaArrowRef = useRef(null);
  const lineRef = useRef(null);
  const linesContainerRef = useRef(null);

  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(titleRef.current, { opacity: 0, y: 60 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 40 });
      gsap.set(logosRef.current, { opacity: 0, y: 50, scale: 0.9 });
      gsap.set(ctaRef.current, { opacity: 0, y: 40 });
      gsap.set(lineRef.current, { scaleX: 0 });

      // Animate background lines
      const lines = linesContainerRef.current?.querySelectorAll(".bg-line");
      if (lines) {
        gsap.set(lines, { scaleY: 0 });
        gsap.to(lines, {
          scaleY: 1,
          duration: 1.5,
          stagger: 0.1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
          },
        });
      }

      // Main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom bottom",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(lineRef.current, {
        scaleX: 1,
        duration: 1.2,
        ease: "power3.inOut",
      })
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .to(
          logosRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.3"
        );

      // Logo hover animations
      logosRef.current.forEach((logo) => {
        if (!logo) return;

        const svgContainer = logo.querySelector(".logo-svg");

        logo.addEventListener("mouseenter", () => {
          gsap.to(logo, {
            scale: 1.05,
            y: -8,
            duration: 0.4,
            ease: "power2.out",
          });
          gsap.to(svgContainer, {
            filter: "brightness(1.2)",
            duration: 0.3,
          });
          gsap.to(logo, {
            borderColor: "hsla(40, 30%, 55%, 0.5)",
            duration: 0.3,
          });
        });

        logo.addEventListener("mouseleave", () => {
          gsap.to(logo, {
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          });
          gsap.to(svgContainer, {
            filter: "brightness(1)",
            duration: 0.3,
          });
          gsap.to(logo, {
            borderColor: "hsla(0, 0%, 100%, 0.1)",
            duration: 0.3,
          });
        });
      });

      // CTA hover
      const cta = ctaRef.current;
      cta.addEventListener("mouseenter", () => {
        gsap.to(ctaArrowRef.current, {
          x: 10,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(ctaTextRef.current, {
          x: -5,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      cta.addEventListener("mouseleave", () => {
        gsap.to(ctaArrowRef.current, {
          x: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(ctaTextRef.current, {
          x: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden py-24 md:py-32"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[hsl(0,0%,3%)]" />

      {/* Subtle line background */}
      <div
        ref={linesContainerRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="bg-line absolute top-0 bottom-0 w-px origin-top"
            style={{
              left: `${(i + 1) * (100 / 13)}%`,
              background:
                "linear-gradient(to bottom, transparent, hsla(0, 0%, 100%, 0.03) 20%, hsla(0, 0%, 100%, 0.03) 80%, transparent)",
            }}
          />
        ))}
        {/* Horizontal lines */}
        <div
          className="absolute left-0 right-0 h-px top-1/4"
          style={{
            background:
              "linear-gradient(to right, transparent, hsla(0, 0%, 100%, 0.03) 20%, hsla(0, 0%, 100%, 0.03) 80%, transparent)",
          }}
        />
        <div
          className="absolute left-0 right-0 h-px top-1/2"
          style={{
            background:
              "linear-gradient(to right, transparent, hsla(0, 0%, 100%, 0.03) 20%, hsla(0, 0%, 100%, 0.03) 80%, transparent)",
          }}
        />
        <div
          className="absolute left-0 right-0 h-px top-3/4"
          style={{
            background:
              "linear-gradient(to right, transparent, hsla(0, 0%, 100%, 0.03) 20%, hsla(0, 0%, 100%, 0.03) 80%, transparent)",
          }}
        />
      </div>

      {/* Decorative glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsla(40, 30%, 55%, 0.1) 0%, transparent 70%)",
        }}
      />

      {/* Top border line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Top line */}
        <div
          ref={lineRef}
          className="h-px bg-gradient-to-r from-transparent via-[hsl(40,30%,55%)] to-transparent mb-16 md:mb-24 origin-left"
        />

        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <p
            ref={subtitleRef}
            className="text-[hsl(40,30%,55%)] text-sm md:text-base tracking-[0.3em] uppercase mb-4"
          >
            Trusted by industry leaders
          </p>
          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-serif text-white tracking-tight"
          >
            Our Clients
          </h2>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-20 md:mb-32">
          {clients.map((client, index) => (
            <div
              key={client.name}
              ref={(el) => (logosRef.current[index] = el)}
              className="group relative flex items-center justify-center py-10 md:py-14 border border-white/10 rounded-xl cursor-pointer backdrop-blur-sm transition-all duration-300"
              style={{
                background:
                  "linear-gradient(135deg, hsla(0, 0%, 100%, 0.02) 0%, transparent 100%)",
              }}
            >
              {/* Logo */}
              <div
                className={`logo-svg w-24 md:w-32 h-8 md:h-10 transition-all duration-300 ${
                  !client.colored
                    ? "text-white/70 group-hover:text-white"
                    : "opacity-70 group-hover:opacity-100"
                }`}
              >
                <client.Logo />
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at center, hsla(40, 30%, 55%, 0.05) 0%, transparent 70%)",
                }}
              />

              {/* Corner accents */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/0 group-hover:border-[hsl(40,30%,55%)]/30 transition-colors duration-300" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-white/0 group-hover:border-[hsl(40,30%,55%)]/30 transition-colors duration-300" />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <p className="text-white/50 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Ready to join our roster of successful brands?
          </p>
          <a
            ref={ctaRef}
            href="#contact"
            className="group inline-flex items-center gap-4 px-10 py-5 border border-[hsl(40,30%,55%)] rounded-full text-[hsl(40,30%,55%)] hover:bg-[hsl(40,30%,55%)] hover:text-black transition-colors duration-300"
          >
            <span
              ref={ctaTextRef}
              className="text-lg md:text-xl tracking-wider uppercase"
            >
              Start Your Project
            </span>
            <svg
              ref={ctaArrowRef}
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-t from-[hsl(40,30%,55%)]/30 to-transparent" />
    </section>
  );
}
