import { WhatsAppIcon } from "./Header";
import "../styles/FloatingContactButtons.css";

export default function FloatingContactButtons() {
  return (
    <div className="floating-contact-buttons">

      {/* WhatsApp */}
      <a
        href="https://wa.me/971503469945"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-contact whatsapp"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon />
      </a>

      {/* Call */}
      <a
        href="tel:+97126669945"
        className="floating-contact call"
        aria-label="Call Genet Dental"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2
            19.8 19.8 0 0 1-8.63-3.07
            19.5 19.5 0 0 1-6-6
            19.8 19.8 0 0 1-3.07-8.63
            A2 2 0 0 1 4.11 2h3
            a2 2 0 0 1 2 1.72
            c.12.9.35 1.78.7 2.63
            a2 2 0 0 1-.45 2.11L8.09 9.73
            a16 16 0 0 0 6.18 6.18
            l1.27-1.27
            a2 2 0 0 1 2.11-.45
            c.85.35 1.73.58 2.63.7
            A2 2 0 0 1 22 16.92z"
          />
        </svg>
      </a>

    </div>
  );
}