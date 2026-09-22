import { useEffect, useState } from "react";



import heroPhoto from "../assets/images/hero-photo.jpg";
import smilesWordmark from "../assets/images/smiles-wordmark.png";

import { apiGet } from "../api";

import Hero from "../components/Hero";
import ServiceIcons from "../components/ServiceIcons";
import Excellence from "../components/Excellence";
import Treatments from "../components/Treatments";
import Specialists from "../components/Specialists";
import CTASection from "../components/CTASection";
import Testimonials from "../components/Testimonials";
import Insurance from "../components/Insurance";
import Visit from "../components/Visit";

export default function HomePage() {
  const [data, setData] = useState({
    treatments: [],
    doctors: [],
    testimonials: [],
    video: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    Promise.all([
      apiGet("treatments"),
      apiGet("doctors"),
      apiGet("testimonials"),
      apiGet("clinic-info"),
    ])
      .then(
        ([
          treatments,
          doctors,
          testimonials,
          clinicInfo,
        ]) => {
          if (!mounted) return;

          setData({
            treatments: Array.isArray(treatments)
              ? treatments
              : [],

            doctors: Array.isArray(doctors)
              ? doctors
              : [],

            testimonials: Array.isArray(testimonials)
              ? testimonials
              : [],

            video:
              clinicInfo?.excellence_video || null,
          });
        }
      )
      .catch(() => {
        if (!mounted) return;

        setData({
          treatments: [],
          doctors: [],
          testimonials: [],
          video: null,
        });
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="api-loading">
        Loading Genet Dental content…
      </div>
    );
  }

  return (
    <>
      {/* =================================================
          FIRST LANDING SCREEN

          HEADER
          HERO
          SERVICE ICON SCROLLER
          ================================================= */}

      <Hero
        heading="Smiles Always..."
        paragraph="Experience world-class dental care in a state-of-the-art facility. We combine rigorous clinical standards with boutique hospitality for a truly premium patient journey."
        heroPhoto={heroPhoto}
        smilesWordmark={smilesWordmark}
      />

      {/* SERVICE ICONS
          Must be directly below the Hero */}
      <ServiceIcons />

      {/* =================================================
          EXCELLENCE
          ================================================= */}

      <Excellence
        heading="Excellence in Dental Care"
        paragraph="At Genet Specialized Dental Center, we are dedicated to providing personalized, high-quality dental care in a comfortable and stress-free environment. Our team of experienced specialists uses the latest technology to ensure optimal oral health for you and your family."
        yearsExperience={12}
        patientsLabel="23k+"
        video={data.video}
      />

      {/* =================================================
          TREATMENTS
          ================================================= */}

      <Treatments
        treatments={data.treatments}
      />

      {/* =================================================
          SPECIALISTS
          ================================================= */}

      <Specialists
        doctors={data.doctors}
      />

      {/* =================================================
          CTA
          ================================================= */}

      <CTASection
        phone="02 666 99 45"
      />

      {/* =================================================
          TESTIMONIALS
          ================================================= */}

      <Testimonials
        testimonials={data.testimonials}
      />

      {/* =================================================
          INSURANCE
          ================================================= */}

      <Insurance />

      {/* =================================================
          VISIT
          ================================================= */}

      <Visit />
    </>
  );
}