"use client";

import { useMemo, useState } from "react";

export default function IncomeTaxCalculator() {
  const [income, setIncome] = useState("");

  const result = useMemo(() => {
    const taxableIncome = Number(income);

    if (!taxableIncome || taxableIncome < 0) return null;

    // ✅ NEW REGIME (LATEST) - FY 2025-26 (AY 2026-27)
    // Slabs assumed:
    // 0 - 4L : 0%
    // 4L - 8L : 5%
    // 8L - 12L : 10%
    // 12L - 16L : 15%
    // 16L - 20L : 20%
    // 20L - 24L : 25%
    // 24L+ : 30%
    //
    // ✅ 87A rebate: income <= 12L => tax becomes 0 (rebate up to 60,000)
    // ✅ Cess: 4%

    const slabs = [
      { upto: 400000, rate: 0 },
      { upto: 800000, rate: 0.05 },
      { upto: 1200000, rate: 0.1 },
      { upto: 1600000, rate: 0.15 },
      { upto: 2000000, rate: 0.2 },
      { upto: 2400000, rate: 0.25 },
      { upto: Infinity, rate: 0.3 },
    ];

    // Calculate tax before rebate
    let tax = 0;
    let prev = 0;

    for (const slab of slabs) {
      const currentLimit = slab.upto;
      if (taxableIncome > prev) {
        const taxablePart = Math.min(taxableIncome, currentLimit) - prev;
        tax += taxablePart * slab.rate;
        prev = currentLimit;
      }
    }

    // ✅ Rebate 87A (Latest): income up to 12L => rebate up to 60k
    // (rebate applied BEFORE cess)
    let rebate = 0;
    const rebateLimit = 1200000;
    const maxRebate = 60000;

    if (taxableIncome <= rebateLimit) {
      rebate = Math.min(tax, maxRebate);
    }

    const taxAfterRebate = Math.max(0, tax - rebate);

    // ✅ Cess @ 4%
    const cess = taxAfterRebate * 0.04;
    const finalTax = taxAfterRebate + cess;

    return {
      taxableIncome,
      taxBeforeRebate: tax,
      rebate,
      taxAfterRebate,
      cess,
      finalTax,
    };
  }, [income]);

  const formatINR = (num) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(num);

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-2xl font-bold">Income Tax Calculator (India)</h2>
      <p className="mt-1 text-white/70 text-sm">
        New Regime only (latest). Shows rebate + cess breakdown.
      </p>

      <div className="mt-6">
        <label className="text-sm text-white/70">Taxable Income (₹)</label>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          placeholder="e.g. 1200000"
          className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-yellow-400"
        />
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5">
        {!result ? (
          <p className="text-white/70 text-sm">Enter income to calculate.</p>
        ) : (
          <div className="space-y-3">
            <Line label="Tax before rebate" value={formatINR(result.taxBeforeRebate)} />
            <Line label="Rebate (87A)" value={`- ${formatINR(result.rebate)}`} yellow />
            <Line label="Tax after rebate" value={formatINR(result.taxAfterRebate)} />
            <Line label="Cess (4%)" value={formatINR(result.cess)} />
            <div className="pt-3 border-t border-white/10">
              <Line label="Final Tax Payable" value={formatINR(result.finalTax)} green />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Line({ label, value, yellow, green }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-white/60 text-sm">{label}</p>
      <p
        className={`font-semibold ${
          yellow ? "text-yellow-400" : green ? "text-green-400" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
