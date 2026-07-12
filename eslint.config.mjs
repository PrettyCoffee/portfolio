import prettyCozy from "@pretty-cozy/eslint-config"
import { defineConfig, globalIgnores } from "eslint/config"

export default defineConfig(
  prettyCozy.baseTs,
  prettyCozy.react,

  globalIgnores([".dump"]),

  {
    name: "local-rules/restricted-imports",
    files: ["src/**"],
    rules: {
      "no-restricted-imports": [
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
  },

  prettyCozy.prettier
)
