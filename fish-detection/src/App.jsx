import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience';
import './App.css'
import Carousel from './designComponents/Carousel';

export default function App() {
    const [scrollY, setScrollY] = useState(0);

    const handleScroll = (event) => {
        setScrollY((prevScrollY) => prevScrollY + event.deltaY * 0.5);
    };

    useEffect(() => {
        const canvasElement = document.querySelector('canvas');
        if (canvasElement) {
            canvasElement.addEventListener('wheel', handleScroll);
        }
        return () => {
            if (canvasElement) {
                canvasElement.removeEventListener('wheel', handleScroll);
            }
        }
    }, []);

    return (
        <>
            <div>
            <header className="App-header">
                <h1>AquaVision</h1>
                <p className="cta-text">Your friendly video image analysis for fish detection and tracking! Dive into a new world of aquatic analysis. <span><a href="/signup" className="signup-link">Sign up now</a> and make a splash!</span></p>
            </header>
            </div>
            <Canvas
                style={{ width: '100vw', height: '86vh' }}
                shadows
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 250,
                    position: [1, 3, 4]
                }}>
                <Experience />
            </Canvas>
            <Carousel />
        </>
    );
}




