import prettyCozy from "@pretty-cozy/eslint-config"
import { defineConfig } from "eslint/config"

export default defineConfig(
  prettyCozy.baseTs,
  prettyCozy.react,

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
              importNames: ["styled"],
              message: "Import from utils/styled instead.",
            },
          ],
        },
      ],
    },
  },

  prettyCozy.prettier
)
