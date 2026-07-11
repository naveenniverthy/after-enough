import { getReportByDate } from "@/lib/trading/store";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: RouteContext<"/api/reports/[date]">) {
  const { date } = await context.params;
  const report = await getReportByDate(date);

  if (!report) {
    return Response.json({ error: "Report not found" }, { status: 404 });
  }

  return Response.json({ report });
}
