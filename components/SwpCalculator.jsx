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

const currencyOptions = [
  { code: "USD", label: "USD: $", prefix: "$" },
  { code: "INR", label: "INR: ₹", prefix: "₹" },
  { code: "EUR", label: "EUR: €", prefix: "€" },
  { code: "GBP", label: "GBP: £", prefix: "£" },
  { code: "CAD", label: "CAD: C$", prefix: "C$" },
  { code: "AUD", label: "AUD: A$", prefix: "A$" },
  { code: "CHF", label: "CHF: CHF", prefix: "CHF" },
  { code: "JPY", label: "JPY: ¥", prefix: "¥" },
];

const mainFields = [
  {
    key: "startingCorpus",
    label: "Starting corpus",
    step: "1000",
    isMoney: true,
    projectionOnly: true,
  },
  {
    key: "monthlySpendingNeed",
    label: "Monthly spending need",
    step: "100",
    isMoney: true,
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
    isMoney: true,
  },
];

const guaranteedFields = [
  {
    key: "guaranteedMonthlyIncome",
    label: "Guaranteed monthly income",
    step: "100",
    isMoney: true,
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

function formatCurrency(value, currencyCode = "USD") {
  const amount = Number(value);
  const currency =
    currencyOptions.find((option) => option.code === currencyCode) ||
    currencyOptions[0];

  if (!Number.isFinite(amount)) return `${currency.prefix}0`;

  const formattedAmount = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(Math.max(0, amount));

  return `${currency.prefix}${formattedAmount}`;
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
  const [currency, setCurrency] = useState("USD");
  const [inputs, setInputs] = useState(defaultInputs);
  const selectedCurrency =
    currencyOptions.find((option) => option.code === currency) ||
    currencyOptions[0];

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

  function renderField(field) {
    return (
      <label key={field.key} className="fire-field">
        <span>
          {field.label}
          {field.isMoney ? ` (${selectedCurrency.prefix})` : ""}
        </span>
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
      ? formatCurrency(data.projection.endingCorpus, currency)
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

        <div className="fire-form-fields swp-fields-grid">
          <label className="fire-field">
            <span>Currency</span>
            <select
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
            >
              {currencyOptions.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.label}
                </option>
              ))}
            </select>
            <small className="swp-currency-helper">
              Currency changes the display symbol only. It does not convert
              values.
            </small>
          </label>

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
            {formatCurrency(data.currentMonthlySwpNeeded, currency)}
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
                {formatCurrency(
                  data.projection.totalWithdrawnFromCorpus,
                  currency,
                )}
              </strong>
            </div>
            <div className="soft-card">
              <span>Total guaranteed income received</span>
              <strong>
                {formatCurrency(data.projection.totalGuaranteedIncome, currency)}
              </strong>
            </div>
            <div className="soft-card">
              <span>Final monthly spending need</span>
              <strong>
                {formatCurrency(data.projection.finalMonthlySpendingNeed, currency)}
              </strong>
            </div>
            <div className="soft-card">
              <span>Final monthly SWP from corpus</span>
              <strong>
                {formatCurrency(data.projection.finalMonthlySwpFromCorpus, currency)}
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
                {formatCurrency(data.target.requiredInvestmentCorpus, currency)}
              </strong>
            </div>
            <div className="soft-card">
              <span>Emergency reserve</span>
              <strong>
                {formatCurrency(data.targetEmergencyReserve, currency)}
              </strong>
            </div>
            <div className="soft-card">
              <span>Total target corpus</span>
              <strong>{formatCurrency(totalTargetCorpus, currency)}</strong>
            </div>
            <div className="soft-card">
              <span>First-year SWP withdrawal rate</span>
              <strong>{formatPercent(data.targetWithdrawalRate)}</strong>
            </div>
            <div className="soft-card">
              <span>Total guaranteed income over the period</span>
              <strong>
                {formatCurrency(
                  data.target.finalProjection.totalGuaranteedIncome,
                  currency,
                )}
              </strong>
            </div>
            <div className="soft-card">
              <span>Total withdrawn from corpus</span>
              <strong>
                {formatCurrency(
                  data.target.finalProjection.totalWithdrawnFromCorpus,
                  currency,
                )}
              </strong>
            </div>
          </div>
        )}
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
                  <td>{formatCurrency(row.annualSpendingNeed, currency)}</td>
                  <td>{formatCurrency(row.guaranteedIncome, currency)}</td>
                  <td>
                    {formatCurrency(row.swpWithdrawnFromCorpus, currency)}
                  </td>
                  <td>{formatCurrency(row.yearEndCorpus, currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
