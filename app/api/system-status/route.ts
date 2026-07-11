import { getSystemStatus } from "@/lib/trading/systemStatus";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(await getSystemStatus());
}
