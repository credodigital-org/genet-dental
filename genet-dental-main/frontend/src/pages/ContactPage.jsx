import { useState } from "react";
import "../styles/ContactPage.css";

export default function ContactPage() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    subject: "",
    phone: "",
    comments: "",
  });

  function update(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const subject =
      form.subject.trim() || "Contact Request - Genet Dental";

    const body = `
Name: ${form.full_name}
Email: ${form.email}
Phone: ${form.phone}

Comments:
${form.comments}
`;

    const mailtoUrl =
      `mailto:info@genetdental.com` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  }

  return (
    <section className="contact-section">
      <div className="wrap">
        <div className="contact-panel">

          {/* =========================================================
              LEFT CONTACT INFORMATION
          ========================================================= */}
          <div className="contact-side">

            <span className="eyebrow">
              GET IN TOUCH
            </span>

            {/* LOCATION */}
            <div className="contact-side-item">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Junaibi+Tower%2C+2nd+Floor%2C+Muroor+Road%2C+Abu+Dhabi%2C+UAE"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-location-link"
                aria-label="Open Genet Dental location in Google Maps"
              >
                <span className="contact-side-icon">
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
                </span>
              </a>

              <div>
                <h4>Locations</h4>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Junaibi+Tower%2C+2nd+Floor%2C+Muroor+Road%2C+Abu+Dhabi%2C+UAE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-location-address"
                >
                  Junaibi Tower, 2nd Floor, Muroor Road,
                  Abu Dhabi, UAE
                </a>
              </div>
            </div>

            {/* PHONE */}
            <div className="contact-side-item">
              <a
                href="tel:+97126669945"
                className="contact-phone-icon-link"
                aria-label="Call Genet Dental Specialized Center"
              >
                <span className="contact-side-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 3a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.5c1 .4 2 .6 3 .7a2 2 0 0 1 1.7 2Z" />
                  </svg>
                </span>
              </a>

              <div>
                <h4>Phone Support</h4>

                <a
                  href="tel:+97126669945"
                  className="contact-phone-link"
                >
                  Tel: 02 666 99 45
                </a>

                <span className="contact-side-note">
                  Genet Dental Specialized Center
                </span>
              </div>
            </div>

            {/* EMAIL */}
            {/* <div className="contact-side-item">
              <a
                href="mailto:info@genetdental.com"
                className="contact-email-icon-link"
                aria-label="Email Genet Dental Specialized Center"
              >
                <span className="contact-side-icon">
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
                </span>
              </a> */}

              {/* <div>
                <h4>Email</h4>

                <a
                  href="mailto:info@genetdental.com"
                  className="contact-email-link"
                >
                  info@genetdental.com
                </a>
              </div> */}
            {/* </div> */}

            {/* WORKING HOURS */}
            <div className="contact-side-hours">
              Working Hours: Sun - Sat (9:30 AM - 8:30 PM)
            </div>
          </div>

          {/* =========================================================
              CONTACT FORM
          ========================================================= */}
          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >
            <h2>Contact Us</h2>

            <p className="contact-form-lead">
              Please feel free to speak with one of our customer
              representatives. We are happy to serve you.
            </p>

            {/* FULL NAME + EMAIL */}
            <div className="field-row">

              <div className="field">
                <label htmlFor="full_name">
                  Full Name*
                </label>

                <input
                  id="full_name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={form.full_name}
                  onChange={(e) =>
                    update("full_name", e.target.value)
                  }
                />
              </div>

              <div className="field">
                <label htmlFor="email">
                  Email*
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  value={form.email}
                  onChange={(e) =>
                    update("email", e.target.value)
                  }
                />
              </div>

            </div>

            {/* SUBJECT + PHONE */}
            <div className="field-row">

              <div className="field">
                <label htmlFor="subject">
                  Subject*
                </label>

                <input
                  id="subject"
                  type="text"
                  placeholder="Appointment Inquiry"
                  required
                  value={form.subject}
                  onChange={(e) =>
                    update("subject", e.target.value)
                  }
                />
              </div>

              <div className="field">
                <label htmlFor="phone">
                  Phone No*
                </label>

                <input
                  id="phone"
                  type="text"
                  placeholder="+971 50 000 0000"
                  required
                  value={form.phone}
                  onChange={(e) =>
                    update("phone", e.target.value)
                  }
                />
              </div>

            </div>

            {/* COMMENTS */}
            <div className="field">
              <label htmlFor="comments">
                Comments
              </label>

              <textarea
                id="comments"
                placeholder="How can we help you?"
                value={form.comments}
                onChange={(e) =>
                  update("comments", e.target.value)
                }
              />
            </div>

            {/* SUBMIT */}
            <button
              className="btn btn-purple"
              type="submit"
              style={{ width: "100%" }}
            >
              Submit
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}