"use client";

import { useMemo, useState } from "react";

export default function IdealWeightCalculator() {
  const [gender, setGender] = useState("male");
  const [heightCm, setHeightCm] = useState("");

  const result = useMemo(() => {
    const h = Number(heightCm);
    if (!h) return null;

    const heightInch = h / 2.54;

    // Devine formula uses height over 5ft (60 inches)
    const base = gender === "male" ? 50 : 45.5;
    const extra = 2.3 * Math.max(0, heightInch - 60);

    return base + extra;
  }, [gender, heightCm]);

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-2xl font-bold">Ideal Weight Calculator</h2>
      <p className="mt-1 text-white/70 text-sm">
        Estimate ideal body weight using the Devine formula.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-white/70">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-yellow-400"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-white/70">Height (cm)</label>
          <input
            type="number"
            value={heightCm}
            onChange={(e) => setHeightCm(e.target.value)}
            placeholder="e.g. 170"
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-yellow-400"
          />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5">
        {!result ? (
          <p className="text-white/70 text-sm">Enter values to calculate.</p>
        ) : (
          <p className="text-3xl font-extrabold text-yellow-400">
            {result.toFixed(1)} kg
          </p>
        )}
      </div>
    </div>
  );
}
