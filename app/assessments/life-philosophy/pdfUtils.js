export const PDF_CLOSING_LINE =
  "Financial independence is not only about leaving work. It is about knowing what you are becoming free for.";

function normalizePdfText(text) {
  return String(text || "")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/—/g, "-")
    .replace(/–/g, "-")
    .replace(/•/g, "-");
}

function escapePdfText(text) {
  return normalizePdfText(text).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrapPdfText(text, maxChars = 86) {
  const words = normalizePdfText(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;

    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  });

  if (current) lines.push(current);
  return lines;
}

export function createTextPdf(title, sections) {
  const pageWidth = 612;
  const pageHeight = 792;
  const margin = 54;
  const bottomMargin = 54;
  const lineHeight = 15;
  const pages = [[]];
  let y = pageHeight - margin;

  function currentPage() {
    return pages[pages.length - 1];
  }

  function addPage() {
    pages.push([]);
    y = pageHeight - margin;
  }

  function ensureSpace(space) {
    if (y - space < bottomMargin) addPage();
  }

  function addLine(text, { size = 11, bold = false, gapAfter = 0 } = {}) {
    ensureSpace(lineHeight + gapAfter);
    const font = bold ? "F2" : "F1";
    currentPage().push(`BT /${font} ${size} Tf ${margin} ${y} Td (${escapePdfText(text)}) Tj ET`);
    y -= lineHeight + gapAfter;
  }

  function addWrapped(text, options = {}) {
    wrapPdfText(text, options.maxChars || 86).forEach((line) => addLine(line, options));
  }

  addLine(title, { size: 18, bold: true, gapAfter: 8 });

  sections.forEach((section) => {
    if (!section || !section.content?.length) return;

    ensureSpace(48);
    addLine(section.title, { size: 13, bold: true, gapAfter: 4 });

    section.content.forEach((item) => {
      if (!item) return;

      if (Array.isArray(item)) {
        item.forEach((listItem) => {
          if (!listItem) return;
          addWrapped(`- ${listItem}`, { maxChars: 82, gapAfter: 1 });
        });
        y -= 4;
        return;
      }

      addWrapped(item, { maxChars: 86, gapAfter: 2 });
      y -= 4;
    });
  });

  const objects = [];

  function addObject(body) {
    objects.push(body);
    return objects.length;
  }

  const fontRegularId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const fontBoldId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
  const pageIds = [];

  pages.forEach((pageLines) => {
    const content = pageLines.join("\n");
    const contentId = addObject(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`);
    const pageId = addObject(
      `<< /Type /Page /Parent PAGES_ID 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> /Contents ${contentId} 0 R >>`,
    );
    pageIds.push(pageId);
  });

  const pagesId = addObject(
    `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`,
  );
  const catalogId = addObject(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);

  objects.forEach((body, index) => {
    objects[index] = body.replace(/PAGES_ID/g, String(pagesId));
  });

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  objects.forEach((body, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new Blob([pdf], { type: "application/pdf" });
}

export function buildPdfSections(result, date) {
  if (!result) return [];

  return [
    {
      title: "Date",
      content: [date],
    },
    {
      title: "Your Life Philosophy",
      content: [result.lifeTitle, ...result.lifePhilosophy],
    },
    {
      title: "Your Freedom Profile",
      content: [
        result.freedomProfile.map((freedom) => `${freedom.title}: ${freedom.description}`),
      ],
    },
    {
      title: "Geographic Freedom Score",
      content: [`${result.geographicFreedomScore}/100`],
    },
    {
      title: "Your After Enough Vision",
      content: [result.afterEnoughVision],
    },
    {
      title: "Your Location Lifestyle",
      content: [
        result.locationLifestyle.title,
        result.locationLifestyle.description,
      ],
    },
    {
      title: "Your Possible Blind Spots",
      content: [result.blindSpots],
    },
    {
      title: "Recommended Reading Path",
      content: [result.readingPath],
    },
    {
      title: "Suggested Experiments",
      content: [result.experiments],
    },
    {
      title: "Closing Thought",
      content: [PDF_CLOSING_LINE],
    },
  ];
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}
