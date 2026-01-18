import Link from "next/link";

export const metadata= {
  title: "ToolsHub | All Tools in One Place",
  description:
    "ToolsHub provides calculators like SIP, BMI, Age Calculator, ATS score checker, PDF tools and more.",
};

const Page = () => {
  const tools = [
    { name: "Calculators", href: "/calculators" },
    { name: "ATS Score", href: "/ats-score" },
    { name: "PDF Tools", href: "/pdf-tools" },
    { name: "Movie Reviews", href: "https://prat-amaze.github.io/movieSearch-App/" },
    { name: "Food Recipes", href: "https://food-recipe-app-inky-six.vercel.app/" },
  ];


  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <section className="w-full max-w-5xl text-center">
        {/* Logo-like heading */}
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Tools
          </h1>
          <span className="text-5xl font-extrabold tracking-tight bg-yellow-500 text-black px-3 py-1 rounded-lg">
            Hub
          </span>
        </div>

        <p className="mt-4 text-white/70 text-base md:text-lg">
          A collection of useful tools — calculators, PDF utilities, and more.
        </p>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="
                w-64 h-28
                flex items-center justify-center
                rounded-2xl
                border border-white/10
                bg-white/5
                shadow-sm
                text-lg font-semibold
                hover:bg-yellow-500 hover:text-black
                hover:border-yellow-500
                hover:-translate-y-1
                transition duration-200
                cursor-pointer
              "
            >
              {tool.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Page;
