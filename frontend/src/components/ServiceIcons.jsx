import { useEffect, useRef } from "react";

import dentalCheckup from "../assets/images/icons/icon-dental-checkup.png";
import teethCleaning from "../assets/images/icons/icon-teeth-cleaning.png";
import rootCanals from "../assets/images/icons/icon-root-canals.png";
import dentalImplants from "../assets/images/icons/icon-dental-implants.png";
import braces from "../assets/images/icons/icon-braces.png";
import surgeries from "../assets/images/icons/icon-surgeries.png";

const SERVICES = [
  {
    name: "Dental Check-up",
    icon: dentalCheckup,
  },
  {
    name: "Teeth Cleaning",
    icon: teethCleaning,
  },
  {
    name: "Root Canals",
    icon: rootCanals,
  },
  {
    name: "Dental Implants",
    icon: dentalImplants,
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

export default function ServiceIcons() {
  const rowRef = useRef(null);
  const animationRef = useRef(null);
  const pausedRef = useRef(false);

  const allServices = [...SERVICES, ...SERVICES];

  useEffect(() => {
    const row = rowRef.current;

    if (!row) return;

    const speed = 0.35;

    // Start from the middle so we can move visually LEFT → RIGHT
    row.scrollLeft = row.scrollWidth / 2;

    const scroll = () => {
      if (!pausedRef.current) {
        row.scrollLeft -= speed;

        // When we reach the beginning, jump back to the middle
        if (row.scrollLeft <= 0) {
          row.scrollLeft = row.scrollWidth / 2;
        }
      }

      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <section className="service-row">
      <div
        className="service-row-inner"
        ref={rowRef}
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
        {allServices.map((service, index) => (
          <div
            className="service-item"
            key={`${service.name}-${index}`}
          >
            <img
              src={service.icon}
              alt={service.name}
              className="service-icon"
            />

            <span>{service.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}