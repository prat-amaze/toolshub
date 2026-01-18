import Calculator from "../components/Calculator";
import SipCalculator from "../components/SipCalculator";
import EmiCalculator from "../components/EmiCalculator";

import GstCalculator from "../components/GstCalculator";
import PercentageCalculator from "../components/PercentageCalculator";
import CgpaToPercentage from "../components/CgpaToPercentage";
import AttendanceCalculator from "../components/AttendanceCalculator";
import IdealWeightCalculator from "../components/IdealWeightCalculator";

import FdCalculator from "../components/FdCalculator";
import RdCalculator from "../components/RdCalculator";
import PpfCalculator from "../components/PpfCalculator";
import SimpleInterestCalculator from "../components/SimpleInterestCalculator";
import CompoundInterestCalculator from "../components/CompoundInterestCalculator";
import IncomeTaxCalculator from "../components/IncomeTaxCalculator";

import BmrCalculator from "../components/BmrCalculator";
import TdeeCalculator from "../components/TdeeCalculator";
import BodyFatPercentageCalculator from "../components/BodyFatPercentageCalculator";
import WaterIntakeCalculator from "../components/WaterIntakeCalculator";
import BmiCalculator from "../components/BmiCalculator";
import LeanBodyMassCalculator from "../components/LeanBodyMassCalculator";

// ✅ slug -> component map
const calculatorMap = {
  "calculator": <Calculator />,
  "sip-calculator": <SipCalculator />,
  "emi-calculator": <EmiCalculator />,

  "gst-calculator": <GstCalculator />,
  "percentage-calculator": <PercentageCalculator />,
  "cgpa-to-percentage": <CgpaToPercentage />,
  "attendance-calculator": <AttendanceCalculator />,
  "ideal-weight-calculator": <IdealWeightCalculator />,

  "fd-calculator": <FdCalculator />,
  "rd-calculator": <RdCalculator />,
  "ppf-calculator": <PpfCalculator />,
  "simple-interest-calculator": <SimpleInterestCalculator />,
  "compound-interest-calculator": <CompoundInterestCalculator />,
  "income-tax-calculator": <IncomeTaxCalculator />,

  "bmr-calculator": <BmrCalculator />,
  "tdee-calculator": <TdeeCalculator />,
  "body-fat-percentage-calculator": <BodyFatPercentageCalculator />,
  "water-intake-calculator": <WaterIntakeCalculator />,
  "bmi-calculator": <BmiCalculator />,
  "lean-body-mass-calculator": <LeanBodyMassCalculator />,
};

export default async function CalculatorSlugPage({ params }) {
  const { slug } = await params;

  const component = calculatorMap[slug];

  return (
    <main className="min-h-screen bg-black text-white px-4 py-14">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold capitalize">
          {slug.split("-").join(" ")}
        </h1>

        <p className="mt-2 text-white/70">
          Calculator page for: <span className="text-yellow-400">{slug}</span>
        </p>

        <div className="mt-10">
          {component ? (
            component
          ) : (
            <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
              <p className="text-red-500 font-semibold">
                No calculator found for slug:{" "}
                <span className="text-yellow-400">{slug}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
