import video from "../assets/video/excellence-in-care.mp4";

export default function Excellence({ heading, paragraph, yearsExperience, patientsLabel }) {
  return (
    <section className="excellence" id="facilities">
      <div className="wrap">
        <div className="excellence-grid">
          <div className="excellence-video">
            <video autoPlay muted loop playsInline>
              <source src={video} type="video/mp4" />
            </video>
          </div>
          <div className="excellence-copy">
            <h2>{heading || "Excellence in Dental Care"}</h2>
            <p>
              {paragraph ||
                "At Genet Specialized Dental Center, we are dedicated to providing personalized, high-quality dental care in a comfortable and stress-free environment. Our team of experienced specialists uses the latest technology to ensure optimal oral health for you and your family."}
            </p>
            <div className="stat-row">
              <div className="stat">
                <span className="num">{yearsExperience ? `${yearsExperience}+` : "12+"}</span>
                <span className="label">Years Experience</span>
              </div>
              <div className="stat">
                <span className="num">{patientsLabel || "23k+"}</span>
                <span className="label">Smiling Patients</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
