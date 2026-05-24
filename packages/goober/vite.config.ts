import path from "node:path"

import { defineConfig, type Plugin } from "vite"

const isModuleName = (id: string) =>
  !id.startsWith(".") && !id.startsWith("\0") && !path.isAbsolute(id)

interface LibBundleOptions {
  entries: Record<string, { path: string; outFile: string }>
  disabled?: boolean
}

const libBundle = ({ disabled, entries }: LibBundleOptions): Plugin => {
  if (disabled) return { name: "lib-bundle" }

  return {
    name: "lib-bundle",
    enforce: "pre",
    outputOptions: options => {
      options.minify = true
    },
    config: config => {
      config.build ??= {}
      config.build.sourcemap = false
      config.build.minify = true
      config.build.copyPublicDir = false

      config.build.rolldownOptions = {
        ...config.build.rolldownOptions,
        external: id => isModuleName(id),
      }

      config.build.lib = {
        ...config.build.lib,
        formats: ["es"],
        entry: Object.fromEntries(
          Object.entries(entries).map(([key, { path }]) => [key, path])
        ),
        fileName: (format, entry) => {
          const filePath = entries[entry]?.outFile
          if (!filePath) throw new Error(`Unknown entry point: ${entry}`)

          if (["es", "esm", "module"].includes(format)) {
            return `${filePath}.mjs`
          }

          throw new Error(`Unsupported format "${format}"`)
        },
      }
    },
  }
}

export default defineConfig(({ command }) => ({
  plugins: [
    libBundle({
      disabled: command !== "build",
      entries: {
        "src/core/index": {
          outFile: "core",
          path: path.resolve(__dirname, "./src/core/index.ts"),
        },
        "src/theme/index": {
          outFile: "theme",
          path: path.resolve(__dirname, "./src/theme/index.ts"),
        },
      },
    }),
  ],
}))
