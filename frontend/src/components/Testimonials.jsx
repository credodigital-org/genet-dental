const FALLBACK_TESTIMONIALS = [
  {
    id: 1,
    patient_name: "Sarah Johnson",
    role_label: "Verified Patient",
    quote:
      "The most professional and gentle dental experience I've ever had. The facility is state-of-the-art and the staff is incredibly welcoming.",
  },
  {
    id: 2,
    patient_name: "Michael Chen",
    role_label: "Verified Patient",
    quote:
      "I was always nervous about dental visits, but the doctors made me feel completely at ease. My orthodontic treatment has been life-changing.",
  },
  {
    id: 3,
    patient_name: "Emma Williams",
    role_label: "Verified Patient",
    quote:
      "Excellent service from start to finish. The whitening results are amazing, and the boutique hospitality really sets them apart.",
  },
];

export default function Testimonials({ testimonials }) {
  const items = testimonials && testimonials.length ? testimonials : FALLBACK_TESTIMONIALS;

  return (
    <section style={{ background: "#FAF9FD" }}>
      <div className="wrap">
        <div className="section-head">
          <h2>Patient Testimonials</h2>
          <p>Hear from our patients about their experiences at Genet Dental Center.</p>
        </div>
        <div className="testimonials-grid">
          {items.map((t) => (
            <div className="t-card" key={t.id}>
              <div className="stars">{"★".repeat(t.rating || 5)}</div>
              <p>&quot;{t.quote}&quot;</p>
              <div className="t-name">{t.patient_name}</div>
              <div className="t-role">{t.role_label || "Verified Patient"}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
