"use client";

import { useMemo, useState } from "react";

const defaultInputs = {
  startingCorpus: "1000000",
  annualReturn: "7",
  monthlyWithdrawal: "4000",
  inflationAdjustment: "3",
  years: "30",
  emergencyReserve: "0",
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

const fields = [
  {
    key: "startingCorpus",
    label: "Starting corpus",
    step: "1000",
    isMoney: true,
  },
  {
    key: "annualReturn",
    label: "Expected annual return %",
    step: "0.1",
  },
  {
    key: "monthlyWithdrawal",
    label: "Monthly withdrawal",
    step: "100",
    isMoney: true,
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

export default function SwpCalculator() {
  const [currency, setCurrency] = useState("USD");
  const [inputs, setInputs] = useState(defaultInputs);
  const selectedCurrency =
    currencyOptions.find((option) => option.code === currency) ||
    currencyOptions[0];

  const data = useMemo(() => {
    const startingCorpus = toNonNegative(inputs.startingCorpus);
    const annualReturn = toNumber(inputs.annualReturn) / 100;
    const monthlyWithdrawal = toNonNegative(inputs.monthlyWithdrawal);
    const inflationAdjustment = toNumber(inputs.inflationAdjustment) / 100;
    const years = Math.max(1, Math.floor(toNonNegative(inputs.years, 1)));
    const emergencyReserve = Math.min(
      toNonNegative(inputs.emergencyReserve),
      startingCorpus,
    );
    const withdrawalCorpus = Math.max(startingCorpus - emergencyReserve, 0);
    const monthlyReturn =
      annualReturn > -1 ? Math.pow(1 + annualReturn, 1 / 12) - 1 : -1;

    let corpus = withdrawalCorpus;
    let currentWithdrawal = monthlyWithdrawal;
    let totalWithdrawn = 0;
    let finalMonthlyWithdrawal = monthlyWithdrawal;
    let depletionMonth = null;
    const yearlyRows = [];

    for (let year = 1; year <= years; year += 1) {
      let annualWithdrawal = 0;

      for (let month = 1; month <= 12; month += 1) {
        const absoluteMonth = (year - 1) * 12 + month;

        corpus = Math.max(0, corpus * (1 + monthlyReturn));

        const withdrawnThisMonth = Math.min(corpus, currentWithdrawal);
        corpus = Math.max(0, corpus - withdrawnThisMonth);
        annualWithdrawal += withdrawnThisMonth;
        totalWithdrawn += withdrawnThisMonth;
        finalMonthlyWithdrawal = currentWithdrawal;

        if (corpus <= 0 && depletionMonth === null) {
          depletionMonth = absoluteMonth;
          break;
        }
      }

      yearlyRows.push({
        year,
        annualWithdrawal,
        yearEndCorpus: corpus,
      });

      if (depletionMonth !== null) break;

      currentWithdrawal = Math.max(
        0,
        currentWithdrawal * (1 + inflationAdjustment),
      );
    }

    const firstYearWithdrawalRate =
      withdrawalCorpus > 0 ? (monthlyWithdrawal * 12) / withdrawalCorpus : 0;

    return {
      withdrawalCorpus,
      totalWithdrawn,
      finalMonthlyWithdrawal,
      depletionMonth,
      endingCorpus: corpus,
      firstYearWithdrawalRate,
      yearlyRows,
    };
  }, [inputs]);

  function updateField(key, value) {
    setInputs((current) => ({
      ...current,
      [key]: value,
    }));
  }

  const statusText =
    data.depletionMonth === null
      ? formatCurrency(data.endingCorpus, currency)
      : formatRunout(data.depletionMonth);

  return (
    <section className="fire-tool swp-tool">
      <div className="fire-grid swp-grid">
        <div className="panel fire-form-card">
          <h2>Your numbers</h2>

          <div className="fire-form-fields">
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

            {fields.map((field) => (
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
            ))}
          </div>

          <div className="fire-helper-box">
            <strong>Withdrawal corpus</strong>
            <p>
              The calculator uses{" "}
              {formatCurrency(data.withdrawalCorpus, currency)} after excluding
              your emergency reserve.
            </p>
          </div>
        </div>

        <div className="panel fire-summary-card">
          <p className="fire-result-kicker">Your result</p>
          <h2>
            {data.depletionMonth === null
              ? "Your corpus lasts through the projection."
              : "Your corpus runs out before the end."}
          </h2>
          <p className="fire-summary-copy">
            This projection withdraws monthly income and increases that
            withdrawal once a year for inflation.
          </p>

          <div className="fire-summary-stats swp-result-cards">
            <div className="soft-card">
              <span>Starting withdrawal rate</span>
              <strong>{formatPercent(data.firstYearWithdrawalRate)}</strong>
            </div>
            <div className="soft-card">
              <span>Total withdrawn</span>
              <strong>{formatCurrency(data.totalWithdrawn, currency)}</strong>
            </div>
            <div className="soft-card">
              <span>Final monthly withdrawal</span>
              <strong>
                {formatCurrency(data.finalMonthlyWithdrawal, currency)}
              </strong>
            </div>
            <div className="soft-card">
              <span>
                {data.depletionMonth === null
                  ? "Ending corpus"
                  : "Money runs out in"}
              </span>
              <strong>{statusText}</strong>
            </div>
          </div>
        </div>
      </div>

      <section className="panel swp-table-card" aria-labelledby="swp-table-title">
        <h2 id="swp-table-title">Yearly projection</h2>

        <div className="swp-table-wrap">
          <table className="swp-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Annual withdrawal</th>
                <th>Year-end corpus</th>
              </tr>
            </thead>
            <tbody>
              {data.yearlyRows.map((row) => (
                <tr key={row.year}>
                  <td>{row.year}</td>
                  <td>{formatCurrency(row.annualWithdrawal, currency)}</td>
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
