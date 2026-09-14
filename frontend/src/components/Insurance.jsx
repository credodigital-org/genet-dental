// import insuranceStrip from "../assets/images/insurance-strip.jpg";

// export default function Insurance() {
//   return (
//     <section className="insurance">
//       <div className="wrap">
//         <span className="insurance-badge">We Accept Insurance</span>
//         <div className="insurance-strip">
//           <img src={insuranceStrip} alt="Accepted insurance providers" />
//         </div>
//       </div>
//     </section>
//   );
// }

import insuranceStrip from "../assets/images/insurance-strip.jpg";

export default function Insurance() {
  return (
    <section className="insurance">
      <div className="wrap">
        <span className="insurance-badge">We Accept Insurance</span>

        <div className="insurance-marquee">
          <div className="insurance-track">
            <img
              src={insuranceStrip}
              alt="Accepted insurance providers"
            />
            <img
              src={insuranceStrip}
              alt=""
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}