import "../styles/Footer.css";
import logo from "../assets/images/footer logo.png";

import facebookIcon from "../assets/images/logos_facebook.png";
import instagramIcon from "../assets/images/skill-icons_instagram.png";
import emailIcon from "../assets/images/Container (10).png";

import { Link } from "react-router-dom";

const QUICK_LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Our Services" },
  { to: "/facilities", label: "Our Facilities" },
  { to: "/doctors", label: "Our Doctors" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

export default function Footer({
  phone,
  whatsapp,
  address,
  city,
}) {

  const displayPhone = phone || "02 666 99 45";
  const displayWhatsapp = whatsapp || "050 346 9945";
  const displayAddress =
    address || "Junaibi Tower, 2nd Floor, Muroor";
  const displayCity =
    city || "Abu Dhabi, UAE";

  return (
    <footer className="site-footer">

      <div className="wrap">

        <div className="footer-grid">

          {/* =================================================
              BRAND
          ================================================= */}

          <div className="footer-brand">

            <div className="footer-logo">
              <img
                src={logo}
                alt="Genet Dental Center"
              />
            </div>

            <p className="footer-description">
              Smiles Always... Providing premium dental care
              with a focus on your comfort and well-being.
            </p>

            <div className="footer-social">

              {/* EMAIL */}
              <a
                href="mailto:info@genetdental.com"
                aria-label="Email Genet Dental"
                className="footer-social-link"
              >
                <img
                  src={emailIcon}
                  alt=""
                />
              </a>


              {/* INSTAGRAM */}
              <a
                href="https://www.instagram.com/genet_dental/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="footer-social-link"
              >
                <img
                  src={instagramIcon}
                  alt=""
                />
              </a>


              {/* FACEBOOK */}
              <a
                href="https://www.facebook.com/gdckolynos/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="footer-social-link"
              >
                <img
                  src={facebookIcon}
                  alt=""
                />
              </a>


              {/* LINKEDIN */}
              <a
                href="https://ae.linkedin.com/company/genetmedicalcenter"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="footer-social-link footer-linkedin"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM3.54 20.45H7.1V8.99H3.54v11.46Z" />
                </svg>
              </a>

            </div>

          </div>


          {/* =================================================
              QUICK LINKS
          ================================================= */}

          <div className="footer-col">

            <h5>Quick Links</h5>

            <ul>

              {QUICK_LINKS.map((link) => (

                <li key={link.label}>

                  <Link to={link.to}>
                    {link.label}
                  </Link>

                </li>

              ))}

            </ul>

          </div>


          {/* =================================================
              CONTACT US
          ================================================= */}

          <div className="footer-col">

            <h5>Contact Us</h5>

            <ul>

              {/* PHONE */}
              <li>
                <a
                  href="tel:+97126669945"
                  className="footer-contact-link footer-contact-item"
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

                  <span>{displayPhone}</span>
                </a>
              </li>


              {/* WHATSAPP */}
              <li>
                <a
                  href="https://wa.me/971503469945"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-contact-link footer-contact-item"
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
                    <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0
                      C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.2 1.7 6L.2 24
                      l6.4-1.7a11.8 11.8 0 0 0 5.5 1.4
                      h.1c6.5 0 11.8-5.3 11.8-11.8
                      0-3.2-1.2-6.2-3.5-8.4Z"
                    />
                    <path d="M8.3 6.8c.2-.4.4-.4.8-.4h.6c.2 0 .4.1.5.4
                      l.9 2.1c.1.3.1.5-.1.8l-.7.9
                      c.8 1.5 2 2.7 3.5 3.5l.9-.7
                      c.3-.2.5-.2.8-.1l2.1.9c.3.1.4.3.4.5
                      v.6c0 .4-.1.6-.4.8
                      -.5.4-1.2.6-1.8.5
                      -2.3-.3-4.5-1.5-6.2-3.2
                      -1.7-1.7-2.9-3.9-3.2-6.2
                      -.1-.7.1-1.3.5-1.8Z"
                    />
                  </svg>

                  <span>{displayWhatsapp}</span>
                </a>
              </li>


              {/* LOCATION */}
              <li className="footer-address">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Junaibi+Tower%2C+2nd+Floor%2C+Muroor+Road%2C+Abu+Dhabi%2C+UAE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-contact-link footer-contact-item footer-location-link"
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
                    <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
                    <circle cx="12" cy="10" r="2.6" />
                  </svg>

                  <span>
                    {displayAddress}
                    <br />
                    {displayCity}
                  </span>
                </a>
              </li>

            </ul>

          </div>


          {/* =================================================
              WORKING HOURS
          ================================================= */}

          <div className="footer-col">

            <h5>Working Hours</h5>

            <ul>

              <li>Sun - Sat</li>

              <li>9:30 AM - 8:30 PM</li>

            </ul>

          </div>

        </div>


        {/* ===================================================
            FOOTER BOTTOM
        =================================================== */}

        <div className="footer-bottom">

          © {new Date().getFullYear()} Genet Dental Center.
          Smiles always...

        </div>

      </div>

    </footer>
  );
}