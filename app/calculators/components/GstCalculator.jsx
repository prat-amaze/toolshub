"use client";

import { useMemo, useState } from "react";

export default function GstCalculator() {
  const [amount, setAmount] = useState("");
  const [gstRate, setGstRate] = useState("18");
  const [mode, setMode] = useState("exclusive"); // exclusive => add GST, inclusive => remove GST

  const result = useMemo(() => {
    const A = Number(amount);
    const R = Number(gstRate);

    if (!A || !R) return null;

    if (mode === "exclusive") {
      const gst = (A * R) / 100;
      const total = A + gst;
      return { gst, total, base: A };
    } else {
      // inclusive: total includes GST; find base price
      const base = A / (1 + R / 100);
      const gst = A - base;
      return { gst, total: A, base };
    }
  }, [amount, gstRate, mode]);

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-2xl font-bold">GST Calculator</h2>
      <p className="mt-1 text-white/70 text-sm">
        Calculate GST for inclusive or exclusive amount.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-white/70">
            Amount (₹) {mode === "exclusive" ? "(Base)" : "(Total)"}
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 1000"
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-yellow-400"
          />
        </div>

        <div>
          <label className="text-sm text-white/70">GST Rate (%)</label>
          <input
            type="number"
            value={gstRate}
            onChange={(e) => setGstRate(e.target.value)}
            placeholder="e.g. 18"
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-yellow-400"
          />
        </div>

        <div>
          <label className="text-sm text-white/70">Mode</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-yellow-400"
          >
            <option value="exclusive">Exclusive (Add GST)</option>
            <option value="inclusive">Inclusive (Remove GST)</option>
          </select>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5">
        {!result ? (
          <p className="text-white/70 text-sm">Enter values to calculate.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-white/60 text-sm">Base Amount</p>
              <p className="text-lg font-bold text-white">
                ₹{result.base.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-white/60 text-sm">GST Amount</p>
              <p className="text-lg font-bold text-yellow-400">
                ₹{result.gst.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-white/60 text-sm">Total Amount</p>
              <p className="text-lg font-bold text-green-400">
                ₹{result.total.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
