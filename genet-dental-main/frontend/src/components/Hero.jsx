// import "../styles/Hero.css";

// import heroPhoto from "../assets/images/hero-photo.jpg";
// import smilesWordmark from "../assets/images/smiles-wordmark.png";

// import { WhatsAppIcon } from "./Header";

// export default function Hero({ heading, paragraph }) {
//   return (
//     <section className="hero" id="home">

//       <div className="hero-main">

//         {/* HERO IMAGE */}
//         <div
//           className="hero-photo-bleed"
//           style={{
//             backgroundImage: `url(${heroPhoto})`,
//           }}
//         />

//         {/* HERO CONTENT */}
//         <div className="hero-copy">

//           <span className="eyebrow">
//             <span className="eyebrow-star">★</span>
//             <span>PREMIUM DENTAL CARE</span>
//           </span>

//           <h1>
//             <img
//               src={smilesWordmark}
//               alt={heading || "Smiles Always"}
//             />
//           </h1>

//           <p>
//             {paragraph ||
//               "Experience world-class dental care in a state-of-the-art facility. We combine rigorous clinical standards with boutique hospitality for a truly premium patient journey."}
//           </p>

//           {/* =================================================
//               HERO BOOKING BUTTON

//               DESKTOP >= 1201px:
//               HIDDEN — NAVBAR HAS BOOK BUTTON

//               981px - 1200px:
//               VISIBLE — NAVBAR TOO CROWDED

//               <= 980px:
//               VISIBLE — TABLET/MOBILE
//               ================================================= */}

//           {/* <a
//             href="/#appointment"
//             className="hero-booking btn btn-purple"
//           >
//             <WhatsAppIcon />

//             <span>
//               Book Appointment
//             </span>

           
//           </a> */}

//           <a
//   href="tel:+97126669945"
//   className="hero-booking btn btn-purple"
// >
//   <svg
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     aria-hidden="true"
//   >
//     <path d="M22 16.92v3a2 2 0 0 1-2.18 2
//       19.8 19.8 0 0 1-8.63-3.07
//       19.5 19.5 0 0 1-6-6
//       19.8 19.8 0 0 1-3.07-8.63
//       A2 2 0 0 1 4.11 2h3
//       a2 2 0 0 1 2 1.72
//       c.12.9.35 1.78.7 2.63
//       a2 2 0 0 1-.45 2.11L8.09 9.73
//       a16 16 0 0 0 6.18 6.18
//       l1.27-1.27
//       a2 2 0 0 1 2.11-.45
//       c.85.35 1.73.58 2.63.7
//       A2 2 0 0 1 22 16.92z"
//     />
//   </svg>

//   <span>Book Appointment</span>
// </a>

//         </div>

//       </div>

//     </section>
//   );
// }


// import "../styles/Hero.css";

// import heroPhoto from "../assets/images/hero-photo.jpg";
// import smilesWordmark from "../assets/images/smiles-wordmark.png";

// export default function Hero({ heading, paragraph }) {
//   const services = [
//     {
//       name: "Dental Check-up",
//       icon: "/icons/dental-checkup.png",
//     },
//     {
//       name: "Teeth Cleaning",
//       icon: "/icons/teeth-cleaning.png",
//     },
//     {
//       name: "Root Canals",
//       icon: "/icons/root-canals.png",
//     },
//     {
//       name: "Dental Implants",
//       icon: "/icons/dental-implants.png",
//     },
//     {
//       name: "Braces",
//       icon: "/icons/braces.png",
//     },
//     {
//       name: "Surgeries",
//       icon: "/icons/surgeries.png",
//     },
//   ];

//   return (
//     <section className="hero" id="home">

//       {/* ================================
//           HERO IMAGE + CONTENT
//       ================================= */}
//       <div className="hero-main">

//         <div
//           className="hero-photo-bleed"
//           style={{
//             backgroundImage: `url(${heroPhoto})`,
//           }}
//         />

//         <div className="hero-copy">

//           <span className="eyebrow">
//             <span className="eyebrow-star">★</span>
//             <span>PREMIUM DENTAL CARE</span>
//           </span>

//           <h1>
//             <img
//               src={smilesWordmark}
//               alt={heading || "Smiles Always"}
//             />
//           </h1>

//           <p>
//             {paragraph ||
//               "Experience world-class dental care in a state-of-the-art facility. We combine rigorous clinical standards with boutique hospitality for a truly premium patient journey."}
//           </p>

//           <a
//             href="tel:+97126669945"
//             className="hero-booking btn btn-purple"
//           >
//             <svg
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               aria-hidden="true"
//             >
//               <path d="M22 16.92v3a2 2 0 0 1-2.18 2
//                 19.8 19.8 0 0 1-8.63-3.07
//                 19.5 19.5 0 0 1-6-6
//                 19.8 19.8 0 0 1-3.07-8.63
//                 A2 2 0 0 1 4.11 2h3
//                 a2 2 0 0 1 2 1.72
//                 c.12.9.35 1.78.7 2.63
//                 a2 2 0 0 1-.45 2.11L8.09 9.73
//                 a16 16 0 0 0 6.18 6.18
//                 l1.27-1.27
//                 a2 2 0 0 1 2.11-.45
//                 c.85.35 1.73.58 2.63.7
//                 A2 2 0 0 1 22 16.92z"
//               />
//             </svg>

//             <span>Book Appointment</span>
//           </a>

//         </div>
//       </div>


//       {/* ================================
//           SCROLLING SERVICE ICONS
//       ================================= */}
//       <div className="service-row">

//         <div className="service-row-track">

//           {[...services, ...services].map((service, index) => (
//             <div
//               className="service-item"
//               key={`${service.name}-${index}`}
//             >
//               <div className="service-icon-box">
//                 <img
//                   src={service.icon}
//                   alt=""
//                   className="service-icon"
//                 />
//               </div>

//               <span>{service.name}</span>
//             </div>
//           ))}

//         </div>

//       </div>

//     </section>
//   );
// }

import "../styles/Hero.css";

import heroPhoto from "../assets/images/hero-photo.jpg";
import smilesWordmark from "../assets/images/smiles-wordmark.png";

// Service icons
import checkup from "../assets/images/icons/icon-dental-checkup.png";
import cleaning from "../assets/images/icons/icon-teeth-cleaning.png";
import rootCanals from "../assets/images/icons/icon-root-canals.png";
import implants from "../assets/images/icons/icon-dental-implants.png";
import braces from "../assets/images/icons/icon-braces.png";
import surgeries from "../assets/images/icons/icon-surgeries3.png";

export default function Hero({ heading, paragraph }) {

  const services = [
    {
      name: "Dental Check-up",
      icon: checkup,
    },
    {
      name: "Teeth Cleaning",
      icon: cleaning,
    },
    {
      name: "Root Canals",
      icon: rootCanals,
    },
    {
      name: "Dental Implants",
      icon: implants,
    },
    {
      name: "Braces",
      icon: braces,
    },
    {
      name: "Surgeries",
      icon: surgeries,
    },
  ];

  return (
    <section className="hero" id="home">

      {/* =================================================
          HERO IMAGE + CONTENT
      ================================================= */}

      <div className="hero-main">

        {/* HERO IMAGE */}
        <div
          className="hero-photo-bleed"
          style={{
            backgroundImage: `url(${heroPhoto})`,
          }}
        />

        {/* HERO CONTENT */}
        <div className="hero-copy">

          <span className="eyebrow">
            <span className="eyebrow-star">★</span>
            <span>PREMIUM DENTAL CARE</span>
          </span>

          <h1>
            <img
              src={smilesWordmark}
              alt={heading || "Smiles Always"}
            />
          </h1>

          <p>
            {paragraph ||
              "Experience world-class dental care in a state-of-the-art facility. We combine rigorous clinical standards with boutique hospitality for a truly premium patient journey."}
          </p>

          {/* BOOK APPOINTMENT */}

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
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2
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

        </div>
      </div>


      {/* =================================================
          SCROLLING SERVICE ICONS
      ================================================= */}

      {/* <div className="service-row">

        <div className="service-row-track">

          {[...services, ...services].map((service, index) => (
            <div
              className="service-item"
              key={`${service.name}-${index}`}
            >

              <div className="service-icon-box">

                <img
                  src={service.icon}
                  alt={service.name}
                  className="service-icon"
                />

              </div>

              <span>
                {service.name}
              </span>

            </div>
          ))}

        </div> */}

      {/* </div> */}

      <div className="service-row">
  <div className="service-row-track">

    {/* GROUP 1 */}
    <div className="service-row-group">
      {services.map((service) => (
        <div
          className="service-item"
          key={`group1-${service.name}`}
        >
          <div className="service-icon-box">
            <img
              src={service.icon}
              alt={service.name}
              className="service-icon"
            />
          </div>

          <span>{service.name}</span>
        </div>
      ))}
    </div>

    {/* GROUP 2 - duplicate for continuous scrolling */}
    <div
      className="service-row-group"
      aria-hidden="true"
    >
      {services.map((service) => (
        <div
          className="service-item"
          key={`group2-${service.name}`}
        >
          <div className="service-icon-box">
            <img
              src={service.icon}
              alt=""
              className="service-icon"
            />
          </div>

          <span>{service.name}</span>
        </div>
      ))}
    </div>

  </div>
</div>

    </section>
  );
}