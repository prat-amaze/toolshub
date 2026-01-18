"use client";
import { useMemo, useState } from "react";

export default function TdeeCalculator() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("1.375");

  const result = useMemo(() => {
    const A = Number(age);
    const W = Number(weight);
    const H = Number(height);
    const factor = Number(activity);

    if (!A || !W || !H || !factor) return null;

    const bmr =
      gender === "male"
        ? 10 * W + 6.25 * H - 5 * A + 5
        : 10 * W + 6.25 * H - 5 * A - 161;

    const tdee = bmr * factor;

    return { bmr, tdee };
  }, [gender, age, weight, height, activity]);

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-2xl font-bold">TDEE Calculator</h2>
      <p className="mt-1 text-white/70 text-sm">
        Daily calorie needs based on your activity level.
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

        <Field label="Age (years)">
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="e.g. 22"
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-yellow-400"
          />
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

        <div className="md:col-span-2">
          <label className="text-sm text-white/70">Activity Level</label>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-yellow-400"
          >
            <option value="1.2">Sedentary (little/no exercise)</option>
            <option value="1.375">Light (1-3 days/week)</option>
            <option value="1.55">Moderate (3-5 days/week)</option>
            <option value="1.725">Active (6-7 days/week)</option>
            <option value="1.9">Very Active (physical job + workouts)</option>
          </select>
        </div>
      </div>

      <ResultBox>
        {!result ? (
          <p className="text-white/70 text-sm">Enter values to calculate.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-white/60 text-sm">BMR</p>
              <p className="text-2xl font-extrabold text-white">
                {result.bmr.toFixed(0)} kcal/day
              </p>
            </div>
            <div>
              <p className="text-white/60 text-sm">TDEE</p>
              <p className="text-2xl font-extrabold text-yellow-400">
                {result.tdee.toFixed(0)} kcal/day
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
