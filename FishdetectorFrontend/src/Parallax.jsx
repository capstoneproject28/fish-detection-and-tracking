import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import "./css/parallax.css";

import image1 from "./assets/1.jpg";
import image2 from "./assets/2.jpg";
import image3 from "./assets/3.jpeg";

export default function Parallax(){
  const { innerHeight } = window;

  const getRatio = (el) => innerHeight / (innerHeight + el.offsetHeight);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray("section").forEach((section, i) => {
      section.bg = section.querySelector(".bg");

      gsap.fromTo(
        section.bg,
        {
          backgroundPosition: () =>
            i ? `50% ${-innerHeight * getRatio(section)}px` : "50% 0px",
        },
        {
          backgroundPosition: () =>
            `50% ${innerHeight * (1 - getRatio(section))}px`,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: () => (i ? "top bottom" : "top top"),
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
  }, []);

  return (
    <>
      <section>
      <div className="bg" style={{ backgroundImage: `url(${image1})` }} />
        <h1>Welcome to AquaVision</h1>
        <p>Your friendly video image analysis for fish detection and tracking!</p>
      </section>
      <section>
        <div className="bg" style={{ backgroundImage: `url(${image2})` }} />
        <h2>Why AquaVision?</h2>
        <br /><br />
                <p>With state-of-the-art machine learning, AquaVision provides unparalleled accuracy in tracking and detecting fish in any environment.</p>
                <p>We offer solutions that are perfect for researchers, fish farmers, and aquarists. Our easy-to-use interface is designed to help you get the most out of your aquatic observations.</p>
      </section>
      <section>
        <div className="bg" style={{ backgroundImage: `url(${image3})` }} />
        <h2>How It Works</h2>
            <p>Simply upload your video and our AI algorithms will handle the rest. Receive comprehensive analytics about fish behavior, count, and movement patterns.</p>
            <br />
            <h3>Real-time Analysis</h3>
              <p>Get instant data on fish movement and numbers.</p>
              <h3>User Friendly</h3>
              <p>Easy-to-navigate interface perfect for all ages and skill levels.</p>
              <h3>Secure and Private</h3>
              <p>Your data is safe with our encrypted storage solutions.</p>
      </section>
    </>
  );
};