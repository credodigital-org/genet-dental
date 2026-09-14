import { WhatsAppIcon } from "./Header";

export default function CTASection({ phone }) {
  return (
    <section style={{ paddingBottom: "88px" }}>
      <div className="cta-wrap">
        <div className="cta-banner">
          <div className="cta-hex" style={{ width: 180, height: 180, top: -60, left: "6%" }} />
          <div className="cta-hex" style={{ width: 120, height: 120, bottom: -40, right: "10%" }} />
          <div className="cta-hex" style={{ width: 90, height: 90, top: "20%", right: "22%" }} />
          <h2>Ready to Give Your Smile the Care It Deserves?</h2>
          <p>Join thousands of satisfied patients who trust us with their dental health. Schedule your consultation today.</p>
          <div className="cta-actions">
            <a href="#appointment" className="btn btn-white">
              <WhatsAppIcon />
              Book Appointment Now
            </a>
            <a href={`tel:${(phone || "02 666 99 45").replace(/\s/g, "")}`} className="btn btn-outline">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 3a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.5c1 .4 2 .6 3 .7a2 2 0 0 1 1.7 2Z" />
              </svg>
              {phone || "02 666 99 45"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
