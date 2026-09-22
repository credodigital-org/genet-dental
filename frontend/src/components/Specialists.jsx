import "../styles/Specialists.css";
import { mediaUrl } from "../api";

import drShajee from "../assets/images/doctors/dr-shajee.jpg";
import drYadnit from "../assets/images/doctors/dr-yadnit.jpg";
import drKumar from "../assets/images/doctors/dr-kumar.jpg";
import drMathew from "../assets/images/doctors/dr-mathew.jpg";
import drAnitab from "../assets/images/doctors/dr-anitab.jpg";
import drLorrain from "../assets/images/doctors/dr-lorrain.jpg";
import drAlaa from "../assets/images/doctors/dr-alaa.jpg";

/* =========================================================
   LOCAL FALLBACK DOCTORS

   Order:
   1. Medical Director
   2. Specialist Doctors
   3. General Dentists

   Specialists are always placed before General Dentists.
========================================================= */

const LOCAL_DOCTORS = [
  {
    id: "local-shajee",
    name: "Dr. Shajee Mohammed",
    qualification: "GP Dentist – BDS,MDS",
    photo: drShajee,
    category: "director",
  },

  {
    id: "local-yadnit",
    name: "Dr. Yadnit Siddharth Bhosale",
    qualification: "Specialist Prosthodontics",
    photo: drYadnit,
    category: "specialist",
  },

  {
    id: "local-kumar",
    name: "Dr. Kumar Sujeet Upendra Singh",
    qualification: "Specialist Orthodontics",
    photo: drKumar,
    category: "specialist",
  },

  {
    id: "local-mathew",
    name: "Dr. Mathew",
    qualification: "Specialist Orthodontics - MDS",
    photo: drMathew,
    category: "specialist",
  },

  {
    id: "local-anitab",
    name: "Dr. Anitab Alex",
    qualification: "GP Dentist - BDS, MDS",
    photo: drAnitab,
    category: "general",
  },

  {
    id: "local-lorrain",
    name: "Dr. Lorrain",
    qualification: "General Dentist - BDS",
    photo: drLorrain,
    category: "general",
  },

  {
    id: "local-alaa",
    name: "Dr. Alaa",
    qualification: "General Dentist",
    photo: drAlaa,
    category: "general",
  },
];

/* =========================================================
   CATEGORY HELPER

   This also makes backend doctors work even if the backend
   does not yet have a dedicated category field.
========================================================= */

// function getDoctorCategory(doctor) {
//   if (doctor.category) {
//     return doctor.category.toLowerCase();
//   }

//   if (doctor.role) {
//     const role = doctor.role.toLowerCase();

//     if (
//       role.includes("director") ||
//       role.includes("medical")
//     ) {
//       return "director";
//     }

//     if (role.includes("special")) {
//       return "specialist";
//     }

//     if (role.includes("general")) {
//       return "general";
//     }
//   }

//   const qualification = (
//     doctor.qualification ||
//     doctor.specialty ||
//     ""
//   ).toLowerCase();

//   if (
//     qualification.includes("director") ||
//     qualification.includes("medical director")
//   ) {
//     return "director";
//   }

//   if (
//     qualification.includes("specialist") ||
//     qualification.includes("orthodont") ||
//     qualification.includes("prosthodont") ||
//     qualification.includes("endodont") ||
//     qualification.includes("periodont") ||
//     qualification.includes("oral surgeon")
//   ) {
//     return "specialist";
//   }

//   return "general";
// }
function getDoctorCategory(doctor) {
  /* =========================================================
     NORMALIZE CATEGORY
     Converts:
       medical_director
       medical-director
       Medical Director
     into:
       medicaldirector
  ========================================================= */

  const normalize = (value) =>
    String(value || "")
      .toLowerCase()
      .replace(/[_-]/g, " ")
      .trim();

  /* =========================================================
     1. BACKEND CATEGORY
  ========================================================= */

  const category = normalize(doctor.category);

  if (
    category === "medical director" ||
    category === "director"
  ) {
    return "director";
  }

  if (category === "specialist") {
    return "specialist";
  }

  if (
    category === "general" ||
    category === "general dentist"
  ) {
    return "general";
  }

  /* =========================================================
     2. BACKEND is_medical_director FLAG
  ========================================================= */

  if (doctor.is_medical_director === true) {
    return "director";
  }

  /* =========================================================
     3. ROLE
  ========================================================= */

  const role = normalize(doctor.role);

  if (
    role === "medical director" ||
    role === "director"
  ) {
    return "director";
  }

  if (role.includes("special")) {
    return "specialist";
  }

  if (role.includes("general")) {
    return "general";
  }

  /* =========================================================
     4. SPECIALTY
  ========================================================= */

  const specialty = normalize(doctor.specialty);

  if (
    specialty === "medical director" ||
    specialty === "director"
  ) {
    return "director";
  }

  if (specialty.includes("specialist")) {
    return "specialist";
  }

  /* =========================================================
     5. QUALIFICATION
  ========================================================= */

  const qualification = normalize(
    doctor.qualification
  );

  if (
    qualification === "medical director" ||
    qualification.includes("medical director")
  ) {
    return "director";
  }

  if (
    qualification.includes("specialist") ||
    qualification.includes("orthodont") ||
    qualification.includes("prosthodont") ||
    qualification.includes("endodont") ||
    qualification.includes("periodont") ||
    qualification.includes("oral surgeon")
  ) {
    return "specialist";
  }

  /* =========================================================
     6. DEFAULT
  ========================================================= */

  return "general";
}
/* =========================================================
   SORT DOCTORS

   Director first
   Specialists second
   General dentists last

   This is what makes a newly added specialist appear
   before the general dentists automatically.
========================================================= */

// function sortDoctors(doctors) {
//   const priority = {
//     director: 0,
//     specialist: 1,
//     general: 2,
//   };

//   return [...doctors].sort((a, b) => {
//     const categoryA = getDoctorCategory(a);
//     const categoryB = getDoctorCategory(b);

//     return (
//       (priority[categoryA] ?? 2) -
//       (priority[categoryB] ?? 2)
//     );
//   });
// }

// function sortDoctors(doctors) {
//   const priority = {
//     director: 0,
//     specialist: 1,
//     general: 2,
//   };

//   return [...doctors].sort((a, b) => {
//     const categoryA = getDoctorCategory(a);
//     const categoryB = getDoctorCategory(b);

//     const priorityA = priority[categoryA] ?? 2;
//     const priorityB = priority[categoryB] ?? 2;

//     return priorityA - priorityB;
//   });
// }

function sortDoctors(doctors) {
  const priority = {
    director: 0,
    specialist: 1,
    general: 2,
  };

  return [...doctors].sort((a, b) => {
    const categoryA = getDoctorCategory(a);
    const categoryB = getDoctorCategory(b);

    return (
      (priority[categoryA] ?? 2) -
      (priority[categoryB] ?? 2)
    );
  });
}

export default function Specialists({ doctors = [] }) {
  const hasBackend =
    Array.isArray(doctors) && doctors.length > 0;

  const sourceDoctors = hasBackend
    ? doctors
    : LOCAL_DOCTORS;

  const sortedDoctors = sortDoctors(sourceDoctors);

  /*
    First doctor = Medical Director.

    Everyone else is placed into the flower rows.
    Every row can contain up to 3 doctors.

    This means if one specialist leaves, the next doctor
    automatically moves upward.
  */
  const director = sortedDoctors.find(
    (doctor) => getDoctorCategory(doctor) === "director"
  );

  const otherDoctors = sortedDoctors.filter(
    (doctor) => doctor !== director
  );

  /* Split remaining doctors into groups of 3 */
  const flowerRows = [];

  for (let i = 0; i < otherDoctors.length; i += 3) {
    flowerRows.push(otherDoctors.slice(i, i + 3));
  }

  return (
    <section className="specialists" id="doctors">
      <div className="specialists-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="specialists-header">
          <h2>Our Doctors</h2>
        </div>

        {/* =================================================
            MEDICAL DIRECTOR
        ================================================= */}

        {director && (
          <div className="director-wrapper">
            <DoctorCard
              doctor={director}
              index={0}
              isBackend={hasBackend}
              category="director"
            />
          </div>
        )}

        {/* =================================================
            FLOWER ROWS
        ================================================= */}

        <div className="flower-doctors">

          {flowerRows.map((row, rowIndex) => (
            <div
              className={`flower-row flower-row-${row.length}`}
              key={`flower-row-${rowIndex}`}
            >

              {row.map((doctor, index) => (
                <DoctorCard
                  key={
                    doctor.id ||
                    `${doctor.name}-${rowIndex}-${index}`
                  }
                  doctor={doctor}
                  index={index}
                  isBackend={hasBackend}
                  category={getDoctorCategory(doctor)}
                />
              ))}

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

/* =========================================================
   DOCTOR CARD
========================================================= */

function DoctorCard({
  doctor,
  isBackend,
  category,
}) {
  const imageSrc = isBackend
    ? mediaUrl(doctor.photo)
    : doctor.photo;

  return (
    <div
      className={`doctor-card doctor-${category}`}
    >
      <div className="doctor-photo">
        <img
          src={imageSrc}
          alt={doctor.name}
        />
      </div>

      <div className="doctor-info">

        <h4>{doctor.name}</h4>

        <span>
          {doctor.qualification ||
            doctor.specialty ||
            "Dental Specialist"}
        </span>

      </div>
    </div>
  );
}