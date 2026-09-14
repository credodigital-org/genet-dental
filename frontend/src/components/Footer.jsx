import logo from "../assets/images/logo1.png";

import facebookIcon from "../assets/images/logos_facebook.png";
import instagramIcon from "../assets/images/skill-icons_instagram.png";
import emailIcon from "../assets/images/Container (10).png";
import shareIcon from "../assets/images/Group (3).png";


const QUICK_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Our Services" },
  { href: "#facilities", label: "Our Facilities" },
  { href: "#doctors", label: "Our Doctors" },
  { href: "#about", label: "About Us" },
  { href: "#contact", label: "Contact" },
];


export default function Footer({
  phone,
  whatsapp,
  address,
  city,
}) {

  const displayPhone = phone || "02 666 99 45";
  const displayWhatsapp = whatsapp || "050 346 9945";
  const displayAddress =
    address || "Junaibi Tower, 2nd Floor, Muroor";
  const displayCity =
    city || "Abu Dhabi, UAE";


  const whatsappNumber = displayWhatsapp.replace(/\D/g, "");


  return (
    <footer className="site-footer">

      <div className="wrap">

        <div className="footer-grid">


          {/* =================================================
              BRAND
              ================================================= */}

          <div className="footer-brand">

            <div className="footer-logo">
              <img
                src={logo}
                alt="Genet Dental Center"
              />
            </div>


            <p className="footer-description">
              Smiles Always... Providing premium dental care
              with a focus on your comfort and well-being.
            </p>


            <div className="footer-social">

              {/* SHARE */}
              <a
                href="#"
                aria-label="Share"
                className="footer-social-link"
              >
                <img
                  src={shareIcon}
                  alt=""
                />
              </a>


              {/* EMAIL */}
              <a
                href="mailto:info@genetdental.com"
                aria-label="Email"
                className="footer-social-link"
              >
                <img
                  src={emailIcon}
                  alt=""
                />
              </a>


              {/* INSTAGRAM */}
              <a
                href="#"
                aria-label="Instagram"
                className="footer-social-link"
              >
                <img
                  src={instagramIcon}
                  alt=""
                />
              </a>


              {/* FACEBOOK */}
              <a
                href="#"
                aria-label="Facebook"
                className="footer-social-link"
              >
                <img
                  src={facebookIcon}
                  alt=""
                />
              </a>

            </div>

          </div>



          {/* =================================================
              QUICK LINKS
              ================================================= */}

          <div className="footer-col">

            <h5>Quick Links</h5>

            <ul>

              {QUICK_LINKS.map((link) => (

                <li key={link.label}>

                  <a href={link.href}>
                    {link.label}
                  </a>

                </li>

              ))}

            </ul>

          </div>



          {/* =================================================
              CONTACT US
              ================================================= */}

          <div className="footer-col">

            <h5>Contact Us</h5>

            <ul>

              <li>
                Tel: {displayPhone}
              </li>

              <li>
                WA: {displayWhatsapp}
              </li>

              <li className="footer-address">

                {displayAddress}

                <br />

                {displayCity}

              </li>

            </ul>

          </div>



          {/* =================================================
              WORKING HOURS
              ================================================= */}

          <div className="footer-col">

            <h5>Working Hours</h5>

            <ul>

              <li>
                Sun - Sat
              </li>

              <li>
                9:30 AM - 8:30 PM
              </li>

            </ul>

          </div>


        </div>



        {/* ===================================================
            FOOTER BOTTOM
            =================================================== */}

        <div className="footer-bottom">

          © {new Date().getFullYear()} Genet Dental Center.
          Smiles always...

        </div>


      </div>

    </footer>
  );
}