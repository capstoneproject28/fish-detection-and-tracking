import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Experience from "../Experience";

export default function CanvasComponent() {
    useEffect(() => {
        const canvasElement = document.querySelector('canvas');
        const handleScroll = (event) => {
            event.preventDefault();
            window.scroll(window.scrollX, window.scrollY + event.deltaY);
        };
        
        if (canvasElement) {
            canvasElement.addEventListener('wheel', handleScroll, { passive: false });
        }
        
        return () => {
            if (canvasElement) {
                canvasElement.removeEventListener('wheel', handleScroll);
            }
        }
    }, []);

    return (
        <Canvas
            style={{ width: '100vw', height: '100vh' }}
            shadows
            camera={{
                fov: 45,
                near: 0.1,
                far: 250,
                position: [1, 3, 4]
            }}>
            <Experience />
        </Canvas>
    );
}