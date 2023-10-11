import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'

export default function Fpage(){
    return(
        <>
        
        </>
    )
}

/*
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience';
import './App.css'

/*export default function App() {
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
            <Canvas
                style={{ width: '100%', height: '100%' }}
                shadows
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 250,
                    position: [1, 3, 4]
                }}>
                <Experience scrollY={scrollY} />
            </Canvas>
            <div className="App">
            <header className="App-header">
                <h1>Welcome to AquaVision</h1>
                <p>Your friendly video image analysis for fish detection and tracking!</p>
            </header>
            <section className="App-details">
            <h2>Why AquaVision?</h2>
                    <p>With state-of-the-art machine learning, AquaVision provides unparalleled accuracy in tracking and detecting fish in any environment.</p>
                    <p>We offer solutions that are perfect for researchers, fish farmers, and aquarists. Our easy-to-use interface is designed to help you get the most out of your aquatic observations.</p>
            </section>
            <section className="App-details">
                <h2>How It Works</h2>
                <p>Simply upload your video and our AI algorithms will handle the rest. Receive comprehensive analytics about fish behavior, count, and movement patterns.</p>
            </section>

            <section className="App-features">
                <div className="feature">
                <h3>Real-time Analysis</h3>
                <p>Get instant data on fish movement and numbers.</p>
                </div>
                <div className="feature">
                <h3>User Friendly</h3>
                <p>Easy-to-navigate interface perfect for all ages and skill levels.</p>
                </div>
                <div className="feature">
                <h3>Secure and Private</h3>
                <p>Your data is safe with our encrypted storage solutions.</p>
                </div>
            </section>
            </div>
        </>
    );
}




import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import Fish from './designComponents/Fish.jsx';
import { Text } from '@react-three/drei';

/*function AquaVisionText({ scrollY }) {
    const positionZ = -3 + scrollY * 0.1;  // Adjust for initial hidden position
    return (
        <Text
            position={[0, 0, positionZ]}
            fontSize={0.4}
            color="Black"
            //opacity={Math.max(opacity, 0)} // To ensure opacity doesn't go negative
        >
            Welcome to AquaVision
        </Text>
    );
}
*/
/*
export default function Experience({ scrollY }) {
    return (
        <>
            <OrbitControls makeDefault enableZoom={false} enablePan={false} />
            <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} shadow-normalBias={0.04} />
            <Fish />
            
        </>
    );
}
//<AquaVisionText scrollY={scrollY} />

//<OrbitControls makeDefault enableZoom={false} enablePan={false} />
//<Perf position="top-left" />
//<OrbitControls makeDefault />
/*<mesh receiveShadow position-x={0} position-y={ -0.78 } position-z= {0} rotation-x={ - Math.PI * 0.5 } scale={1.5 }>
<planeGeometry />
<meshStandardMaterial color="cyan" />
</mesh>
*/
