"use client";

import { useMemo, useState } from "react";

export default function AttendanceCalculator() {
  const [attended, setAttended] = useState("");
  const [total, setTotal] = useState("");
  const [required, setRequired] = useState("75");

  const result = useMemo(() => {
    const a = Number(attended);
    const t = Number(total);
    const req = Number(required);

    if (!t || t < 0 || a < 0) return null;
    if (a > t) return "Attended classes cannot be more than total classes";

    const current = (a / t) * 100;

    // Classes needed to reach required %
    // (a + x) / (t + x) >= req/100
    const target = req / 100;

    let x = 0;
    if (current < req) {
      // Solve inequality
      // a + x >= target(t + x)
      // a + x >= target*t + target*x
      // x - target*x >= target*t - a
      // x(1 - target) >= target*t - a
      x = (target * t - a) / (1 - target);
      x = Math.ceil(x);
      if (x < 0) x = 0;
    }

    return { current, x, req };
  }, [attended, total, required]);

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-2xl font-bold">Attendance Calculator</h2>
      <p className="mt-1 text-white/70 text-sm">
        Check current attendance and how many more classes you need.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-white/70">Classes Attended</label>
          <input
            type="number"
            value={attended}
            onChange={(e) => setAttended(e.target.value)}
            placeholder="e.g. 45"
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-yellow-400"
          />
        </div>

        <div>
          <label className="text-sm text-white/70">Total Classes</label>
          <input
            type="number"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            placeholder="e.g. 60"
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-yellow-400"
          />
        </div>

        <div>
          <label className="text-sm text-white/70">Required %</label>
          <input
            type="number"
            value={required}
            onChange={(e) => setRequired(e.target.value)}
            placeholder="e.g. 75"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-white/60 text-sm">Current Attendance</p>
              <p className="text-3xl font-extrabold text-yellow-400">
                {result.current.toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="text-white/60 text-sm">
                Classes Needed to Reach {result.req}%
              </p>
              <p className="text-3xl font-extrabold text-green-400">
                {result.x}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
