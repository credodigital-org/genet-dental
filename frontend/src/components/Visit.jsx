import "../styles/Visit.css";
import mapImage from "../assets/images/map.jpg";

const ADDRESS = "Junaibi Tower, 2nd Floor, Muroor Road";
const CITY = "Abu Dhabi, UAE";
const PHONE = "02 666 99 45";
const EMAIL = "info@genetdental.com";

const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Junaibi+Tower%2C+2nd+Floor%2C+Muroor+Road%2C+Abu+Dhabi%2C+UAE";

export default function Visit() {
  return (
    <section
      id="contact"
      className="visit-section"
    >
      <div className="wrap">

        {/* =================================================
            SECTION HEADING
        ================================================= */}

        <div
          className="section-head"
          style={{ marginBottom: 44 }}
        >
          <h2>Visit Our Center</h2>

          <p>
            We are conveniently located in the heart of Abu Dhabi,
            ready to welcome you.
          </p>
        </div>


        <div className="visit-grid">

          <div>

            {/* =================================================
                ADDRESS
            ================================================= */}

            <div className="visit-item">

              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="visit-full-link"
                aria-label="Open Genet Dental Center location in Google Maps"
              >

                <div className="visit-icon">
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
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </div>

                <div className="visit-content">
                  <h4>Address</h4>

                  <p>
                    {ADDRESS}
                    <br />
                    {CITY}
                  </p>
                </div>

              </a>

            </div>


            {/* =================================================
                PHONE
            ================================================= */}

            <div className="visit-item">

              <a
                href="tel:+97126669945"
                className="visit-full-link"
                aria-label="Call Genet Dental Center"
              >

                <div className="visit-icon">
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
                </div>

                <div className="visit-content">
                  <h4>Phone</h4>

                  <p>{PHONE}</p>
                </div>

              </a>

            </div>


            {/* =================================================
                EMAIL
            ================================================= */}

            <div className="visit-item">

              <a
                href={`mailto:${EMAIL}`}
                className="visit-full-link"
                aria-label="Email Genet Dental Center"
              >

                <div className="visit-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                    />

                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </div>

                <div className="visit-content">
                  <h4>Email</h4>

                  <p>{EMAIL}</p>
                </div>

              </a>

            </div>

          </div>


          {/* =================================================
              MAP
          ================================================= */}

          <a
            href={MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="map-frame"
            aria-label="Open Genet Dental Center location in Google Maps"
          >
            <img
              src={mapImage}
              alt="Genet Dental Center location map"
            />
          </a>

        </div>

      </div>
    </section>
  );
}