import "../styles/Treatments.css";
import { mediaUrl } from "../api";

export default function Treatments({ treatments = [] }) {
  return (
    <section id="services">
      <div className="wrap">
        <div className="section-head">
          <h2>Comprehensive Treatments</h2>

          <p>
            Tailored dental solutions to meet all your oral health needs under
            one roof.
          </p>
        </div>

        {treatments.length > 0 && (
          <div className="treatments-grid">
            {treatments.map((t) => (
              <div className="treatment-card" key={t.id}>
                <div className="treatment-thumb">
                  {t.image && (
                    <img
                      src={mediaUrl(t.image)}
                      alt={t.name}
                    />
                  )}
                </div>

                <p>{t.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}