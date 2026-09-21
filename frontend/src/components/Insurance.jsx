// import "../styles/Insurance.css";
// import insuranceStrip from "../assets/images/insurance-strip.jpg";
// export default function Insurance(){return <section className="insurance"><div className="wrap"><span className="insurance-badge">We Accept Insurance</span><div className="insurance-image-wrap"><img src={insuranceStrip} alt="Accepted insurance providers" /></div></div></section>;}


import "../styles/Insurance.css";
import insuranceStrip from "../assets/images/insurance-strip.jpg";
import { useEffect, useRef } from "react";

export default function Insurance() {
  const trackRef = useRef(null);
  const animationRef = useRef(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    let lastTime = 0;

    const animate = (time) => {
      if (!lastTime) {
        lastTime = time;
      }

      const delta = time - lastTime;
      lastTime = time;

      if (!pausedRef.current) {
        track.scrollLeft += delta * 0.035;

        /*
          The track contains two identical images.
          When the first image has completely passed,
          return to the beginning.
        */
        const firstImage = track.querySelector(
          ".insurance-strip-item"
        );

        if (
          firstImage &&
          track.scrollLeft >= firstImage.offsetWidth
        ) {
          track.scrollLeft = 0;
        }
      }

      animationRef.current =
        requestAnimationFrame(animate);
    };

    animationRef.current =
      requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <section className="insurance">

      <div className="wrap">

        <span className="insurance-badge">
          We Accept Insurance
        </span>

        <div
          className="insurance-image-wrap"
          ref={trackRef}
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
          }}
          onTouchStart={() => {
            pausedRef.current = true;
          }}
          onTouchEnd={() => {
            setTimeout(() => {
              pausedRef.current = false;
            }, 1200);
          }}
        >

          <div className="insurance-track">

            <img
              src={insuranceStrip}
              alt="Accepted insurance providers"
              className="insurance-strip-item"
            />

            <img
              src={insuranceStrip}
              alt=""
              aria-hidden="true"
              className="insurance-strip-item"
            />

          </div>

        </div>

      </div>

    </section>
  );
}