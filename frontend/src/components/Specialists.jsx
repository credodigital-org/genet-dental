import doctor1 from "../assets/images/doctors/doctor2 (1).png";
import doctor2 from "../assets/images/doctors/doctor2 (2).png";
import doctor3 from "../assets/images/doctors/doctor2 (3).png";
import doctor4 from "../assets/images/doctors/doctor2 (4).png";
import doctor5 from "../assets/images/doctors/doctor2 (5).png";
import doctor6 from "../assets/images/doctors/doctor2 (6).png";
import doctor7 from "../assets/images/doctors/doctor2 (7).png";

import { mediaUrl } from "../api";

const FALLBACK_DOCTORS = [
  {
    id: "dr-yadnit",
    name: "Dr. Yadnit Siddharth Bhosale",
    specialty: "Specialist Prosthodontics & Implantologist",
    photo: doctor1,
  },
  {
    id: "dr-lorrain",
    name: "Dr. Lorrain",
    specialty: "General Dentist - BDS",
    photo: doctor7,
  },
  {
    id: "dr-mathew",
    name: "Dr. Mathew",
    specialty: "Specialist Orthodontist - MDS",
    photo: doctor3,
  },
  {
    id: "dr-alaa",
    name: "Dr. Alaa",
    specialty: "General Dentist",
    photo: doctor5,
  },
  {
    id: "dr-shajee",
    name: "Dr. Shajee Mohammed",
    specialty: "GP Dentist",
    photo: doctor2,
  },
  {
    id: "dr-anitab",
    name: "Dr. Anitab Alex",
    specialty: "GP Dentist BDS,MDS",
    photo: doctor4,
  },
  {
    id: "dr-kumar",
    name: "Dr. Kumar Sujeet Upendra Singh",
    specialty: "Specialist Orthodontics",
    photo: doctor6,
  },
];

export default function Specialists({ doctors }) {
  const items =
    doctors && doctors.length >= 7
      ? doctors.map((doctor) => ({
          id: doctor.id,
          name: doctor.name,
          specialty: doctor.specialty,
          photo: mediaUrl(doctor.photo),
        }))
      : FALLBACK_DOCTORS;

  /*
   * Two identical sets.
   * CSS moves the complete track continuously.
   */
  const allDoctors = [...items, ...items];

  return (
    <section className="specialists" id="doctors">
      <div className="wrap">

        {/* Heading */}
        <div className="section-head">
          <h2>Our Specialists</h2>

          <p>
            Meet the experienced team behind every confident smile.
          </p>
        </div>

        {/* Continuous Doctor Carousel */}
        <div className="specialists-carousel">
          <div className="specialists-track">

            {allDoctors.map((doctor, index) => (
              <article
                className="doc-card"
                key={`${doctor.id}-${index}`}
              >
                <div className="doc-photo">
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                  />
                </div>

                <div className="doc-info">
                  <h4>{doctor.name}</h4>

                  <span>{doctor.specialty}</span>
                </div>
              </article>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}