import { useEffect, useRef } from "react";
import "../styles/services.css";
import { businessData } from "../data/business";

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = section.querySelectorAll(".card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(section);
    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.unobserve(section);
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  return (
    <section id="services" className="services" ref={sectionRef}>
      <h2>Our Services</h2>
      <div className="grid">
        {businessData.services.map((service, i) => (
          <div
            key={i}
            className="card"
            style={{ backgroundImage: `url(${service.image})` }}
          >
            <div className="card-overlay">
              <h3>{service.name}</h3>
              <p>{service.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
