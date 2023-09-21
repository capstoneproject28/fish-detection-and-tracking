import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to AquaVision</h1>
        <p>Your friendly video image analysis for fish detection and tracking!</p>
      </header>

      <section className="App-intro">
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

      <footer className="App-footer">
        <p>Contact us for more information.</p>
        <br></br>
        <div className="App-footer-brand">
          <span>AquaVision</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
