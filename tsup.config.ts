import { defineConfig } from "tsup";

export default defineConfig({
  // `index` is the client component bundle (its source starts with
  // "use client", which tsup preserves per-entry); `theme` is the
  // server-safe utilities entry with no directive.
  entry: {
    index: "src/index.ts",
    theme: "src/theme-entry.ts",
    // Pure SVG components, no hooks — server-safe, so no directive. Lucide
    // stays external like the Radix packages (a declared dependency).
    icons: "src/icons/index.tsx",
  },
  // ESM is the primary target; the CJS build is a compatibility shim so
  // `require()` from CommonJS tooling still resolves (validated by
  // `npm run test:package`).
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
});
