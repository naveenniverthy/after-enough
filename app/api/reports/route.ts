import { listReports } from "@/lib/trading/store";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({ reports: await listReports() });
}
