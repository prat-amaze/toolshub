"use client";

import { useMemo, useState } from "react";

export default function EmiCalculator() {
  const [principal, setPrincipal] = useState("");
  const [years, setYears] = useState("");
  const [rate, setRate] = useState("");

  const result = useMemo(() => {
    const P = Number(principal);
    const t = Number(years);
    const annualRate = Number(rate);

    if (!P || !t || !annualRate) return null;

    const n = t * 12; // months
    const r = annualRate / 12 / 100; // monthly interest rate

    if (r === 0) {
      const emi = P / n;
      const totalPayment = emi * n;
      return {
        emi,
        totalPayment,
        totalInterest: 0,
      };
    }

    const pow = Math.pow(1 + r, n);

    const emi = (P * r * pow) / (pow - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    return {
      emi,
      totalPayment,
      totalInterest,
    };
  }, [principal, years, rate]);

  const formatINR = (num) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(num);

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-2xl font-bold">EMI Calculator</h2>
      <p className="mt-1 text-white/70 text-sm">
        Calculate monthly EMI, total interest and total repayment.
      </p>

      {/* Inputs */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-white/70">Loan Amount (₹)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="e.g. 500000"
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-orange-500"
          />
        </div>

        <div>
          <label className="text-sm text-white/70">Interest Rate (% p.a.)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="e.g. 10"
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-orange-500"
          />
        </div>

        <div>
          <label className="text-sm text-white/70">Tenure (Years)</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            placeholder="e.g. 5"
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Output */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5">
        {!result ? (
          <p className="text-white/70 text-sm">
            Enter values to calculate EMI.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-white/60 text-sm">Monthly EMI</p>
              <p className="text-lg font-bold text-orange-400">
                {formatINR(result.emi)}
              </p>
            </div>

            <div>
              <p className="text-white/60 text-sm">Total Interest</p>
              <p className="text-lg font-bold text-white">
                {formatINR(result.totalInterest)}
              </p>
            </div>

            <div>
              <p className="text-white/60 text-sm">Total Payment</p>
              <p className="text-lg font-bold text-green-400">
                {formatINR(result.totalPayment)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Reset */}
      <button
        onClick={() => {
          setPrincipal("");
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
