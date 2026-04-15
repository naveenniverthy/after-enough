import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "After Enough",
  description:
    "A calmer way to think about money, freedom, and life after enough.",
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
              <Link href="/retreats">Retreats</Link>
            </nav>
          </div>
        </header>

        <main className="site-content">{children}</main>
      </body>
    </html>
  );
}
