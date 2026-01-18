"use client";

import { useMemo, useState } from "react";

export default function CgpaToPercentage() {
  const [cgpa, setCgpa] = useState("");
  const [multiplier, setMultiplier] = useState("9.5");

  const result = useMemo(() => {
    const c = Number(cgpa);
    const m = Number(multiplier);

    if (!c || !m) return null;

    const pct = c * m;
    return pct > 100 ? 100 : pct;
  }, [cgpa, multiplier]);

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-2xl font-bold">CGPA to Percentage</h2>
      <p className="mt-1 text-white/70 text-sm">
        Convert CGPA into percentage using a multiplier.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-white/70">CGPA</label>
          <input
            type="number"
            value={cgpa}
            onChange={(e) => setCgpa(e.target.value)}
            placeholder="e.g. 8.4"
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-yellow-400"
          />
        </div>

        <div>
          <label className="text-sm text-white/70">Multiplier</label>
          <input
            type="number"
            value={multiplier}
            onChange={(e) => setMultiplier(e.target.value)}
            placeholder="e.g. 9.5"
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-yellow-400"
          />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5">
        {result === null ? (
          <p className="text-white/70 text-sm">Enter values to convert.</p>
        ) : (
          <p className="text-3xl font-extrabold text-yellow-400">
            {result.toFixed(2)}%
          </p>
        )}
      </div>
    </div>
  );
}
