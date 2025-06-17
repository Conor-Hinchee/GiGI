import type { NextConfig } from "next";
import lingoCompiler from "lingo.dev/compiler";

const nextConfig: NextConfig = {
  /* config options here */
};

export default lingoCompiler.next({
  sourceLocale: "en",
  targetLocales: ["es", "fr", "de", "it"],
  models: {
    "*:*": "groq:mistral-saba-24b",
  },
  useDirective: true,
})(nextConfig);