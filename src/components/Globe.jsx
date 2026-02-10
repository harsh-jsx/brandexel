import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";

export default function Globe({ className }) {
    const canvasRef = useRef();
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let phi = 0;

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 600 * 2,
            height: 600 * 2,
            phi: 0,
            theta: 0,
            dark: 1,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 10,
            baseColor: [1, 1, 1], // Pure White
            markerColor: isHovered ? [0.1, 0.8, 1] : [0.8, 0.8, 0.9], // Blue on hover, Soft silver otherwise
            glowColor: isHovered ? [0.1, 0.5, 1] : [1, 1, 1], // Blue glow on hover
            scale: 1.1,
            opacity: 1,
            markers: [
                { location: [37.7595, -122.4367], size: 0.03 },
                { location: [40.7128, -74.006], size: 0.03 },
                { location: [51.5074, -0.1278], size: 0.03 }, // London
                { location: [35.6762, 139.6503], size: 0.03 }, // Tokyo
                { location: [28.6139, 77.2090], size: 0.03 }, // New Delhi
            ],
            onRender: (state) => {
                state.phi = phi;
                phi += 0.003; // Slower rotation
            },
        });

        return () => {
            globe.destroy();
        };
    }, [isHovered]);

    return (
        <div
            className={`w-full h-full flex items-center justify-center ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <canvas
                ref={canvasRef}
                style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
            />
        </div>
    );
}
