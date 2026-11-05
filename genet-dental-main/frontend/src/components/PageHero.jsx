export default function PageHero({
  eyebrow,
  title,
  description,
  backgroundImage,
  foregroundImage,
  className = "",
}) {
  return (
    <section className={`page-hero ${className}`}>
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt=""
          className="page-hero-background"
        />
      )}

      {foregroundImage && (
        <img
          src={foregroundImage}
          alt=""
          className="page-hero-foreground"
        />
      )}

      <div className="page-hero-overlay"></div>

      <div className="wrap page-hero-content">
        {eyebrow && (
          <span className="eyebrow">
            {eyebrow}
          </span>
        )}

        <h1>{title}</h1>

        {description && (
          <p>{description}</p>
        )}
      </div>
    </section>
  );
}