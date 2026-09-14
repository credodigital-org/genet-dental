// import heroPhoto from "../assets/images/hero-photo.png";
// import smilesWordmark from "../assets/images/smiles-wordmark.png";

// export default function Hero({ heading, paragraph }) {
//   return (
//     <section className="hero" id="home">
//       <div className="hero-main">

//         {/* HERO BACKGROUND IMAGE */}
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
//               alt={heading || "Smiles always"}
//             />
//           </h1>

//           <p>
//             {paragraph ||
//               "Experience world-class dental care in a state-of-the-art facility. We combine rigorous clinical standards with boutique hospitality for a truly premium patient journey."}
//           </p>

//         </div>

//       </div>
//     </section>
//   );
// }

import heroPhoto from "../assets/images/hero-photo.png";
import smilesWordmark from "../assets/images/smiles-wordmark.png";

export default function Hero({ heading, paragraph }) {
  return (
    <section className="hero" id="home">
      <div className="hero-main">

        {/* HERO BACKGROUND */}
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
              alt={heading || "Smiles always"}
            />
          </h1>

          <p>
            {paragraph ||
              "Experience world-class dental care in a state-of-the-art facility. We combine rigorous clinical standards with boutique hospitality for a truly premium patient journey."}
          </p>

        </div>

        {/* MOBILE BOOK APPOINTMENT */}
        {/* <a
          href="#appointment"
          className="mobile-book-appointment"
        >
          <span>Book Appointment</span>
          <span className="appointment-arrow">→</span>
        </a> */}

      </div>
    </section>
  );
}