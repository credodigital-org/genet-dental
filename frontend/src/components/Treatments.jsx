import generalDentistry from "../assets/images/treatments/general-dentistry.jpg";
import paedoDentistry from "../assets/images/treatments/paedo-dentistry.jpg";
import orthodontics from "../assets/images/treatments/orthodontics.jpg";
import periodontics from "../assets/images/treatments/periodontics.jpg";
import oralSurgery from "../assets/images/treatments/oral-maxillofacial-surgery.jpg";
import endodontics from "../assets/images/treatments/endodontics.jpg";
import prosthodontics from "../assets/images/treatments/prosthodontics.jpg";
import { mediaUrl } from "../api";

const FALLBACK_TREATMENTS = [
  { id: "general-dentistry", name: "General Dentistry", photo: generalDentistry },
  { id: "paedo-dentistry", name: "Paedo-Dentistry", photo: paedoDentistry },
  { id: "orthodontics", name: "Orthodontics", photo: orthodontics },
  { id: "periodontics", name: "Periodontics", photo: periodontics },
  { id: "oral-maxillofacial-surgery", name: "Oral & Maxillofacial Surgery", photo: oralSurgery },
  { id: "endodontics", name: "Endodontics", photo: endodontics },
  { id: "prosthodontics", name: "Prosthodontics", photo: prosthodontics },
];

export default function Treatments({ treatments }) {
  const items =
    treatments && treatments.length
      ? treatments.map((t) => ({ id: t.slug, name: t.name, photo: mediaUrl(t.photo) }))
      : FALLBACK_TREATMENTS;

  return (
    <section id="services">
      <div className="wrap">
        <div className="section-head">
          <h2>Comprehensive Treatments</h2>
          <p>Tailored dental solutions to meet all your oral health needs under one roof.</p>
        </div>
        <div className="treatments-grid">
          {items.map((t) => (
            <div className="treatment-card" key={t.id}>
              <div className="treatment-thumb">
                <img src={t.photo} alt={t.name} />
              </div>
              <p>{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
