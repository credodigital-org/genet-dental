import { useEffect, useState } from "react";
import PageHero from "../components/PageHero";
import Insurance from "../components/Insurance";
import { WhatsAppIcon } from "../components/Header";
import { apiGet, mediaUrl } from "../api";
import doctorsHero from "../assets/images/doctors-hero.png";
import "../styles/DoctorsPage.css";


function BookConsultationButton() {
  return (
    // <a
    //   href="/contact"
    //   className="btn btn-purple doc-book-btn"
    // >

//     <a
//   href="/contact"
//   className="booking-btn doc-book-btn"
// >
//       <WhatsAppIcon />
//       Book Consultation
//     </a>

<a
  href="tel:+97126669945"
  className="hero-booking btn btn-purple"
>
  <svg
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

  <span>Book Appointment</span>
</a>
  );
}


export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    apiGet("doctors")
      .then((data) => {
        setDoctors(Array.isArray(data) ? data : []);
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  const director = doctors.find(
    (d) => d.category === "medical_director"
  );

  const specialists = doctors.filter(
    (d) => d.category === "specialist"
  );

  const general = doctors.filter(
    (d) => d.category === "general"
  );


  return (
    <>
      {/* =====================================================
          PAGE HERO
      ===================================================== */}
{/* 
      <PageHero
        eyebrow="Our Doctors"
        title="Meet Our Expert Doctors"
        description="Meet our team of experienced and compassionate dental professionals dedicated to your oral health. With expert care and advanced treatments, we're here to help you achieve a healthier, confident smile."
        backgroundImage={doctorsHero}
      /> */}
      <PageHero
  className="doctors-page-hero"
  eyebrow="Our Doctors"
  title="Meet Our Expert Doctors"
  description="Meet our team of experienced and compassionate dental professionals dedicated to your oral health. With expert care and advanced treatments, we're here to help you achieve a healthier, confident smile."
  backgroundImage={doctorsHero}
/>


      {/* =====================================================
          DOCTORS CONTENT
      ===================================================== */}

      {loading ? (
        <div className="wrap api-loading">
          Loading doctors…
        </div>
      ) : error ? (
        <div className="wrap api-error">
          Unable to load doctors from the server.
        </div>
      ) : (
        <>
          {/* =================================================
              MEDICAL DIRECTOR
          ================================================= */}

          {/* {director && (
            <section> */}

            {director && ( 
  <section className="medical-director-section">
              <div className="wrap">

                <h2 className="doc-section-title">
                  Medical Director
                </h2>

                <div className="director-card">

                  <div className="director-photo">
                    <img
                      src={mediaUrl(director.photo)}
                      alt={director.name}
                    />
                  </div>

                  <div className="director-body">

                    <h3>
                      {director.name}
                    </h3>

                    <span className="doc-badge">
                      {(
                        director.qualification ||
                        director.specialty ||
                        ""
                      ).toUpperCase()}
                    </span>

                    <p>
                      {director.bio}
                    </p>

                    <BookConsultationButton />

                  </div>

                </div>

              </div>
            </section>
          )}


          {/* =================================================
              SPECIALIST DOCTORS
          ================================================= */}

          {/* <section
            style={{
              background: "#FAF9FD",
              paddingTop: 0,
            }}
          > */}

          <section className="specialist-doctors-section">
            <div className="wrap">

              <h2 className="doc-section-title">
                Specialist Doctors
              </h2>

              <div className="doctors-grid">

                {specialists.map((doctor) => (
                  <div
                    className="doctor-page-card"
                    key={doctor.id}
                  >

                    <div className="doctor-page-photo">
                      <img
                        src={mediaUrl(doctor.photo)}
                        alt={doctor.name}
                      />
                    </div>

                    <h4>
                      {doctor.name}
                    </h4>

                    <span className="doc-badge">
                      {(
                        doctor.qualification ||
                        doctor.specialty ||
                        ""
                      ).toUpperCase()}
                    </span>


                    {doctor.specialties_list?.length > 0 && (
                      <ul className="doc-specialties">

                        {doctor.specialties_list.map(
                          (specialty, index) => (
                            <li key={index}>
                              {specialty}
                            </li>
                          )
                        )}

                      </ul>
                    )}


                    <BookConsultationButton />

                  </div>
                ))}

              </div>

            </div>
          </section>


          {/* =================================================
              GENERAL DENTISTS
          ================================================= */}

          {/* <section> */}
          <section className="general-doctors-section">
            <div className="wrap">

              <h2 className="doc-section-title">
                General Dentists
              </h2>

              <div className="doctors-grid">

                {general.map((doctor) => (
                  <div
                    className="doctor-page-card"
                    key={doctor.id}
                  >

                    <div className="doctor-page-photo">
                      <img
                        src={mediaUrl(doctor.photo)}
                        alt={doctor.name}
                      />
                    </div>

                    <h4>
                      {doctor.name}
                    </h4>

                    <span className="doc-badge">
                      {(
                        doctor.qualification ||
                        doctor.specialty ||
                        ""
                      ).toUpperCase()}
                    </span>


                    {doctor.bio && (
                      <p className="doc-bio">
                        {doctor.bio}
                      </p>
                    )}


                    <BookConsultationButton />

                  </div>
                ))}

              </div>

            </div>
          </section>
        </>
      )}


      {/* =====================================================
          INSURANCE
      ===================================================== */}

      <Insurance />

    </>
  );
}