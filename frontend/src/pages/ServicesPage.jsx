import { useEffect, useState } from "react";
import PageHero from "../components/PageHero";
import Insurance from "../components/Insurance";
import { apiGet, mediaUrl } from "../api";

import servicesBackground from "../assets/images/services-hero1.png";
import servicesForeground from "../assets/images/services-hero.png";

import "../styles/ServicesPage.css";


/* =========================================================
   FALLBACK TOOTH ICON
========================================================= */

function GenericToothIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M12 3c-2.5 0-4.5 1.6-4.5 4.2 0 1.6.5 2.2.3 4.2-.2 2-1 3.6-1 5.6 0 1.7.9 3 2 3 1.3 0 1.4-2.4 2 4.6.3-1.2.7-1.7 1.2-1.7s.9.5 1.2 1.7c.6 2.2.7 4.6 2 4.6 1.1 0 2-1.3 2-3 0-2-.8-3.6-1-5.6-.2-2-.8-3.6-1-5.6-.2-2 .3-2.6.3-4.2C16.5 4.6 14.5 3 12 3Z" />
    </svg>
  );
}


/* =========================================================
   SERVICES PAGE
========================================================= */

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  /* =======================================================
     LOAD SERVICES
  ======================================================= */

  useEffect(() => {
    apiGet("services")
      .then((data) => {
        setServices(
          Array.isArray(data) ? data : []
        );
      })
      .catch((e) => {
        console.error("Services loading error:", e);

        setError(
          e.message ||
          "Unable to load services."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  return (
    <>
      {/* ===================================================
          SERVICES HERO
      =================================================== */}

<PageHero
  className="services-page-hero"
  eyebrow="Our Dental Services"
  title="Complete Dental Care, Designed Around Your Smile."
  description="Advanced dental treatments delivered by experienced specialists in a comfortable, patient-focused environment."
  backgroundImage={servicesBackground}
  foregroundImage={servicesForeground}
/>

      {/* ===================================================
          SERVICES
      =================================================== */}

      <section className="services-section">
        <div className="wrap">

          {/* LOADING */}

          {loading && (
            <div className="api-loading">
              Loading services…
            </div>
          )}


          {/* ERROR */}

          {!loading && error && (
            <div className="api-error">
              Unable to load services from the server.
            </div>
          )}


          {/* EMPTY */}

          {!loading &&
            !error &&
            services.length === 0 && (
              <div className="api-empty">
                No services available.
              </div>
            )}


          {/* SERVICES */}

          {!loading &&
            !error &&
            services.length > 0 && (

              <div className="services-grid">

                {services.map((service, index) => (

                  <article
                    className="service-card"
                    key={service.id}
                  >

                    {/* =====================================
                        IMAGE
                    ===================================== */}

                    <div
                      className={`service-card-thumb tone-${
                        index % 4
                      }`}
                    >

                      {service.image ? (
                        <img
                          className="service-card-image"
                          src={mediaUrl(service.image)}
                          alt={service.name}
                        />
                      ) : (
                        <div className="service-card-image-placeholder">
                          <GenericToothIcon />
                        </div>
                      )}


                      {/* SERVICE ICON */}

                      <span className="service-card-badge">

                        {service.icon ? (
                          <img
                            src={mediaUrl(service.icon)}
                            alt=""
                            className="service-card-icon"
                          />
                        ) : (
                          <span className="service-card-default-icon">
                            <GenericToothIcon />
                          </span>
                        )}

                      </span>

                    </div>


                    {/* =====================================
                        SERVICE CONTENT
                    ===================================== */}

                    <div className="service-card-content">

                      <h4>
                        {service.name}
                      </h4>


                      {service.description && (
                        <p>
                          {service.description}
                        </p>
                      )}

                    </div>

                  </article>

                ))}

              </div>

            )}

        </div>
      </section>


      {/* ===================================================
          INSURANCE
      =================================================== */}

      <Insurance />

    </>
  );
}