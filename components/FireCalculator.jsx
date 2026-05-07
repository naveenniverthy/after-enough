"use client";

import { useMemo, useState } from "react";

function formatNumber(value) {
  const amount = Number(value);

  if (!Number.isFinite(amount)) return "0";

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(Math.max(0, amount));
}

function toNumber(value, fallback = 0) {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : fallback;
}

function toNonNegative(value, fallback = 0) {
  return Math.max(0, toNumber(value, fallback));
}

const defaultInputs = {
  invested: "250000",
  monthlySpend: "4000",
  partTimeIncome: "1500",
  years: "10",
  returnRate: "7",
};

const fields = [
  { key: "invested", label: "Current investments", step: "1000" },
  { key: "monthlySpend", label: "Monthly spending", step: "100" },
  {
    key: "partTimeIncome",
    label: "Monthly part-time income (optional)",
    step: "100",
  },
  { key: "years", label: "Years until retirement", step: "1" },
  { key: "returnRate", label: "Expected return (%)", step: "0.1" },
];

const lifestyles = [
  {
    value: "lean",
    label: "Simple life (spend less)",
    description: "Lower spending and a smaller target.",
  },
  {
    value: "normal",
    label: "Similar to today",
    description: "Uses your current spending as-is.",
  },
  {
    value: "fat",
    label: "More comfort (spend more)",
    description: "Assumes a higher-spending lifestyle.",
  },
];

export default function FireCalculator() {
  const [inputs, setInputs] = useState(defaultInputs);
  const [lifestyle, setLifestyle] = useState("normal");
  const [generatedDate, setGeneratedDate] = useState("");

  const data = useMemo(() => {
    const invested = toNonNegative(inputs.invested);
    const monthlySpend = toNonNegative(inputs.monthlySpend);
    const partTimeIncome = toNonNegative(inputs.partTimeIncome);
    const years = toNonNegative(inputs.years);
    const returnRate = toNumber(inputs.returnRate) / 100;
    const annualSpend = monthlySpend * 12;
    const growthFactor = Math.max(0.0001, 1 + returnRate);

    let adjustedSpend = annualSpend;

    if (lifestyle === "lean") adjustedSpend = annualSpend * 0.8;
    if (lifestyle === "fat") adjustedSpend = annualSpend * 1.5;

    const fireTarget = adjustedSpend * 25;
    const baristaTarget = Math.max(adjustedSpend - partTimeIncome * 12, 0) * 25;
    const coastTarget =
      years > 0 ? fireTarget / Math.pow(growthFactor, years) : fireTarget;
    const futureValue = invested * Math.pow(growthFactor, years);
    const progress = fireTarget > 0 ? (invested / fireTarget) * 100 : 0;
    const safeProgress = Math.min(Math.max(progress, 0), 100);

    let headline = `You need ${formatNumber(fireTarget)}.`;
    let subline =
      "This is based on your spending and the lifestyle you chose.";

    if (invested >= fireTarget && fireTarget > 0) {
      headline = "You may already be financially independent.";
      subline = "Your current investments appear large enough for this target.";
    } else if (invested >= baristaTarget && baristaTarget > 0) {
      headline = "You may already be close to Barista FIRE.";
      subline =
        "Part-time income meaningfully reduces the size of portfolio you need.";
    } else if (invested >= coastTarget && coastTarget > 0) {
      headline = "You may already be at Coast FIRE.";
      subline =
        "Your current investments may already be enough to grow into your target by retirement.";
    }

    return {
      invested,
      annualSpend,
      adjustedSpend,
      fireTarget,
      baristaTarget,
      coastTarget,
      futureValue,
      progress,
      safeProgress,
      headline,
      subline,
    };
  }, [inputs, lifestyle]);

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

  return (
    <section className="fire-tool">
      <div className="fire-grid">
        <div className="panel fire-form-card">
          <h2>Your numbers</h2>

          <div className="fire-helper-box calculator-note">
            <p>Use any currency. Keep all money inputs in the same currency.</p>
          </div>

          <div className="fire-form-fields">
            {fields.map((field) => (
              <label key={field.key} className="fire-field">
                <span>{field.label}</span>
                <input
                  type="number"
                  inputMode="decimal"
                  step={field.step}
                  value={inputs[field.key]}
                  onChange={(event) => updateField(field.key, event.target.value)}
                />
              </label>
            ))}
          </div>

          <div className="fire-lifestyle-box">
            <strong>Choose your lifestyle</strong>

            <div className="fire-radio-group" role="radiogroup" aria-label="Lifestyle">
              {lifestyles.map((option) => (
                <label key={option.value} className="fire-radio-option">
                  <input
                    type="radio"
                    name="lifestyle"
                    checked={lifestyle === option.value}
                    onChange={() => setLifestyle(option.value)}
                  />
                  <span>
                    <strong>{option.label}</strong>
                    <small>{option.description}</small>
                  </span>
                </label>
              ))}
            </div>

            <p className="fire-hint">
              Lean means lower spending. Normal means similar spending. Fat
              means higher spending.
            </p>
          </div>
        </div>

        <div className="panel fire-summary-card">
          <p className="fire-result-kicker">Your result</p>
          <h2>{data.headline}</h2>
          <p className="fire-summary-copy">{data.subline}</p>
          <p className="fire-summary-copy">
            You may not need the highest number. Your &ldquo;enough&rdquo;
            depends on how you choose to live.
          </p>

          <div className="fire-summary-stats">
            <div className="soft-card">
              <span>Target spending per year</span>
              <strong>{formatNumber(data.adjustedSpend)}</strong>
            </div>
            <div className="soft-card">
              <span>Main FIRE target</span>
              <strong>{formatNumber(data.fireTarget)}</strong>
            </div>
            <div className="soft-card">
              <span>Barista FIRE target</span>
              <strong>{formatNumber(data.baristaTarget)}</strong>
            </div>
            <div className="soft-card">
              <span>Coast FIRE today</span>
              <strong>{formatNumber(data.coastTarget)}</strong>
            </div>
          </div>

          <div className="fire-feature-box">
            <p>
              <strong>Future value of current investments:</strong>
            </p>
            <p className="fire-big-number">
              {formatNumber(data.futureValue)}
            </p>
          </div>

          <div className="fire-progress-track" aria-hidden="true">
            <div
              className="fire-progress-fill"
              style={{ width: `${data.safeProgress}%` }}
            />
          </div>

          <p className="fire-progress-text">
            You are {Math.round(data.progress)}% of the way.
          </p>

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
        </div>
      </div>

      <section className="printable-calculator-summary" aria-hidden="true">
        <h1>Simple FIRE Calculator</h1>
        <p className="print-date">
          Date generated: {generatedDate || "Not generated"}
        </p>

        <h2>User inputs</h2>
        <table>
          <tbody>
            <tr>
              <th>Current investments</th>
              <td>{formatNumber(data.invested)}</td>
            </tr>
            <tr>
              <th>Monthly spending</th>
              <td>{formatNumber(inputs.monthlySpend)}</td>
            </tr>
            <tr>
              <th>Monthly part-time income</th>
              <td>{formatNumber(inputs.partTimeIncome)}</td>
            </tr>
            <tr>
              <th>Years until retirement</th>
              <td>{inputs.years}</td>
            </tr>
            <tr>
              <th>Expected return</th>
              <td>{inputs.returnRate}%</td>
            </tr>
            <tr>
              <th>Lifestyle</th>
              <td>{lifestyles.find((item) => item.value === lifestyle)?.label}</td>
            </tr>
          </tbody>
        </table>

        <h2>Key results</h2>
        <table>
          <tbody>
            <tr>
              <th>Result</th>
              <td>{data.headline}</td>
            </tr>
            <tr>
              <th>Target spending per year</th>
              <td>{formatNumber(data.adjustedSpend)}</td>
            </tr>
            <tr>
              <th>Main FIRE target</th>
              <td>{formatNumber(data.fireTarget)}</td>
            </tr>
            <tr>
              <th>Barista FIRE target</th>
              <td>{formatNumber(data.baristaTarget)}</td>
            </tr>
            <tr>
              <th>Coast FIRE today</th>
              <td>{formatNumber(data.coastTarget)}</td>
            </tr>
            <tr>
              <th>Future value of current investments</th>
              <td>{formatNumber(data.futureValue)}</td>
            </tr>
          </tbody>
        </table>

        <p className="print-disclaimer">
          This is an educational planning estimate, not financial advice. Actual
          results may vary.
        </p>
      </section>

      <div className="stack fire-explainer-stack">
        <section className="panel prose">
          <h2>What this means</h2>
          <div className="fire-explain-grid">
            <div className="soft-card">
              <h3>Lean FIRE</h3>
              <p>Living with lower expenses means you need less money invested.</p>
            </div>
            <div className="soft-card">
              <h3>Regular FIRE</h3>
              <p>Keeping a lifestyle similar to today means using your current spending.</p>
            </div>
            <div className="soft-card">
              <h3>Fat FIRE</h3>
              <p>A more comfortable lifestyle simply means planning for higher spending.</p>
            </div>
            <div className="soft-card">
              <h3>The main difference</h3>
              <p>The real variable is how much you want to spend each year.</p>
            </div>
            <div className="soft-card">
              <h3>Across currencies</h3>
              <p>The logic stays the same. Only the number formatting changes.</p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
