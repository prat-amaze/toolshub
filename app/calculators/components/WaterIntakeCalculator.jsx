"use client";
import { useMemo, useState } from "react";

export default function WaterIntakeCalculator() {
  const [weight, setWeight] = useState(""); // kg
  const [activityMinutes, setActivityMinutes] = useState(""); // per day

  const result = useMemo(() => {
    const w = Number(weight);
    const a = Number(activityMinutes);

    if (!w) return null;

    // base water estimate: 35 ml per kg
    const baseMl = w * 35;

    // activity: add ~12 ml per minute (simple)
    const extraMl = a ? a * 12 : 0;

    const totalMl = baseMl + extraMl;

    return {
      ml: totalMl,
      liters: totalMl / 1000,
    };
  }, [weight, activityMinutes]);

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-2xl font-bold">Water Intake Calculator</h2>
      <p className="mt-1 text-white/70 text-sm">
        Estimate daily water intake based on weight and activity.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Weight (kg)">
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g. 70"
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-yellow-400"
          />
        </Field>

        <Field label="Activity (minutes/day)">
          <input
            type="number"
            value={activityMinutes}
            onChange={(e) => setActivityMinutes(e.target.value)}
            placeholder="e.g. 30"
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-yellow-400"
          />
        </Field>
      </div>

      <ResultBox>
        {!result ? (
          <p className="text-white/70 text-sm">Enter weight to calculate.</p>
        ) : (
          <div>
            <p className="text-3xl font-extrabold text-yellow-400">
              {result.liters.toFixed(2)} L/day
            </p>
            <p className="mt-1 text-white/60 text-sm">
              (~{result.ml.toFixed(0)} ml/day)
            </p>
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
