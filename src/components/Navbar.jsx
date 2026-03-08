import "../styles/navbar.css";
import { businessData } from "../data/business";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="logo">{businessData.name}</div>
      <div className={`nav-links ${open ? "open" : ""}`}>
        <a href="#services">Services</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
      <div className="hamburger" onClick={() => setOpen(!open)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
}
