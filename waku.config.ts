import babel from "@rolldown/plugin-babel"
import react, { reactCompilerPreset } from "@vitejs/plugin-react"
import { defineConfig } from "waku/config"

export default defineConfig({
  vite: {
    resolve: {
      tsconfigPaths: true,
    },
    // oxlint-disable-next-line typescript/no-explicit-any -- react plugin causes excessive stack depth since typescript v7
    plugins: [react() as any, babel({ presets: [reactCompilerPreset()] })],
  },
})
