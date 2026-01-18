"use client";
import { useMemo, useState } from "react";

export default function RdCalculator() {
  const [monthly, setMonthly] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");

  const result = useMemo(() => {
    const P = Number(monthly);
    const annualRate = Number(rate);
    const t = Number(years);

    if (!P || !annualRate || !t) return null;

    const n = t * 12;
    const r = annualRate / 12 / 100;

    // RD uses SIP-like future value
    const maturity =
      r === 0
        ? P * n
        : P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));

    const invested = P * n;
    const interest = maturity - invested;

    return { invested, interest, maturity };
  }, [monthly, rate, years]);

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-2xl font-bold">RD Calculator</h2>
      <p className="mt-1 text-white/70 text-sm">Recurring Deposit maturity estimate.</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input label="Monthly Deposit (₹)" value={monthly} setValue={setMonthly} />
        <Input label="Rate (% p.a.)" value={rate} setValue={setRate} />
        <Input label="Years" value={years} setValue={setYears} />
      </div>

      <ResultBox result={result} />
    </div>
  );
}

function Input({ label, value, setValue }) {
  return (
    <div>
      <label className="text-sm text-white/70">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-yellow-400"
      />
    </div>
  );
}

function ResultBox({ result }) {
  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5">
      {!result ? (
        <p className="text-white/70 text-sm">Enter values to calculate.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card title="Invested" value={`₹${result.invested.toFixed(0)}`} />
          <Card title="Interest" value={`₹${result.interest.toFixed(0)}`} yellow />
          <Card title="Maturity" value={`₹${result.maturity.toFixed(0)}`} green />
        </div>
      )}
    </div>
  );
}

function Card({ title, value, yellow, green }) {
  return (
    <div>
      <p className="text-white/60 text-sm">{title}</p>
      <p
        className={`text-lg font-bold ${
          yellow ? "text-yellow-400" : green ? "text-green-400" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
