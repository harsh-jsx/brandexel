import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export default function Globe({ className }) {
    const canvasRef = useRef();

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
            markerColor: [0.8, 0.8, 0.9], // Soft silver/white markers
            glowColor: [1, 1, 1], // White glow
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
    }, []);

    return (
        <div className={`w-full h-full flex items-center justify-center ${className}`}>
            <canvas
                ref={canvasRef}
                style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
            />
        </div>
    );
}
