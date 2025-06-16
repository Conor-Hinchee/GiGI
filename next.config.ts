import type { NextConfig } from "next";
import lingoCompiler from "lingo.dev/compiler";

const nextConfig: NextConfig = {
  /* your existing config options */
};

export default lingoCompiler.next({
  sourceLocale: "en",
  targetLocales: ["es", "fr", "de", "it"],
  models: "lingo.dev",
})(nextConfig);