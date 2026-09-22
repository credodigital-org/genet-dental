import { useEffect, useState } from "react";
import Insurance from "../components/Insurance";
import { WhatsAppIcon } from "../components/Header";
import { apiGet, mediaUrl } from "../api";
import "../styles/AboutPage.css";

import aboutHero from "../assets/images/about-hero.png";
import insuranceStrip from "../assets/images/insurance-strip.jpg";

// Original Core Value Icons
import precisionIcon from "../assets/images/icons/Icon.png";
import careIcon from "../assets/images/icons/Icon1.png";
import innovationIcon from "../assets/images/icons/Icon2.png";

/* =========================================================
   CORE VALUE ICONS
========================================================= */

const ICONS = {
  precision: precisionIcon,
  care: careIcon,
  innovation: innovationIcon,
};

/* =========================================================
   CORE VALUES
========================================================= */

const CORE_VALUES = [
  {
    title: "Clinical Precision",
    description:
      "Leveraging advanced diagnostic tools and meticulous techniques to ensure highly accurate, definitive, and long-lasting treatments.",
    icon_name: "precision",
  },
  {
    title: "Compassionate Care",
    description:
      "Putting patient comfort first. We cultivate a calm, reassuring environment, listening attentively to your concerns and designing anxiety-free experiences.",
    icon_name: "care",
  },
  {
    title: "Continuous Innovation",
    description:
      "Staying ahead with state-of-the-art facilities, modern materials, and ongoing education to deliver the most effective and efficient modern dentistry.",
    icon_name: "innovation",
  },
];

/* =========================================================
   ABOUT PAGE
========================================================= */

export default function AboutPage() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =======================================================
     LOAD GALLERY
  ======================================================= */

  useEffect(() => {
    apiGet("gallery")
      .then((data) => {
        setGallery(Array.isArray(data) ? data : []);
      })
      .catch((e) => {
        console.error("Gallery loading error:", e);
        setError(e.message || "Unable to load gallery.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* ===================================================
          HERO
      =================================================== */}

      <section className="about-hero">
        <img
          src={aboutHero}
          alt="Genet Dental Specialized Center"
        />
      </section>

      {/* ===================================================
          INTRO
      =================================================== */}

      <section className="about-intro">
        <div className="wrap">

          <h1>Excellence in Every Smile</h1>

          <p>
            At Genet Dental Specialized Center, we combine advanced
            technology, experienced specialists, and compassionate care
            to provide comprehensive dental treatment in a comfortable
            and welcoming environment.
          </p>

          {/* <a href="/contact" className="navbar-booking">
            <WhatsAppIcon />
            <span>Book Appointment</span>
          </a> */}
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
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.35 1.78.7 2.63a2 2 0 0 1-.45 2.11L8.09 9.73a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.85.35 1.73.58 2.63.7A2 2 0 0 1 22 16.92z" />
  </svg>

  <span>Book Appointment</span>
</a>

        </div>
      </section>

      {/* ===================================================
          OUR STORY
      =================================================== */}

      <section className="about-story-section">
        <div className="wrap">

          <div className="about-story">

            <h2>Our Story</h2>

            <p>
              For over 12 years, Genet Specialized Dental Center has
              been at the forefront of dental innovation and
              patient-centered care. Founded on the principles of
              clinical excellence and profound empathy, we have
              transformed the smiles of thousands. Our commitment
              extends beyond just treating teeth; we focus on
              comprehensive oral wellness, ensuring every patient feels
              secure, informed, and completely cared for in our
              state-of-the-art facility. We are continuously evolving,
              integrating the latest advancements to provide a
              sophisticated, pain-free dental experience.
            </p>

          </div>

        </div>
      </section>

      {/* ===================================================
          CORE VALUES
      =================================================== */}

      <section className="about-values-section">
        <div className="wrap">

          <div className="about-section-heading">

            <h2>Core Values</h2>

            <p>
              The principles that guide our practice.
            </p>

          </div>

          <div className="values-grid">

            {CORE_VALUES.map((value) => (
              <article
                className="value-card"
                key={value.title}
              >

                <div className="value-icon">
                  <img
                    src={ICONS[value.icon_name]}
                    alt=""
                  />
                </div>

                <h4>{value.title}</h4>

                <p>{value.description}</p>

              </article>
            ))}

          </div>

        </div>
      </section>

      {/* ===================================================
          OUR MEMORIES
      =================================================== */}

      <section className="about-memories-section">
        <div className="wrap">

          <div className="about-section-heading">

            <h2>Our Memories</h2>

            <p>
              Take a glimpse into the moments we’ve shared and
              celebrated together, memories that reflect our care,
              commitment, and journey.
            </p>

          </div>

          {/* Loading */}

          {loading && (
            <div className="gallery-message">
              Loading gallery...
            </div>
          )}

          {/* Error */}

          {!loading && error && (
            <div className="gallery-message gallery-error">
              {error}
            </div>
          )}

          {/* Gallery */}

          {!loading && !error && gallery.length > 0 && (
            <div className="memories-grid">

              {gallery.map((item, index) => {

                const image =
                  item.image ||
                  item.photo ||
                  item.file ||
                  item.image_url;

                return (
                  <div
                    className="memory-tile"
                    key={item.id || index}
                  >

                    {image ? (
                      <img
                        src={mediaUrl(image)}
                        alt={
                          item.title ||
                          item.name ||
                          "Genet Dental"
                        }
                      />
                    ) : (
                      <span>
                        Genet Dental Specialized Center
                      </span>
                    )}

                  </div>
                );
              })}

            </div>
          )}

          {/* Empty Gallery */}

          {!loading &&
            !error &&
            gallery.length === 0 && (
              <div className="gallery-empty">

                <div className="memory-placeholder">

                  <span>
                    Genet Dental Specialized Center
                  </span>

                </div>

              </div>
            )}

        </div>
      </section>

      {/* ===================================================
          INSURANCE
      =================================================== */}

      <Insurance image={insuranceStrip} />

    </>
  );
}