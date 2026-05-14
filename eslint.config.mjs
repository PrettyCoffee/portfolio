import prettyCozy from "@pretty-cozy/eslint-config"
import { defineConfig } from "eslint/config"

export default defineConfig(
  prettyCozy.baseTs,
  prettyCozy.react,
  prettyCozy.prettier
)
