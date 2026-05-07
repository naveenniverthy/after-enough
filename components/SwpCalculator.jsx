"use client";

import { useMemo, useState } from "react";

const defaultInputs = {
  startingCorpus: "1000000",
  annualReturn: "7",
  monthlySpendingNeed: "4000",
  inflationAdjustment: "3",
  years: "30",
  emergencyReserve: "0",
  guaranteedMonthlyIncome: "0",
  guaranteedStartYear: "1",
  guaranteedInflationAdjustment: "0",
};

const mainFields = [
  {
    key: "startingCorpus",
    label: "Starting corpus",
    step: "1000",
    projectionOnly: true,
  },
  {
    key: "monthlySpendingNeed",
    label: "Monthly spending need",
    step: "100",
  },
  {
    key: "annualReturn",
    label: "Expected annual return %",
    step: "0.1",
  },
  {
    key: "inflationAdjustment",
    label: "Annual inflation adjustment %",
    step: "0.1",
  },
  {
    key: "years",
    label: "Number of years to project",
    step: "1",
  },
  {
    key: "emergencyReserve",
    label: "Emergency reserve to exclude",
    step: "1000",
  },
];

const guaranteedFields = [
  {
    key: "guaranteedMonthlyIncome",
    label: "Guaranteed monthly income",
    step: "100",
  },
  {
    key: "guaranteedStartYear",
    label: "Guaranteed income start year",
    step: "1",
  },
  {
    key: "guaranteedInflationAdjustment",
    label: "Guaranteed income inflation adjustment %",
    step: "0.1",
  },
];

function toNumber(value, fallback = 0) {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : fallback;
}

function toNonNegative(value, fallback = 0) {
  return Math.max(0, toNumber(value, fallback));
}

function formatNumber(value) {
  const amount = Number(value);

  if (!Number.isFinite(amount)) return "0";

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(Math.max(0, amount));
}

function formatPercent(value) {
  if (!Number.isFinite(value)) return "0%";

  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(Math.max(0, value));
}

function formatRunout(depletionMonth) {
  const year = Math.ceil(depletionMonth / 12);
  const month = ((depletionMonth - 1) % 12) + 1;

  return `Year ${year}, month ${month}`;
}

function parseInputs(inputs) {
  const years = Math.max(1, Math.floor(toNonNegative(inputs.years, 1)));

  return {
    startingCorpus: toNonNegative(inputs.startingCorpus),
    annualReturn: toNumber(inputs.annualReturn) / 100,
    monthlySpendingNeed: toNonNegative(inputs.monthlySpendingNeed),
    inflationAdjustment: toNumber(inputs.inflationAdjustment) / 100,
    years,
    emergencyReserve: toNonNegative(inputs.emergencyReserve),
    guaranteedMonthlyIncome: toNonNegative(inputs.guaranteedMonthlyIncome),
    guaranteedStartYear: Math.min(
      years,
      Math.max(1, Math.floor(toNonNegative(inputs.guaranteedStartYear, 1))),
    ),
    guaranteedInflationAdjustment:
      toNumber(inputs.guaranteedInflationAdjustment) / 100,
  };
}

function simulateProjection(values, startingInvestmentCorpus) {
  const monthlyReturn =
    values.annualReturn > -1
      ? Math.pow(1 + values.annualReturn, 1 / 12) - 1
      : -1;

  let corpus = Math.max(0, startingInvestmentCorpus);
  let monthlySpendingNeed = values.monthlySpendingNeed;
  let guaranteedMonthlyIncome = values.guaranteedMonthlyIncome;
  let totalWithdrawnFromCorpus = 0;
  let totalGuaranteedIncome = 0;
  let finalMonthlySpendingNeed = monthlySpendingNeed;
  let finalMonthlySwpFromCorpus = 0;
  let depletionMonth = null;
  const yearlyRows = [];

  for (let year = 1; year <= values.years; year += 1) {
    let annualSpendingNeed = 0;
    let annualGuaranteedIncome = 0;
    let annualSwpWithdrawn = 0;

    for (let month = 1; month <= 12; month += 1) {
      const absoluteMonth = (year - 1) * 12 + month;
      const guaranteedIncome =
        year >= values.guaranteedStartYear ? guaranteedMonthlyIncome : 0;
      const monthlySwpNeeded = Math.max(
        0,
        monthlySpendingNeed - guaranteedIncome,
      );

      corpus = Math.max(0, corpus * (1 + monthlyReturn));

      const withdrawnThisMonth = Math.min(corpus, monthlySwpNeeded);
      corpus = Math.max(0, corpus - withdrawnThisMonth);

      annualSpendingNeed += monthlySpendingNeed;
      annualGuaranteedIncome += guaranteedIncome;
      annualSwpWithdrawn += withdrawnThisMonth;
      totalGuaranteedIncome += guaranteedIncome;
      totalWithdrawnFromCorpus += withdrawnThisMonth;
      finalMonthlySpendingNeed = monthlySpendingNeed;
      finalMonthlySwpFromCorpus = monthlySwpNeeded;

      if (
        monthlySwpNeeded > withdrawnThisMonth &&
        depletionMonth === null
      ) {
        depletionMonth = absoluteMonth;
        break;
      }
    }

    yearlyRows.push({
      year,
      annualSpendingNeed,
      guaranteedIncome: annualGuaranteedIncome,
      swpWithdrawnFromCorpus: annualSwpWithdrawn,
      yearEndCorpus: corpus,
    });

    if (depletionMonth !== null) break;

    monthlySpendingNeed = Math.max(
      0,
      monthlySpendingNeed * (1 + values.inflationAdjustment),
    );

    if (year >= values.guaranteedStartYear) {
      guaranteedMonthlyIncome = Math.max(
        0,
        guaranteedMonthlyIncome *
          (1 + values.guaranteedInflationAdjustment),
      );
    }
  }

  return {
    survives: depletionMonth === null,
    depletionMonth,
    endingCorpus: corpus,
    totalWithdrawnFromCorpus,
    totalGuaranteedIncome,
    finalMonthlySpendingNeed,
    finalMonthlySwpFromCorpus,
    yearlyRows,
  };
}

function findTargetCorpus(values) {
  let low = 0;
  let high = Math.max(
    100,
    values.monthlySpendingNeed * 12 * values.years * 2,
  );

  while (!simulateProjection(values, high).survives && high < 1e15) {
    high *= 2;
  }

  while (high - low > 100) {
    const midpoint = (low + high) / 2;

    if (simulateProjection(values, midpoint).survives) {
      high = midpoint;
    } else {
      low = midpoint;
    }
  }

  const requiredInvestmentCorpus = Math.ceil(high / 100) * 100;
  const finalProjection = simulateProjection(values, requiredInvestmentCorpus);

  return {
    requiredInvestmentCorpus,
    finalProjection,
  };
}

export default function SwpCalculator() {
  const [mode, setMode] = useState("projection");
  const [inputs, setInputs] = useState(defaultInputs);
  const [generatedDate, setGeneratedDate] = useState("");

  const data = useMemo(() => {
    const values = parseInputs(inputs);
    const emergencyReserve = Math.min(
      values.emergencyReserve,
      values.startingCorpus,
    );
    const investmentCorpus = Math.max(
      0,
      values.startingCorpus - emergencyReserve,
    );
    const projection = simulateProjection(values, investmentCorpus);
    const firstYearSwp = projection.yearlyRows[0]?.swpWithdrawnFromCorpus || 0;
    const startingSwpWithdrawalRate =
      investmentCorpus > 0 ? firstYearSwp / investmentCorpus : 0;
    const target = findTargetCorpus(values);
    const targetEmergencyReserve = values.emergencyReserve;
    const targetFirstYearSwp =
      target.finalProjection.yearlyRows[0]?.swpWithdrawnFromCorpus || 0;
    const targetWithdrawalRate =
      target.requiredInvestmentCorpus > 0
        ? targetFirstYearSwp / target.requiredInvestmentCorpus
        : 0;
    const currentGuaranteedIncome =
      values.guaranteedStartYear <= 1 ? values.guaranteedMonthlyIncome : 0;

    return {
      values,
      investmentCorpus,
      emergencyReserve,
      projection,
      startingSwpWithdrawalRate,
      target,
      targetEmergencyReserve,
      targetWithdrawalRate,
      currentMonthlySwpNeeded: Math.max(
        0,
        values.monthlySpendingNeed - currentGuaranteedIncome,
      ),
    };
  }, [inputs]);

  function updateField(key, value) {
    setInputs((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function downloadPdfSummary() {
    setGeneratedDate(
      new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date()),
    );

    window.setTimeout(() => window.print(), 0);
  }

  function renderField(field) {
    return (
      <label key={field.key} className="fire-field">
        <span>{field.label}</span>
        <input
          type="number"
          inputMode="decimal"
          step={field.step}
          min={field.key === "annualReturn" ? undefined : "0"}
          value={inputs[field.key]}
          onChange={(event) => updateField(field.key, event.target.value)}
        />
      </label>
    );
  }

  const activeProjection =
    mode === "projection"
      ? data.projection
      : data.target.finalProjection;
  const projectionStatus =
    data.projection.depletionMonth === null
      ? formatNumber(data.projection.endingCorpus)
      : formatRunout(data.projection.depletionMonth);
  const totalTargetCorpus =
    data.target.requiredInvestmentCorpus + data.targetEmergencyReserve;

  return (
    <section className="fire-tool swp-tool">
      <div className="swp-mode-tabs" role="tablist" aria-label="Calculator mode">
        <button
          type="button"
          className={mode === "projection" ? "swp-mode-tab is-active" : "swp-mode-tab"}
          onClick={() => setMode("projection")}
        >
          Will my money last?
        </button>
        <button
          type="button"
          className={mode === "target" ? "swp-mode-tab is-active" : "swp-mode-tab"}
          onClick={() => setMode("target")}
        >
          How much corpus do I need?
        </button>
      </div>

      <section className="panel swp-section-card">
        <div className="swp-section-heading">
          <p className="fire-result-kicker">Main assumptions</p>
          <h2>{mode === "projection" ? "Projection Mode" : "Target Corpus Mode"}</h2>
        </div>

        <p className="swp-section-note calculator-note">
          Use any currency. Keep all money inputs in the same currency.
        </p>

        <div className="fire-form-fields swp-fields-grid">
          {mainFields
            .filter((field) => mode === "projection" || !field.projectionOnly)
            .map((field) => renderField(field))}
        </div>
      </section>

      <section className="panel swp-section-card">
        <div className="swp-section-heading">
          <p className="fire-result-kicker">Guaranteed income layer</p>
          <h2>Optional income that reduces SWP withdrawals</h2>
        </div>

        <div className="fire-form-fields swp-fields-grid">
          {guaranteedFields.map((field) => renderField(field))}
        </div>

        <p className="swp-section-note">
          Guaranteed income is optional. It can represent pension, Social
          Security, rental income, annuity income, or any country-specific
          retirement benefit. Since every country is different, this calculator
          treats it as a flexible monthly income layer instead of hard-coding
          one system.
        </p>
      </section>

      <section className="panel fire-summary-card swp-section-card">
        <div className="swp-section-heading">
          <p className="fire-result-kicker">Results</p>
          <h2>
            {mode === "projection"
              ? data.projection.survives
                ? "Your corpus lasts through the projection."
                : "Your corpus runs out before the end."
              : "Estimated corpus needed for this plan."}
          </h2>
        </div>

        <div className="fire-feature-box swp-swp-needed-box">
          <p>
            <strong>Monthly SWP needed from corpus:</strong>
          </p>
          <p className="fire-big-number">
            {formatNumber(data.currentMonthlySwpNeeded)}
          </p>
        </div>

        {mode === "projection" ? (
          <div className="fire-summary-stats swp-result-cards">
            <div className="soft-card">
              <span>Starting SWP withdrawal rate</span>
              <strong>{formatPercent(data.startingSwpWithdrawalRate)}</strong>
            </div>
            <div className="soft-card">
              <span>Total withdrawn from corpus</span>
              <strong>
                {formatNumber(data.projection.totalWithdrawnFromCorpus)}
              </strong>
            </div>
            <div className="soft-card">
              <span>Total guaranteed income received</span>
              <strong>
                {formatNumber(data.projection.totalGuaranteedIncome)}
              </strong>
            </div>
            <div className="soft-card">
              <span>Final monthly spending need</span>
              <strong>
                {formatNumber(data.projection.finalMonthlySpendingNeed)}
              </strong>
            </div>
            <div className="soft-card">
              <span>Final monthly SWP from corpus</span>
              <strong>
                {formatNumber(data.projection.finalMonthlySwpFromCorpus)}
              </strong>
            </div>
            <div className="soft-card">
              <span>
                {data.projection.depletionMonth === null
                  ? "Ending corpus"
                  : "Money runs out in"}
              </span>
              <strong>{projectionStatus}</strong>
            </div>
          </div>
        ) : (
          <div className="fire-summary-stats swp-result-cards">
            <div className="soft-card">
              <span>Estimated required investment corpus</span>
              <strong>
                {formatNumber(data.target.requiredInvestmentCorpus)}
              </strong>
            </div>
            <div className="soft-card">
              <span>Emergency reserve</span>
              <strong>{formatNumber(data.targetEmergencyReserve)}</strong>
            </div>
            <div className="soft-card">
              <span>Total target corpus</span>
              <strong>{formatNumber(totalTargetCorpus)}</strong>
            </div>
            <div className="soft-card">
              <span>First-year SWP withdrawal rate</span>
              <strong>{formatPercent(data.targetWithdrawalRate)}</strong>
            </div>
            <div className="soft-card">
              <span>Total guaranteed income over the period</span>
              <strong>
                {formatNumber(data.target.finalProjection.totalGuaranteedIncome)}
              </strong>
            </div>
            <div className="soft-card">
              <span>Total withdrawn from corpus</span>
              <strong>
                {formatNumber(
                  data.target.finalProjection.totalWithdrawnFromCorpus,
                )}
              </strong>
            </div>
          </div>
        )}

        <div className="calculator-print-action">
          <button
            type="button"
            className="button-link"
            onClick={downloadPdfSummary}
          >
            Download PDF Summary
          </button>
          <p>Use your browser&rsquo;s Save as PDF option after clicking.</p>
        </div>
      </section>

      <section className="panel swp-table-card" aria-labelledby="swp-table-title">
        <h2 id="swp-table-title">Yearly projection</h2>

        <div className="swp-table-wrap">
          <table className="swp-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Annual spending need</th>
                <th>Guaranteed income</th>
                <th>SWP withdrawn from corpus</th>
                <th>Year-end corpus</th>
              </tr>
            </thead>
            <tbody>
              {activeProjection.yearlyRows.map((row) => (
                <tr key={row.year}>
                  <td>{row.year}</td>
                  <td>{formatNumber(row.annualSpendingNeed)}</td>
                  <td>{formatNumber(row.guaranteedIncome)}</td>
                  <td>{formatNumber(row.swpWithdrawnFromCorpus)}</td>
                  <td>{formatNumber(row.yearEndCorpus)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="printable-calculator-summary" aria-hidden="true">
        <h1>SWP Calculator</h1>
        <p className="print-date">
          Date generated: {generatedDate || "Not generated"}
        </p>

        <h2>User inputs</h2>
        <table>
          <tbody>
            <tr>
              <th>Mode</th>
              <td>
                {mode === "projection"
                  ? "Will my money last?"
                  : "How much corpus do I need?"}
              </td>
            </tr>
            {mode === "projection" ? (
              <tr>
                <th>Starting corpus</th>
                <td>{formatNumber(data.values.startingCorpus)}</td>
              </tr>
            ) : null}
            <tr>
              <th>Monthly spending need</th>
              <td>{formatNumber(data.values.monthlySpendingNeed)}</td>
            </tr>
            <tr>
              <th>Expected annual return</th>
              <td>{inputs.annualReturn}%</td>
            </tr>
            <tr>
              <th>Annual inflation adjustment</th>
              <td>{inputs.inflationAdjustment}%</td>
            </tr>
            <tr>
              <th>Years to project</th>
              <td>{data.values.years}</td>
            </tr>
            <tr>
              <th>Emergency reserve</th>
              <td>{formatNumber(data.values.emergencyReserve)}</td>
            </tr>
            <tr>
              <th>Guaranteed monthly income</th>
              <td>{formatNumber(data.values.guaranteedMonthlyIncome)}</td>
            </tr>
            <tr>
              <th>Guaranteed income start year</th>
              <td>{data.values.guaranteedStartYear}</td>
            </tr>
            <tr>
              <th>Guaranteed income inflation adjustment</th>
              <td>{inputs.guaranteedInflationAdjustment}%</td>
            </tr>
          </tbody>
        </table>

        <h2>Key results</h2>
        <table>
          <tbody>
            <tr>
              <th>Monthly SWP needed from corpus</th>
              <td>{formatNumber(data.currentMonthlySwpNeeded)}</td>
            </tr>
            {mode === "projection" ? (
              <>
                <tr>
                  <th>Starting SWP withdrawal rate</th>
                  <td>{formatPercent(data.startingSwpWithdrawalRate)}</td>
                </tr>
                <tr>
                  <th>Total withdrawn from corpus</th>
                  <td>{formatNumber(data.projection.totalWithdrawnFromCorpus)}</td>
                </tr>
                <tr>
                  <th>Total guaranteed income received</th>
                  <td>{formatNumber(data.projection.totalGuaranteedIncome)}</td>
                </tr>
                <tr>
                  <th>Final monthly spending need</th>
                  <td>{formatNumber(data.projection.finalMonthlySpendingNeed)}</td>
                </tr>
                <tr>
                  <th>Final monthly SWP from corpus</th>
                  <td>{formatNumber(data.projection.finalMonthlySwpFromCorpus)}</td>
                </tr>
                <tr>
                  <th>
                    {data.projection.depletionMonth === null
                      ? "Ending corpus"
                      : "Money runs out in"}
                  </th>
                  <td>{projectionStatus}</td>
                </tr>
              </>
            ) : (
              <>
                <tr>
                  <th>Estimated required investment corpus</th>
                  <td>{formatNumber(data.target.requiredInvestmentCorpus)}</td>
                </tr>
                <tr>
                  <th>Emergency reserve</th>
                  <td>{formatNumber(data.targetEmergencyReserve)}</td>
                </tr>
                <tr>
                  <th>Total target corpus</th>
                  <td>{formatNumber(totalTargetCorpus)}</td>
                </tr>
                <tr>
                  <th>First-year SWP withdrawal rate</th>
                  <td>{formatPercent(data.targetWithdrawalRate)}</td>
                </tr>
                <tr>
                  <th>Total guaranteed income over the period</th>
                  <td>
                    {formatNumber(
                      data.target.finalProjection.totalGuaranteedIncome,
                    )}
                  </td>
                </tr>
                <tr>
                  <th>Total withdrawn from corpus</th>
                  <td>
                    {formatNumber(
                      data.target.finalProjection.totalWithdrawnFromCorpus,
                    )}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>

        <h2>Yearly projection</h2>
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Annual spending need</th>
              <th>Guaranteed income</th>
              <th>SWP withdrawn from corpus</th>
              <th>Year-end corpus</th>
            </tr>
          </thead>
          <tbody>
            {activeProjection.yearlyRows.map((row) => (
              <tr key={row.year}>
                <td>{row.year}</td>
                <td>{formatNumber(row.annualSpendingNeed)}</td>
                <td>{formatNumber(row.guaranteedIncome)}</td>
                <td>{formatNumber(row.swpWithdrawnFromCorpus)}</td>
                <td>{formatNumber(row.yearEndCorpus)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="print-disclaimer">
          This is an educational planning estimate, not financial advice. Actual
          results may vary.
        </p>
      </section>

      <div className="stack fire-explainer-stack">
        <section className="panel prose">
          <h2>How to read this calculator</h2>
          <p>
            This calculator is not a guarantee. It is a planning tool. Actual
            returns may be higher or lower. A good SWP plan should keep some
            cash buffer, reduce withdrawals during bad market years, and avoid
            depending on one fixed return assumption.
          </p>
        </section>

        <section className="panel prose">
          <h2>What makes an SWP safer?</h2>
          <ul>
            <li>Lower withdrawal rate</li>
            <li>Diversified portfolio</li>
            <li>Emergency cash buffer</li>
            <li>Flexibility to reduce spending in bad years</li>
            <li>Not assuming the same return every year</li>
            <li>Reviewing the plan once or twice a year</li>
          </ul>
        </section>
      </div>
    </section>
  );
}
