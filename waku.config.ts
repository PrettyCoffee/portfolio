import babel from "@rolldown/plugin-babel"
import react, { reactCompilerPreset } from "@vitejs/plugin-react"
import { defineConfig } from "waku/config"

export default defineConfig({
  vite: {
    resolve: {
      tsconfigPaths: true,
    },
    plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  },
})
