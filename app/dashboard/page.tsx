import { getEnv } from "@/lib/trading/env";
import { getLatestReport, listReports } from "@/lib/trading/store";
import DashboardClient from "./DashboardClient";

export const metadata = {
  title: "Trading Dashboard",
  description: "Private morning day-trading intelligence dashboard for After Enough.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [storedReport, archive] = await Promise.all([getLatestReport(), listReports()]);

  return (
    <DashboardClient
      initialReport={storedReport}
      initialArchive={archive}
      allowManualRefresh={!getEnv().PUBLIC_DASHBOARD_ACCESS}
    />
  );
}
