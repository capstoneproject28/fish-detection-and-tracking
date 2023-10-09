import React from 'react';
import './css/Lpage.css';
import { Canvas } from '@react-three/fiber'
import Experience from './Experience';
import AOS from 'aos';
import { useEffect } from 'react';
import 'aos/dist/aos.css'; // You can also use <link> for styles

function Lpage() {
  useEffect(() => {
    AOS.init({
      duration: 2000
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to AquaVision</h1>
        <p>Your friendly video image analysis for fish detection and tracking!</p>
      </header>
      <section className="App-3dmodel">
        <Canvas style={{ width: '60%', height: '100vh' }}
         shadows camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6]}}
          data-aos="fade-right"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="false"
          data-aos-anchor-placement="top-center"
         >
            <Experience />
        </Canvas>
      </section>
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
  );
}

export default Lpage;
/*
<footer className="App-footer">
        <p>Contact us for more information.</p>
        <br></br>
        <div className="App-footer-brand">
          <span>AquaVision</span>
        </div>
      </footer>
*/