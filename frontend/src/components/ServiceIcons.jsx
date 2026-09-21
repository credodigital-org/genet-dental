import "../styles/ServiceIcons.css";
import { useEffect, useRef } from "react";

import checkup from "../assets/images/icons/icon-dental-checkup.png";
import cleaning from "../assets/images/icons/icon-teeth-cleaning.png";
import rootCanals from "../assets/images/icons/icon-root-canals.png";
import implants from "../assets/images/icons/icon-dental-implants.png";
import braces from "../assets/images/icons/icon-braces.png";
import surgeries from "../assets/images/icons/icon-surgeries3.png";

const SERVICES = [
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

export default function ServiceIcons() {
  const rowRef = useRef(null);
  const animationRef = useRef(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const row = rowRef.current;

    if (!row) return;

    let lastTime = 0;

    const scroll = (time) => {
      if (!lastTime) {
        lastTime = time;
      }

      const delta = time - lastTime;
      lastTime = time;

      if (!pausedRef.current) {
        row.scrollLeft += delta * 0.035;

        if (
          row.scrollLeft >=
          row.scrollWidth / 2
        ) {
          row.scrollLeft = 0;
        }
      }

      animationRef.current =
        requestAnimationFrame(scroll);
    };

    animationRef.current =
      requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(
        animationRef.current
      );
    };
  }, []);

  const items = [
    ...SERVICES,
    ...SERVICES,
  ];

  return (
    <div className="service-row">
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
        {items.map((service, index) => (
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
    </div>
  );
}