import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "After Enough",
  description:
    "Preparing for life after money with reflection, modern Vanaprastha, retreats, inward clarity, and a more meaningful way of living after financial independence.",
};

const navigation = [
  { href: "/start-here", label: "Start Here" },
  { href: "/path", label: "Path" },
  { href: "/retreats", label: "Retreats" },
  { href: "/about", label: "About" },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <header className="site-header">
            <div className="header-inner">
              <Link className="site-title" href="/">
                After Enough
              </Link>
              <nav className="site-nav" aria-label="Primary">
                {navigation.map((item) => (
                  <Link key={item.href} href={item.href}>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          <main className="site-main">{children}</main>
          <footer className="site-footer">
            <div className="footer-inner">
              <p>After Enough</p>
              <p>Preparing for a slower, clearer, more meaningful second half of life.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
