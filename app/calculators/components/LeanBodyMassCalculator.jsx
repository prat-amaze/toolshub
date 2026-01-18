"use client";
import { useMemo, useState } from "react";

export default function LeanBodyMassCalculator() {
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState(""); // kg
  const [height, setHeight] = useState(""); // cm

  const result = useMemo(() => {
    const W = Number(weight);
    const H = Number(height);

    if (!W || !H) return null;

    let lbm = 0;

    // Boer Formula
    if (gender === "male") {
      lbm = 0.407 * W + 0.267 * H - 19.2;
    } else {
      lbm = 0.252 * W + 0.473 * H - 48.3;
    }

    const fatMass = W - lbm;

    return {
      lbm,
      fatMass,
      weight: W,
    };
  }, [gender, weight, height]);

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-2xl font-bold">Lean Body Mass Calculator</h2>
      <p className="mt-1 text-white/70 text-sm">
        Estimate lean body mass using Boer formula.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label="Gender">
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-yellow-400"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </Field>

        <Field label="Weight (kg)">
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g. 70"
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-yellow-400"
          />
        </Field>

        <Field label="Height (cm)">
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g. 170"
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-yellow-400"
          />
        </Field>
      </div>

      <ResultBox>
        {!result ? (
          <p className="text-white/70 text-sm">Enter values to calculate.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-white/60 text-sm">Lean Mass</p>
              <p className="text-2xl font-extrabold text-yellow-400">
                {result.lbm.toFixed(1)} kg
              </p>
            </div>
            <div>
              <p className="text-white/60 text-sm">Fat Mass</p>
              <p className="text-2xl font-extrabold text-white">
                {result.fatMass.toFixed(1)} kg
              </p>
            </div>
            <div>
              <p className="text-white/60 text-sm">Total Weight</p>
              <p className="text-2xl font-extrabold text-green-400">
                {result.weight.toFixed(1)} kg
              </p>
            </div>
          </div>
        )}
      </ResultBox>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-sm text-white/70">{label}</label>
      {children}
    </div>
  );
}

function ResultBox({ children }) {
  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5">
      {children}
    </div>
  );
}
