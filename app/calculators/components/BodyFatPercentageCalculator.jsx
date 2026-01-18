"use client";
import { useMemo, useState } from "react";

export default function BodyFatPercentageCalculator() {
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState(""); // cm
  const [neck, setNeck] = useState(""); // cm
  const [waist, setWaist] = useState(""); // cm
  const [hip, setHip] = useState(""); // cm (female)

  const result = useMemo(() => {
    const H = Number(height);
    const N = Number(neck);
    const W = Number(waist);
    const Hip = Number(hip);

    if (!H || !N || !W) return null;
    if (gender === "female" && !Hip) return null;

    // Convert to inches because formula uses log10 with inch inputs
    const cmToIn = (x) => x / 2.54;

    const h = cmToIn(H);
    const n = cmToIn(N);
    const w = cmToIn(W);
    const hip = cmToIn(Hip);

    let bf = 0;

    if (gender === "male") {
      bf =
        86.010 * Math.log10(w - n) -
        70.041 * Math.log10(h) +
        36.76;
    } else {
      bf =
        163.205 * Math.log10(w + hip - n) -
        97.684 * Math.log10(h) -
        78.387;
    }

    // safety clamp
    if (!isFinite(bf)) return "Invalid values";
    bf = Math.max(0, Math.min(75, bf));

    return bf;
  }, [gender, height, neck, waist, hip]);

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-2xl font-bold">Body Fat % Calculator</h2>
      <p className="mt-1 text-white/70 text-sm">
        Estimate body fat percentage using the US Navy method.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <Field label="Height (cm)">
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g. 170"
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-yellow-400"
          />
        </Field>

        <Field label="Neck (cm)">
          <input
            type="number"
            value={neck}
            onChange={(e) => setNeck(e.target.value)}
            placeholder="e.g. 36"
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-yellow-400"
          />
        </Field>

        <Field label="Waist (cm)">
          <input
            type="number"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            placeholder="e.g. 80"
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-yellow-400"
          />
        </Field>

        {gender === "female" && (
          <div className="md:col-span-2">
            <label className="text-sm text-white/70">Hip (cm)</label>
            <input
              type="number"
              value={hip}
              onChange={(e) => setHip(e.target.value)}
              placeholder="e.g. 95"
              className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-yellow-400"
            />
          </div>
        )}
      </div>

      <ResultBox>
        {result === null ? (
          <p className="text-white/70 text-sm">Enter values to calculate.</p>
        ) : typeof result === "string" ? (
          <p className="text-red-500 font-semibold">{result}</p>
        ) : (
          <p className="text-3xl font-extrabold text-yellow-400">
            {result.toFixed(2)}%
          </p>
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
