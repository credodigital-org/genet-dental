// import "../styles/Testimonials.css";
// export default function Testimonials({ testimonials = [] }) { if(!testimonials.length)return null; return <section style={{background:"#FAF9FD"}}><div className="wrap"><div className="section-head"><h2>Patient Testimonials</h2><p>Hear from our patients about their experiences at Genet Dental Center.</p></div><div className="testimonials-grid">{testimonials.map(t=><div className="t-card" key={t.id}><div className="stars">{"★".repeat(Math.min(5,Math.max(0,t.rating||0)))}</div><p>&quot;{t.quote}&quot;</p><div className="t-name">{t.patient_name}</div><div className="t-role">{t.role_label}</div></div>)}</div></div></section>; }


import "../styles/Testimonials.css";

export default function Testimonials({ testimonials = [] }) {
  return (
    <section style={{ background: "#FAF9FD" }}>
      <div className="wrap">
        <div className="section-head">
          <h2>Patient Testimonials</h2>

          <p>
            Hear from our patients about their experiences at Genet Dental
            Center.
          </p>
        </div>

        {testimonials.length > 0 && (
          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <div className="t-card" key={t.id}>
                <div className="stars">
                  {"★".repeat(
                    Math.min(5, Math.max(0, t.rating || 0))
                  )}
                </div>

                <p>&quot;{t.quote}&quot;</p>

                <div className="t-name">
                  {t.patient_name}
                </div>

                <div className="t-role">
                  {t.role_label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}