import { calculators } from "./calculators/page";

export default function sitemap() {
  const baseUrl = "https://toolshub-six.vercel.app"; 

  const calculatorUrls = calculators.map((slug) => ({
    url: `${baseUrl}/calculators/${slug.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/calculators`,
      lastModified: new Date(),
    },
    ...calculatorUrls,
  ];
}
