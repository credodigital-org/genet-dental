import { useState } from "react";
import { submitContactMessage } from "../api";
import "../styles/ContactPage.css";

export default function ContactPage() {
  const [form, setForm] = useState({ full_name: "", email: "", subject: "", phone: "", comments: "" });
  const [notRobot, setNotRobot] = useState(false);
  const [status, setStatus] = useState(null);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!notRobot) {
      setStatus("robot");
      return;
    }
    setStatus("sending");
    try {
      await submitContactMessage(form);
      setStatus("sent");
      setForm({ full_name: "", email: "", subject: "", phone: "", comments: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <section className="contact-section">
      <div className="wrap">
        <div className="contact-panel">
          <div className="contact-side">
            <span className="eyebrow">GET IN TOUCH</span>

            <div className="contact-side-item">
              <span className="contact-side-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" /><circle cx="12" cy="10" r="2.6" />
                </svg>
              </span>
              <div>
                <h4>Locations</h4>
                <p>Junaibi Tower, 2nd Floor, Muroor Road, Abu Dhabi, UAE</p>
              </div>
            </div>

            <div className="contact-side-item">
              <span className="contact-side-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 3a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.5c1 .4 2 .6 3 .7a2 2 0 0 1 1.7 2Z" />
                </svg>
              </span>
              <div>
                <h4>Phone Support</h4>
                <p>Tel: 02 666 99 45</p>
                <span className="contact-side-note">Genet Dental Specialized Center</span>
              </div>
            </div>

            <div className="contact-side-hours">
              Working Hours: Sun - Sat (9:30 AM - 8:30 PM)
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Contact Us</h2>
            <p className="contact-form-lead">Please feel free to speak with one of our customer representatives. We are happy to serve you.</p>

            <div className="field-row">
              <div className="field">
                <label>Full Name*</label>
                <input type="text" placeholder="John Doe" required value={form.full_name} onChange={(e) => update("full_name", e.target.value)} />
              </div>
              <div className="field">
                <label>Email*</label>
                <input type="email" placeholder="john@example.com" required value={form.email} onChange={(e) => update("email", e.target.value)} />
              </div>
            </div>
            <div className="field-row">
              <div className="field">
                <label>Subject*</label>
                <input type="text" placeholder="Appointment Inquiry" required value={form.subject} onChange={(e) => update("subject", e.target.value)} />
              </div>
              <div className="field">
                <label>Phone No*</label>
                <input type="text" placeholder="+971 50 000 0000" required value={form.phone} onChange={(e) => update("phone", e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label>Comments</label>
              <textarea placeholder="How can we help you?" value={form.comments} onChange={(e) => update("comments", e.target.value)} />
            </div>

            <label className="recaptcha-box">
              <input type="checkbox" checked={notRobot} onChange={(e) => setNotRobot(e.target.checked)} />
              <span>I'm not a robot</span>
            </label>

            <button className="btn btn-purple" type="submit" disabled={status === "sending"} style={{ width: "100%" }}>
              {status === "sending" ? "Sending..." : "Submit"}
            </button>
            {status === "sent" && <p className="form-note form-note-success">Thanks for reaching out — we'll get back to you shortly.</p>}
            {status === "error" && <p className="form-note form-note-error">Something went wrong. Please try again.</p>}
            {status === "robot" && <p className="form-note form-note-error">Please confirm you're not a robot.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
