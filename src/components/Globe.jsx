import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";

export default function Globe({ className }) {
    const canvasRef = useRef();
    const pointerInteracting = useRef(null);
    const pointerInteractionMovement = useRef(0);
    const [r, setR] = useState(0);

    const locationRef = useRef([0, 0]); // To store current cursor location on globe [lat, lon]
    const onRenderRef = useRef(null); // To store the update function if needed

    useEffect(() => {
        let phi = 0;
        let width = 0;
        const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth);
        window.addEventListener('resize', onResize);
        onResize();

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: width * 2,
            height: width * 2,
            phi: 0,
            theta: 0,
            dark: 1,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [0.3, 0.3, 0.3],
            markerColor: [0.1, 0.8, 1],
            glowColor: [1, 1, 1],
            scale: 1,
            markers: [
                { location: [37.7595, -122.4367], size: 0.03 },
                { location: [40.7128, -74.006], size: 0.03 },
            ],
            onRender: (state) => {
                // Rotation
                state.phi = phi + r;
                phi += 0.003;

                // Add cursor marker if interacting
                if (pointerInteracting.current !== null) {
                    const [cx, cy] = pointerInteracting.current;
                    // Calculate vector from center
                    // Canvas is square based on width
                    const size = width;
                    const x = (cx - size / 2) / (size / 2);
                    const y = (cy - size / 2) / (size / 2);

                    // Check if inside sphere
                    if (x * x + y * y < 1) {
                        const z = Math.sqrt(1 - x * x - y * y);
                        // Rotate "back" by phi to find fixed location
                        // Rotation around Y axis (phi)
                        // We want the point on the sphere that is currently at (x, y, z)
                        // The globe rotates by state.phi.
                        // So we rotate (x, y, z) by -state.phi

                        const r = state.phi;
                        const x1 = x * Math.cos(r) - z * Math.sin(r);
                        const z1 = x * Math.sin(r) + z * Math.cos(r);
                        const y1 = y;

                        const lat = Math.asin(y1) * (180 / Math.PI);
                        const lon = Math.atan2(x1, z1) * (180 / Math.PI) - 90; // Adjustment might be needed

                        // Create a dynamic marker list
                        state.markers = [
                            { location: [37.7595, -122.4367], size: 0.03 },
                            { location: [40.7128, -74.006], size: 0.03 },
                            { location: [lat, lon], size: 0.08 }
                        ];
                    } else {
                        state.markers = [
                            { location: [37.7595, -122.4367], size: 0.03 },
                            { location: [40.7128, -74.006], size: 0.03 },
                        ];
                    }
                }
            },
        });

        return () => {
            globe.destroy();
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <div
            className={`w-full h-full flex items-center justify-center ${className}`}
            style={{
                width: '100%',
                maxWidth: 600,
                aspectRatio: 1,
                margin: 'auto',
                position: 'relative',
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '100%',
                    contain: 'layout paint size',
                    opacity: 1,
                    transition: 'opacity 1s ease',
                }}
                onPointerMove={(e) => {
                    const rect = canvasRef.current.getBoundingClientRect();
                    pointerInteracting.current = [
                        e.clientX - rect.left,
                        e.clientY - rect.top
                    ];
                }}
                onPointerOut={() => {
                    pointerInteracting.current = null;
                }}
            />
        </div>
    );
}
