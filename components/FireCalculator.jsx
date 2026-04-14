"use client";

import { useMemo, useState } from "react";

const currencyOptions = {
  USD: { code: "USD", locale: "en-US" },
  INR: { code: "INR", locale: "en-IN" },
  EUR: { code: "EUR", locale: "en-IE" },
  GBP: { code: "GBP", locale: "en-GB" },
};

function formatMoney(value, currency = "USD") {
  const amount = Number(value);
  const config = currencyOptions[currency] || currencyOptions.USD;

  if (!Number.isFinite(amount)) return "$0";

  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.code,
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
  const [currency, setCurrency] = useState("USD");
  const [inputs, setInputs] = useState(defaultInputs);
  const [lifestyle, setLifestyle] = useState("normal");

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

    let headline = `You need ${formatMoney(fireTarget)}.`;
    headline = `You need ${formatMoney(fireTarget, currency)}.`;
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
  }, [currency, inputs, lifestyle]);

  function updateField(key, value) {
    setInputs((current) => ({
      ...current,
      [key]: value,
    }));
  }

  return (
    <section className="fire-tool">
      <div className="fire-grid">
        <div className="panel fire-form-card">
          <h2>Your numbers</h2>

          <div className="fire-form-fields">
            <label className="fire-field">
              <span>Currency</span>
              <select
                value={currency}
                onChange={(event) => setCurrency(event.target.value)}
              >
                <option value="USD">USD ($)</option>
                <option value="INR">INR (₹)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </label>

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

          <div className="fire-summary-stats">
            <div className="soft-card">
              <span>Target spending per year</span>
              <strong>{formatMoney(data.adjustedSpend, currency)}</strong>
            </div>
            <div className="soft-card">
              <span>Main FIRE target</span>
              <strong>{formatMoney(data.fireTarget, currency)}</strong>
            </div>
            <div className="soft-card">
              <span>Barista FIRE target</span>
              <strong>{formatMoney(data.baristaTarget, currency)}</strong>
            </div>
            <div className="soft-card">
              <span>Coast FIRE today</span>
              <strong>{formatMoney(data.coastTarget, currency)}</strong>
            </div>
          </div>

          <div className="fire-feature-box">
            <p>
              <strong>Future value of current investments:</strong>
            </p>
            <p className="fire-big-number">
              {formatMoney(data.futureValue, currency)}
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
        </div>
      </div>

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
