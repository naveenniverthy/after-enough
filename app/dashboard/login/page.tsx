export const metadata = {
  title: "Dashboard Access",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLoginPage() {
  return (
    <main className="trading-login">
      <section className="trading-login-card">
        <p className="trading-kicker">Private dashboard</p>
        <h1>Authentication required</h1>
        <p>
          Protect this route with Cloudflare Access or another identity layer
          that forwards the approved user email to the app. Only the email in
          <code> AUTHORIZED_EMAIL </code> is allowed through.
        </p>
        <p className="trading-muted">
          This page is not a hidden URL gate. It is a denied-access screen for
          requests that do not include the expected authenticated email header.
        </p>
      </section>
    </main>
  );
}
