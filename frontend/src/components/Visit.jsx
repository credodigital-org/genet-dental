import mapImage from "../assets/images/map.jpg";

export default function Visit({ address, city, phone, email }) {
  const clinicAddress =
    `${address || "Junaibi Tower, 2nd Floor, Muroor Road"}, ${
      city || "Abu Dhabi, UAE"
    }`;

  const emailAddress = email || "info@genetdental.com";

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    clinicAddress
  )}`;

  return (
    <section id="contact" style={{ background: "#FAF9FD" }}>
      <div className="wrap">

        <div className="section-head" style={{ marginBottom: 44 }}>
          <h2>Visit Our Center</h2>
          <p>
            We are conveniently located in the heart of Abu Dhabi,
            ready to welcome you.
          </p>
        </div>

        <div className="visit-grid">

          <div>

            {/* ADDRESS */}
            <div className="visit-item">

              <div className="visit-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
                  <circle cx="12" cy="10" r="2.6" />
                </svg>
              </div>

              <div>
                <h4>Address</h4>

                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="visit-link"
                >
                  <p>
                    {clinicAddress}
                  </p>
                </a>
              </div>

            </div>


            {/* PHONE */}
            <div className="visit-item">

              <div className="visit-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 3a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.5c1 .4 2 .6 3 .7a2 2 0 0 1 1.7 2Z" />
                </svg>
              </div>

              <div>
                <h4>Phone</h4>
                <p>{phone || "02 666 99 45"}</p>
              </div>

            </div>


            {/* EMAIL */}
            <div className="visit-item">

              <div className="visit-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </div>

              <div>
                <h4>Email</h4>

                <a
                  href={`mailto:${emailAddress}`}
                  className="visit-link"
                >
                  <p>{emailAddress}</p>
                </a>

              </div>

            </div>

          </div>


          {/* CLICKABLE MAP */}
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="map-frame map-clickable"
            aria-label="Open Genet Dental Center location in Google Maps"
          >
            <img
              src={mapImage}
              alt="Genet Dental Center location map"
            />

            <span className="map-overlay">
              Open in Google Maps
            </span>
          </a>

        </div>

      </div>
    </section>
  );
}