import { useEffect, useState } from "react";
import { apiGet } from "./api";

import Header from "./components/Header";
import Hero from "./components/Hero";
import ServiceIcons from "./components/ServiceIcons";
import Excellence from "./components/Excellence";
import Treatments from "./components/Treatments";
import Specialists from "./components/Specialists";
import CTASection from "./components/CTASection";
import Testimonials from "./components/Testimonials";
import Insurance from "./components/Insurance";
import Visit from "./components/Visit";
import Footer from "./components/Footer";

export default function App() {
  const [clinicInfo, setClinicInfo] = useState(null);
  const [treatments, setTreatments] = useState(null);
  const [doctors, setDoctors] = useState(null);
  const [testimonials, setTestimonials] = useState(null);

  // Every section renders with real static fallback content immediately;
  // if the Django API responds, we swap in whatever's been edited from
  // the admin panel. Nothing on screen depends on the backend being up.
  useEffect(() => {
    apiGet("clinic-info/").then((data) => data && setClinicInfo(data));
    apiGet("treatments/").then((data) => data && data.length && setTreatments(data));
    apiGet("doctors/").then((data) => data && data.length && setDoctors(data));
    apiGet("testimonials/").then((data) => data && data.length && setTestimonials(data));
  }, []);

  return (
    <>
      <Header clinicName={clinicInfo?.clinic_name} />
      <Hero heading={clinicInfo?.hero_heading} paragraph={clinicInfo?.hero_paragraph} />
      <ServiceIcons />
      <Excellence
        heading={clinicInfo?.excellence_heading}
        paragraph={clinicInfo?.excellence_paragraph}
        yearsExperience={clinicInfo?.years_experience}
        patientsLabel={clinicInfo?.patients_count_label}
      />
      <Treatments treatments={treatments} />
      <Specialists doctors={doctors} />
      <CTASection phone={clinicInfo?.phone} />
      <Testimonials testimonials={testimonials} />
      <Insurance />
      <Visit
        address={clinicInfo?.address_line}
        city={clinicInfo?.address_city}
        phone={clinicInfo?.phone}
        email={clinicInfo?.email}
      />
      <Footer
        phone={clinicInfo?.phone}
        whatsapp={clinicInfo?.whatsapp}
        address={clinicInfo?.address_line}
        city={clinicInfo?.address_city}
      />
    </>
  );
}
