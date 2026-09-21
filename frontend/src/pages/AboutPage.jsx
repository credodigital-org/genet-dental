import { useEffect, useState } from "react";
import Insurance from "../components/Insurance";
import { apiGet, mediaUrl } from "../api";
import "../styles/AboutPage.css";
import aboutHero from "../assets/images/about-hero.jpg";
import insuranceStrip from "../assets/images/insurance-strip.jpg";

const ICONS = {
  precision: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3v18M3 12h18" /></svg>,
  care: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 21s-7-4.5-9-9.5C1.5 6.9 4.3 4 7.5 4 9.6 4 11.1 5.1 12 6.5 12.9 5.1 14.4 4 16.5 4c3.2 0 6 2.9 4.5 7.5C19 16.5 12 21 12 21Z" /></svg>,
  innovation: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="9" r="6.5" /><path d="M9.5 21h5M10 18v3M14 18v3" /></svg>,
};

const CORE_VALUES = [
  { title: "Clinical Precision", description: "Leveraging advanced diagnostic tools and meticulous techniques to ensure highly accurate, definitive, and long-lasting treatments.", icon_name: "precision" },
  { title: "Compassionate Care", description: "Putting patient comfort first. We cultivate a calm, reassuring environment, listening attentively to your concerns and designing anxiety-free experiences.", icon_name: "care" },
  { title: "Continuous Innovation", description: "Staying ahead with state-of-the-art facilities, modern materials, and ongoing education to deliver the most effective and efficient modern dentistry.", icon_name: "innovation" },
];

export default function AboutPage() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiGet("gallery")
      .then((data) => setGallery(Array.isArray(data) ? data : []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="about-hero" style={{ backgroundImage: `url(${aboutHero})` }} />
      <section className="about-intro">
        <div className="wrap">
          <h1>Excellence in Every Smile</h1>
          <p>Providing world-class dental care with unyielding precision and profound compassion. Your journey to perfect oral health begins here in a meticulously designed, sterile, and calming environment.</p>
          <a href="/contact" className="btn btn-purple">Book Appointment</a>
        </div>
      </section>
      <section style={{ background: "var(--lavender)" }}>
        <div className="wrap about-story">
          <h2>Our Story</h2>
          <p>For over 12 years, Genet Specialized Dental Center has been at the forefront of dental innovation and patient-centered care. Founded on the principles of clinical excellence and profound empathy, we have transformed the smiles of thousands. Our commitment extends beyond just treating teeth; we focus on comprehensive oral wellness, ensuring every patient feels secure, informed, and completely cared for in our state-of-the-art facility. We are continuously evolving, integrating the latest advancements to provide a sophisticated, pain-free dental experience.</p>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="section-head"><h2>Core Values</h2><p>The principles that guide our practice.</p></div>
          <div className="values-grid">
            {CORE_VALUES.map((value) => <div className="value-card" key={value.title}><span className="value-icon">{ICONS[value.icon_name]}</span><h4>{value.title}</h4><p>{value.description}</p></div>)}
          </div>
        </div>
      </section>
      <section style={{ background: "var(--lavender)" }}>
        <div className="wrap">
          <div className="section-head"><h2>Our Memories</h2><p>Take a glimpse into the moments we've shared and celebrated together, memories that reflect our care, commitment, and journey.</p></div>
          {loading ? <div className="api-loading">Loading memories…</div> : error ? <div className="api-error">Unable to load gallery memories.</div> : <div className="memories-grid">{gallery.map((item) => <div className="memory-tile" key={item.id}><img src={mediaUrl(item.photo)} alt={item.caption || "Genet Dental memory"} /></div>)}</div>}
        </div>
      </section>
      <Insurance image={insuranceStrip} />
    </>
  );
}
