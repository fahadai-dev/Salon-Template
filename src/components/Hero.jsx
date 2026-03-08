import "../styles/hero.css";
import { businessData } from "../data/business";
import heroImage from "../assets/hero.jpg";

export default function Hero() {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroImage})`,
      }}
    >
      <div className="overlay">
        <h1>{businessData.tagline}</h1>
        <a href="#contact" className="btn">
          Book Appointment
        </a>
      </div>
    </section>
  );
}
