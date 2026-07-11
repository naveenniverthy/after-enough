import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import DashboardClient from "./DashboardClient";

describe("DashboardClient empty state", () => {
  it("shows a clear no-report state and hides public refresh", () => {
    const html = renderToStaticMarkup(
      <DashboardClient initialReport={null} initialArchive={[]} allowManualRefresh={false} />,
    );

    expect(html).toContain("No morning report has been generated yet.");
    expect(html).toContain("Automatic morning refresh enabled");
    expect(html).not.toContain("Refresh Now");
  });
});
