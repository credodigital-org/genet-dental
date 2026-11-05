import "../styles/Excellence.css";
import { mediaUrl } from "../api";
export default function Excellence({ heading, paragraph, yearsExperience, patientsLabel, video }) {
  return <section className="excellence" id="facilities"><div className="wrap"><div className="excellence-grid">
    <div className="excellence-video">{video && <video autoPlay muted loop playsInline controls={false}><source src={mediaUrl(video)} type="video/mp4" /></video>}</div>
    <div className="excellence-copy"><h2>{heading}</h2><p>{paragraph}</p><div className="stat-row"><div className="stat"><span className="num">{yearsExperience}+</span><span className="label">Years Experience</span></div><div className="stat"><span className="num">{patientsLabel}</span><span className="label">Smiling Patients</span></div></div></div>
  </div></div></section>;
}
