"use client";
import { useMemo, useState } from "react";

export default function BmiCalculator() {
  const [weight, setWeight] = useState(""); // kg
  const [height, setHeight] = useState(""); // cm

  const result = useMemo(() => {
    const w = Number(weight);
    const hCm = Number(height);

    if (!w || !hCm) return null;

    const hM = hCm / 100;
    const bmi = w / (hM * hM);

    let category = "Normal";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Normal";
    else if (bmi < 30) category = "Overweight";
    else category = "Obese";

    return { bmi, category };
  }, [weight, height]);

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-2xl font-bold">BMI Calculator</h2>
      <p className="mt-1 text-white/70 text-sm">
        Calculate your Body Mass Index and category.
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
          <div>
            <p className="text-3xl font-extrabold text-yellow-400">
              {result.bmi.toFixed(2)}
            </p>
            <p className="mt-1 text-white/60 text-sm">
              Category: <span className="text-white font-semibold">{result.category}</span>
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
