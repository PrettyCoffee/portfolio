import type { JSX } from "react"

import { minify } from "../plugins/minify"
import { Plugin } from "../plugins/plugin"

interface SetupConfig {
  /** JSX function to create a virtual dom node. (i.e. React.createElement or Preact.h) */
  jsx: (type: unknown, props?: object | null, ...args: any[]) => JSX.Element
  /** Globally filter props in styled components, which should not be passed to dom elements */
  filterProps: <T>(props: T) => Partial<T>
  /** List of goober plugins */
  plugins: Plugin[]
}
const setupStore: SetupConfig = {
  filterProps: props => props,
  plugins: [minify()],
  jsx: () => {
    throw new Error(
      "Goober expected setup to provide a jsx function, but none was there. Did you call `setup({ jsx: ... })`?"
    )
  },
}

/** Configure the behavior of goober */
export const setup = ({ jsx, filterProps, plugins }: Partial<SetupConfig>) => {
  if (jsx) setupStore.jsx = jsx
  if (filterProps) setupStore.filterProps = filterProps
  if (plugins) setupStore.plugins = plugins
}

export const getSetup = () => setupStore
