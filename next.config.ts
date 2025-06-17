import lingoCompiler from "lingo.dev/compiler";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing Next.js configuration
};

export default lingoCompiler.next({
  sourceLocale: "en",
  targetLocales: ["es", "fr", "de"],
  models: {
    "*:*": "groq:mistral-saba-24b",
  },
})(nextConfig);
