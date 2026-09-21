export default function PageHero({ eyebrow, title, description }) {
  return (
    <section className="page-hero">
      <div className="wrap">
        {eyebrow && <span className="eyebrow" style={{ justifyContent: "center" }}>{eyebrow}</span>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
    </section>
  );
}
