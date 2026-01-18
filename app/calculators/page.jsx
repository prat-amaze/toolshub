import Link from "next/link";

export const metadata = {
  title: "Calculators | ToolsHub",
  description: "All calculators like SIP, EMI, GST, Percentage, CGPA and more.",
};

const calculators = [
  { name: "EMI Calculator", slug: "emi-calculator" },
  { name: "SIP Calculator", slug: "sip-calculator" },
  { name: "GST Calculator", slug: "gst-calculator" },
  { name: "Income Tax Calculator (India)", slug: "income-tax-calculator" },
  
  { name: "BMI Calculator", slug: "bmi-calculator" },
  { name: "BMR Calculator", slug: "bmr-calculator" },
  { name: "TDEE Calculator", slug: "tdee-calculator" },
  { name: "Water Intake Calculator", slug: "water-intake-calculator" },
  { name: "Body Fat Percentage Calculator", slug: "body-fat-percentage-calculator" },
  { name: "Ideal Weight Calculator", slug: "ideal-weight-calculator" },
  { name: "Lean Body Mass Calculator", slug: "lean-body-mass-calculator" },

  { name: "FD Calculator", slug: "fd-calculator" },
  { name: "RD Calculator", slug: "rd-calculator" },
  { name: "PPF Calculator", slug: "ppf-calculator" },
  { name: "Compound Interest Calculator", slug: "compound-interest-calculator" },
  { name: "Simple Interest Calculator", slug: "simple-interest-calculator" },

  { name: "Percentage Calculator", slug: "percentage-calculator" },
  { name: "CGPA to Percentage", slug: "cgpa-to-percentage" },
  { name: "Attendance Calculator", slug: "attendance-calculator" },

  { name: "Calculator", slug: "calculator" },
];

export default function CalculatorsPage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 py-14">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold">Calculators</h1>
        <p className="mt-2 text-white/70">
          Choose a calculator and get results instantly.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc) => (
            <Link
              key={calc.slug}
              href={`/calculators/${calc.slug}`}
              className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-yellow-500 hover:text-black transition"
            >
              <h2 className="text-lg font-semibold">{calc.name}</h2>
              <p className="mt-1 text-sm opacity-70">Open calculator →</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
