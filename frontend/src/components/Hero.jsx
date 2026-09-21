import "../styles/Hero.css";

import heroPhoto from "../assets/images/hero-photo.jpg";
import smilesWordmark from "../assets/images/smiles-wordmark.png";

import { WhatsAppIcon } from "./Header";

export default function Hero({ heading, paragraph }) {
  return (
    <section className="hero" id="home">

      <div className="hero-main">

        {/* HERO IMAGE */}
        <div
          className="hero-photo-bleed"
          style={{
            backgroundImage: `url(${heroPhoto})`,
          }}
        />

        {/* HERO CONTENT */}
        <div className="hero-copy">

          <span className="eyebrow">
            <span className="eyebrow-star">★</span>
            <span>PREMIUM DENTAL CARE</span>
          </span>

          <h1>
            <img
              src={smilesWordmark}
              alt={heading || "Smiles Always"}
            />
          </h1>

          <p>
            {paragraph ||
              "Experience world-class dental care in a state-of-the-art facility. We combine rigorous clinical standards with boutique hospitality for a truly premium patient journey."}
          </p>

          {/* =================================================
              HERO BOOKING BUTTON

              DESKTOP >= 1201px:
              HIDDEN — NAVBAR HAS BOOK BUTTON

              981px - 1200px:
              VISIBLE — NAVBAR TOO CROWDED

              <= 980px:
              VISIBLE — TABLET/MOBILE
              ================================================= */}

          <a
            href="/#appointment"
            className="hero-booking btn btn-purple"
          >
            <WhatsAppIcon />

            <span>
              Book Appointment
            </span>

           
          </a>

        </div>

      </div>

    </section>
  );
}