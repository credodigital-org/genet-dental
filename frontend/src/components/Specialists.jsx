import "../styles/Specialists.css";
import { mediaUrl } from "../api";

import drShajee from "../assets/images/doctors/dr-shajee.jpg";
import drYadnit from "../assets/images/doctors/dr-yadnit.jpg";
import drKumar from "../assets/images/doctors/dr-kumar.jpg";
import drMathew from "../assets/images/doctors/dr-mathew.jpg";
import drAnitab from "../assets/images/doctors/dr-anitab.jpg";
import drLorrain from "../assets/images/doctors/dr-lorrain.jpg";
import drAlaa from "../assets/images/doctors/dr-alaa.jpg";

// Ordered to support both desktop staggered positions and mobile grid pairs
const LOCAL_DOCTORS = [
  {
    id: "local-shajee",
    name: "Dr. Shajee Mohammed",
    qualification: "GP Dentist – BDS,MDS",
    photo: drShajee,
    role: "shajee",
  },
  {
    id: "local-yadnit",
    name: "Dr. Yadnit Siddharth Bhosale",
    qualification: "Specialist Prosthodontics",
    photo: drYadnit,
    role: "yadnit",
  },
  {
    id: "local-kumar",
    name: "Dr. Kumar Sujeet Upendra Singh",
    qualification: "Specialist Orthodontics",
    photo: drKumar,
    role: "kumar",
  },
  {
    id: "local-mathew",
    name: "Dr. Mathew",
    qualification: "Specialist Orthodontics - MDS",
    photo: drMathew,
    role: "mathew",
  },
  {
    id: "local-anitab",
    name: "Dr. Anitab Alex",
    qualification: "GP Dentist - BDS, MDS",
    photo: drAnitab,
    role: "anitab",
  },
  {
    id: "local-lorrain",
    name: "Dr. Lorrain",
    qualification: "General Dentist - BDS",
    photo: drLorrain,
    role: "lorrain",
  },
  {
    id: "local-alaa",
    name: "Dr. Alaa",
    qualification: "General Dentist",
    photo: drAlaa,
    role: "alaa",
  },
];

export default function Specialists({ doctors = [] }) {
  const hasBackend = Array.isArray(doctors) && doctors.length > 0;
  const displayDoctors = hasBackend ? doctors : LOCAL_DOCTORS;

  return (
    <section className="specialists" id="doctors">
      <div className="specialists-container">
        <div className="specialists-header">
          <h2>Our Specialists</h2>
        </div>

        <div className="specialists-grid">
          {displayDoctors.map((doc, index) => {
            const isLocal = doc.id?.toString().startsWith("local-");
            const imageSrc = isLocal ? doc.photo : mediaUrl(doc.photo);

            return (
              <div
                className={`doctor-card doc-${doc.role || index}`}
                key={doc.id || `${doc.name}-${index}`}
              >
                <div className="doctor-photo">
                  <img src={imageSrc} alt={doc.name} />
                </div>
                <div className="doctor-info">
                  <h4>{doc.name}</h4>
                  <span>
                    {doc.qualification || doc.specialty || "Dental Specialist"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}