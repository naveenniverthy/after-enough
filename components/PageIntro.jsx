export default function PageIntro({ eyebrow, title, intro }) {
  return (
    <header className="page-intro">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1>{title}</h1>
      {intro ? <p>{intro}</p> : null}
    </header>
  );
}
