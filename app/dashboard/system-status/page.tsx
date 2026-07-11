import SystemStatusClient from "./SystemStatusClient";

export const metadata = {
  title: "System Status",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default function SystemStatusPage() {
  return <SystemStatusClient />;
}
