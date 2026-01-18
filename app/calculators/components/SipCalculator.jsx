"use client";

import { useMemo, useState } from "react";

export default function SipCalculator() {
  const [monthlyAmount, setMonthlyAmount] = useState("");
  const [years, setYears] = useState("");
  const [rate, setRate] = useState("");

  const result = useMemo(() => {
    const P = Number(monthlyAmount);
    const t = Number(years);
    const annualRate = Number(rate);

    if (!P || !t || !annualRate) {
      return null;
    }

    const n = t * 12; // months
    const r = annualRate / 12 / 100; // monthly interest rate

    if (r === 0) {
      const totalInvested = P * n;
      return {
        totalInvested,
        totalValue: totalInvested,
        totalReturns: 0,
      };
    }

    const totalValue = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    const totalInvested = P * n;
    const totalReturns = totalValue - totalInvested;

    return {
      totalInvested,
      totalValue,
      totalReturns,
    };
  }, [monthlyAmount, years, rate]);

  const formatINR = (num) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(num);

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-2xl font-bold">SIP Calculator</h2>
      <p className="mt-1 text-white/70 text-sm">
        Calculate your SIP maturity amount based on monthly investment, duration,
        and expected return rate.
      </p>

      {/* Inputs */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-white/70">Monthly Investment (₹)</label>
          <input
            type="number"
            value={monthlyAmount}
            onChange={(e) => setMonthlyAmount(e.target.value)}
            placeholder="e.g. 5000"
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-orange-500"
          />
        </div>

        <div>
          <label className="text-sm text-white/70">Duration (Years)</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            placeholder="e.g. 10"
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-orange-500"
          />
        </div>

        <div>
          <label className="text-sm text-white/70">
            Expected Return (% p.a.)
          </label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="e.g. 12"
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Output */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5">
        {!result ? (
          <p className="text-white/70 text-sm">
            Enter values to calculate SIP returns.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-white/60 text-sm">Total Invested</p>
              <p className="text-lg font-bold text-white">
                {formatINR(result.totalInvested)}
              </p>
            </div>

            <div>
              <p className="text-white/60 text-sm">Estimated Returns</p>
              <p className="text-lg font-bold text-yellow-400">
                {formatINR(result.totalReturns)}
              </p>
            </div>

            <div>
              <p className="text-white/60 text-sm">Total Value</p>
              <p className="text-lg font-bold text-green-400">
                {formatINR(result.totalValue)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Reset */}
      <button
        onClick={() => {
          setMonthlyAmount("");
          setYears("");
          setRate("");
        }}
        className="mt-6 w-full rounded-xl bg-yellow-500 text-black font-semibold py-3 hover:bg-yellow-400 transition"
      >
        Reset
      </button>
    </div>
  );
}
