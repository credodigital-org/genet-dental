// frontend/src/components/Header.jsx
import "../styles/Header.css";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Our Services" },
  { to: "/facilities", label: "Our Facilities" },
  { to: "/doctors", label: "Our Doctors" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

export function WhatsAppIcon() {
  return (
    <span className="wa-dot" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.4A10 10 0 1 0 12 2Zm5.8 14.3c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.2-3.8-.8-3.2-1.3-5.3-4.5-5.5-4.7-.2-.2-1.3-1.7-1.3-3.3 0-1.6.8-2.3 1.1-2.7.3-.3.6-.4.9-.4h.6c.2 0 .5 0 .7.5.3.7.9 2.3 1 2.4.1.2.1.4 0 .6-.2.4-.3.5-.5.8-.2.2-.4.4-.2.8.2.4.9 1.5 1.9 2.4 1.3 1.2 2.3 1.5 2.7 1.7.4.2.6.1.8-.1.2-.3.9-1 1.1-1.3.2-.3.5-.3.8-.2.3.1 2 1 2.3 1.1.3.2.5.3.6.4.1.2.1.9-.1 1.4Z" />
      </svg>
    </span>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.classList.toggle("nav-menu-open", open);
    return () => {
      document.body.classList.remove("nav-menu-open");
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header id="siteHeader" className={open ? "nav-open" : ""}>
      <div className="nav">
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          <img src={logo} alt="Genet Dental Specialized Center" />
        </Link>

        <nav className="nav-links" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={location.pathname === link.to ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          {/* DESKTOP BOOKING BUTTON */}
     {/* <a
  href="https://wa.me/971503469945"
  target="_blank"
  rel="noopener noreferrer"
  className="navbar-booking"
>
  <WhatsAppIcon />
  <span>Book Appointment</span>
</a> */}

<a
  href="tel:+97126669945"
  className="navbar-booking"
>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
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

  <span>Book Appointment</span>
</a>

          {/* HAMBURGER */}
          <button
            type="button"
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}