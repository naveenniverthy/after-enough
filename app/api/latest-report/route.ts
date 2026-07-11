import { getLatestReport } from "@/lib/trading/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const report = await getLatestReport();
  return Response.json({ report });
}
