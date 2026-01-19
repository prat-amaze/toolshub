export default function robots() {
  const baseUrl = "https://toolshub-six.vercel.app"; // change later

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}