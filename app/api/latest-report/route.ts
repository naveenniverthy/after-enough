import { generateMorningReport } from "@/lib/trading/report";
import { getLatestReport } from "@/lib/trading/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const report = (await getLatestReport()) ?? (await generateMorningReport());
  return Response.json({ report });
}
