import "../styles/FloatingButtons.css";
import { FaWhatsapp, FaPhoneAlt, FaFacebookF, FaYoutube } from "react-icons/fa";

function FloatingButtons() {
  return (
    <div className="floating-buttons">
      <a
        href="https://wa.me/8801894007153"
        target="_blank"
        rel="noreferrer"
        className="float whatsapp"
      >
        <FaWhatsapp />
      </a>

      <a href="tel:+8801927907376" className="float call">
        <FaPhoneAlt />
      </a>

      <a
        href="https://facebook.com"
        target="_blank"
        rel="noreferrer"
        className="float facebook"
      >
        <FaFacebookF />
      </a>

      <a
        href="https://youtube.com"
        target="_blank"
        rel="noreferrer"
        className="float youtube"
      >
        <FaYoutube />
      </a>
    </div>
  );
}

export default FloatingButtons;
