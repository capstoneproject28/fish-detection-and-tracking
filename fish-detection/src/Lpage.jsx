import React from 'react';
import './App.css';

function Lpage() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to AquaVision</h1>
        <p>Your friendly video image analysis for fish detection and tracking!</p>
      </header>

      <section className="App-intro">
        <h2>Why AquaVision?</h2>
        <p>State-of-the-art machine learning to track and detect fish in any environment, helping researchers, fish farmers, and enthusiasts alike!</p>
      </section>

      <section className="App-features">
        <div className="feature">
          <h3>Real-time Analysis</h3>
          <p>Get instant data on fish movement and numbers.</p>
        </div>
        <div className="feature">
          <h3>User Friendly</h3>
          <p>Easy-to-use interface, perfect for all ages and skill levels.</p>
        </div>
        <div className="feature">
          <h3>Secure and Private</h3>
          <p>Your data is safe with our encrypted storage solutions.</p>
        </div>
      </section>

      <footer className="App-footer">
        <p>Contact us for more information.</p>
      </footer>
    </div>
  );
}

export default Lpage;
