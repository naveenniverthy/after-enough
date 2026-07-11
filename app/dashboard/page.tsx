import { generateMorningReport } from "@/lib/trading/report";
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
  const report = storedReport ?? (await generateMorningReport());

  return <DashboardClient initialReport={report} initialArchive={archive} />;
}
