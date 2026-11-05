import "../styles/CTASection.css";
import { WhatsAppIcon } from "./Header";
import logoIcon from "../assets/images/logo-icon.png";

export default function CTASection({ phone }) {
  const displayPhone = phone || "02 666 99 45";
  const callNumber = phone
    ? phone.replace(/\s/g, "")
    : "+97126669945";

  return (
    <section style={{ paddingBottom: "88px" }}>
      <div className="cta-wrap">

        <div className="cta-banner">

          <div
            className="cta-hex"
            style={{
              width: 180,
              height: 180,
              top: -60,
              left: "6%"
            }}
          />

          <div
            className="cta-hex"
            style={{
              width: 120,
              height: 120,
              bottom: -40,
              right: "10%"
            }}
          />

          <div
            className="cta-hex"
            style={{
              width: 90,
              height: 90,
              top: "20%",
              right: "22%"
            }}
          />

          <h2>
            Ready to Give Your Smile the Care It Deserves?
          </h2>

          <p>
            Join thousands of satisfied patients who trust us with
            their dental health. Schedule your consultation today.
          </p>

          <div className="cta-actions">

            {/* WHATSAPP BOOKING */}
            <a
              href="https://wa.me/971503469945"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-white"
            >
              <WhatsAppIcon />
              <span>WhatsApp</span>
            </a>


            {/* CALL BOOKING */}
            <a
              href={`tel:${callNumber}`}
              className="btn btn-outline"
            >
              <svg
                width="16"
                height="16"
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

              <span>Call</span>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}