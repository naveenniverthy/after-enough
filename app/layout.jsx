import "./globals.css";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";

const siteDescription =
  "A calm, practical guide to life after financial independence. Explore meaning, retreats, reflection, and a modern path into a simpler second half of life.";

export const metadata = {
  metadataBase: new URL("https://www.after-enough.com"),
  title: {
    default: "After Enough",
    template: "%s | After Enough",
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "After Enough",
    description: siteDescription,
    url: "https://www.after-enough.com",
    siteName: "After Enough",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "After Enough",
    description: siteDescription,
  },
  verification: {
    google: "NWakLmOh9R8RS1-kBkq9AuYZpEqQy3hyVWBaQn4iosA",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <header className="site-header">
          <div className="nav-container">
            <Link href="/" className="logo">
              After Enough
            </Link>

            <nav className="nav-links">
              <Link href="/">Home</Link>
              <Link href="/start-here">Start Here</Link>
              <Link href="/path">Path</Link>
              <Link href="/about">About</Link>
              <Link href="/retreats">Retreats</Link>
            </nav>
          </div>
        </header>

        <main className="site-content">{children}</main>

        <footer className="site-footer">
          <div className="footer-inner">
            <p>After Enough</p>

            <nav className="nav-links" aria-label="Footer">
              <Link href="/about">About</Link>
              <Link href="/retreats">Retreats</Link>
              <Link href="/sitemap">Sitemap</Link>
            </nav>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
