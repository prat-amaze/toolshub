"use client";

import { useMemo, useState } from "react";

export default function PercentageCalculator() {
  const [value, setValue] = useState("");
  const [total, setTotal] = useState("");

  const result = useMemo(() => {
    const v = Number(value);
    const t = Number(total);

    if (!v || !t) return null;
    if (t === 0) return "Total cannot be 0";

    return (v / t) * 100;
  }, [value, total]);

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-2xl font-bold">Percentage Calculator</h2>
      <p className="mt-1 text-white/70 text-sm">
        Find what percent a value is of a total.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-white/70">Value</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="e.g. 45"
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-yellow-400"
          />
        </div>

        <div>
          <label className="text-sm text-white/70">Total</label>
          <input
            type="number"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            placeholder="e.g. 60"
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-yellow-400"
          />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5">
        {result === null ? (
          <p className="text-white/70 text-sm">Enter values to calculate.</p>
        ) : typeof result === "string" ? (
          <p className="text-red-500 font-semibold">{result}</p>
        ) : (
          <p className="text-3xl font-extrabold text-yellow-400">
            {result.toFixed(2)}%
          </p>
        )}
      </div>
    </div>
  );
}
