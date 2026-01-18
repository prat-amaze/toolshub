"use client";

import { useMemo, useState } from "react";

export default function Calculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [operation, setOperation] = useState("add");

  const result = useMemo(() => {
    const A = Number(a);
    const B = Number(b);

    // Handle empty input
    if (a === "" && operation !== "exp" && operation !== "log10") return "";
    if (b === "" && ["add", "sub", "mul", "div", "pow"].includes(operation))
      return "";

    switch (operation) {
      case "add":
        return A + B;

      case "sub":
        return A - B;

      case "mul":
        return A * B;

      case "div":
        if (B === 0) return "Cannot divide by 0";
        return A / B;

      case "pow":
        return Math.pow(A, B);

      case "exp":
        return Math.exp(A); // e^A

      case "log10":
        if (A <= 0) return "log10 undefined for <= 0";
        return Math.log10(A);

      default:
        return "";
    }
  }, [a, b, operation]);

  const needsB = ["add", "sub", "mul", "div", "pow"].includes(operation);

  return (
    <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-2xl font-bold">Normal Calculator</h2>
      <p className="mt-1 text-white/70 text-sm">
        Add, subtract, multiply, divide, power, exp and log10.
      </p>

      {/* Operation selector */}
      <div className="mt-6">
        <label className="text-sm text-white/70">Operation</label>
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-orange-500"
        >
          <option value="add">Addition (A + B)</option>
          <option value="sub">Subtraction (A - B)</option>
          <option value="mul">Multiplication (A × B)</option>
          <option value="div">Division (A ÷ B)</option>
          <option value="pow">Power (A ^ B)</option>
          <option value="exp">Exponent (e ^ A)</option>
          <option value="log10">Log base 10 (log10(A))</option>
        </select>
      </div>

      {/* Inputs */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className={`${needsB ? "" : "sm:col-span-2"}`}>
          <label className="text-sm text-white/70">Number A</label>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            placeholder="Enter A"
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-yellow-500"
          />
        </div>

        {needsB && (
          <div>
            <label className="text-sm text-white/70">Number B</label>
            <input
              type="number"
              value={b}
              onChange={(e) => setB(e.target.value)}
              placeholder="Enter B"
              className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-yellow-500"
            />
          </div>
        )}
      </div>

      {/* Result */}
      <div className="mt-6 rounded-xl bg-black/40 border border-white/10 px-4 py-3">
        <p className="text-white/70 text-sm">Result</p>
        <p className="text-2xl font-extrabold text-yellow-400 break-words">
          {result === "" ? "—" : String(result)}
        </p>
      </div>

      {/* Reset */}
      <button
        onClick={() => {
          setA("");
          setB("");
          setOperation("add");
        }}
        className="mt-6 w-full rounded-xl bg-yellow-500 text-black font-semibold py-3 hover:bg-yellow-400 transition"
      >
        Reset
      </button>
    </div>
  );
}
