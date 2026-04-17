import Link from "next/link";

export default function ExploreCard({ href, title, description }) {
  return (
    <Link href={href} className="explore-card">
      <div className="explore-card-inner">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
}
