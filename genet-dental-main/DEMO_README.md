# Genet Dental — Homepage Demo

This package contains the Genet Dental React/Vite + Django project with the homepage styled against the supplied homepage PDF reference.

## Demo-specific implementation

- The supplied transparent Genet Dental master logo is used in the website header.
- Primary brand purple: `#522E8F`.
- `exotic-bold.ttf` is loaded locally as **Exotic Bold** for the supplied Exotic 350 Bold typography.
- The supplied `smiles-wordmark.png` is retained for the exact handwritten “Smiles U Always...” artwork shown in the supplied brand/logo artwork.
- The supplied MP4 is used in the **Excellence in Dental Care** section in place of the two reference images.
- The existing Django API integration remains in place, while all homepage sections have static fallback content so the frontend demo still renders when the backend is unavailable.

## Run the frontend demo

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally `http://localhost:5173/`.

## Run the complete stack

See `README.md` for Django setup, admin, database, deployment, and API instructions.

## Main homepage sections

1. Header / navigation / Book Appointment
2. Premium Dental Care hero + appointment request form
3. Quick services strip
4. Excellence in Dental Care + supplied MP4
5. Comprehensive Treatments
6. Our Specialists
7. Purple appointment CTA
8. Patient Testimonials
9. Insurance providers
10. Visit Our Center
11. Footer
