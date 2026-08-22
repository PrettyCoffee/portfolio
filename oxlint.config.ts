import cozy from "@pretty-cozy/oxlint-config"
import { defineConfig } from "oxlint"

export default defineConfig({
  extends: [cozy.base, cozy.react],
  ignorePatterns: [".dump/**", "**/dist/**", "pnpm-lock.yaml"],
  categories: {
    correctness: "error",
    suspicious: "error",
    perf: "error",
  },
  options: {
    typeAware: true,
    typeCheck: true,
    reportUnusedDisableDirectives: "error",
    denyWarnings: true,
  },

  rules: {
    "eslint/no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "goober",
            message: "Import from lib/goober instead.",
          },
        ],
      },
    ],
  },

  overrides: [
    {
      // Libraries often need to use "any" for flexibility in generic types
      files: ["./packages/goober/**"],
      rules: { "typescript/no-explicit-any": "off" },
    },
  ],
})
