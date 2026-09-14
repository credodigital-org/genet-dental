import { useState } from "react";
import logo from "../assets/images/logo.png";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Our Services" },
  { href: "#facilities", label: "Our Facilities" },
  { href: "#doctors", label: "Our Doctors" },
  { href: "#about", label: "About Us" },
  { href: "#contact", label: "Contact" },
];

function WhatsAppIcon() {
  return (
    <span className="wa-dot">
      <svg viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.4A10 10 0 1 0 12 2Zm5.8 14.3c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.2-3.8-.8-3.2-1.3-5.3-4.5-5.5-4.7-.2-.2-1.3-1.7-1.3-3.3 0-1.6.8-2.3 1.1-2.7.3-.3.6-.4.9-.4h.6c.2 0 .5 0 .7.5.3.7.9 2.3 1 2.4.1.2.1.4 0 .6-.2.4-.3.5-.5.8-.2.2-.4.4-.2.8.2.4.9 1.5 1.9 2.4 1.3 1.2 2.3 1.5 2.7 1.7.4.2.6.1.8-.1.2-.3.9-1 1.1-1.3.2-.3.5-.3.8-.2.3.1 2 1 2.3 1.1.3.2.5.3.6.4.1.2.1.9-.1 1.4Z" />
      </svg>
    </span>
  );
}

export default function Header({ clinicName }) {
  const [open, setOpen] = useState(false);

  return (
    <header id="siteHeader" className={open ? "nav-open" : ""}>
      <div className="nav">
        <a href="#home" className="logo">
          <img src={logo} alt={clinicName || "Genet Dental Specialized Center"} />
        </a>
        <nav className="nav-links">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className={i === 0 ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        {/* <div className="nav-cta">
          <a href="#appointment" className="btn btn-purple">
            <WhatsAppIcon />
            <span>Book Appointment</span>
          </a> */}

          <div className="nav-cta">
  <a
    href="#appointment"
    className="btn btn-purple header-book-btn"
  >
    <WhatsAppIcon />
    <span>Book Appointment</span>
  </a>


          <button
            className="menu-toggle"
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}

export { WhatsAppIcon };
