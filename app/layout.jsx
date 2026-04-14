import "./globals.css";

export const metadata = {
  title: "After Enough",
  description:
    "Preparing for life after money with reflection, modern Vanaprastha, retreats, inward clarity, and a more meaningful way of living after financial independence.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
