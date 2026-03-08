import "../styles/services.css";
import { businessData } from "../data/business";

export default function Services() {
  return (
    <section id="services" className="services">
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
