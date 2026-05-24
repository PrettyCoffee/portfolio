import type { JSX } from "react"

interface SetupConfig {
  /** JSX function to create a virtual dom node. (i.e. React.createElement or Preact.h) */
  jsx: (type: unknown, props?: object | null, ...args: any[]) => JSX.Element
  /** Transform css output, e.g. to add `-webkit-` and `-moz-` prefixes */
  prefixer?: (key: string, value: string) => string
  /** Globally filter props in styled components, which should not be passed to dom elements */
  filterProps: <T>(props: T) => Partial<T>
}
const setupStore: SetupConfig = {
  filterProps: props => props,
  jsx: () => {
    throw new Error(
      "Goober expected setup to provide a jsx function, but none was there. Did you call `setup({ jsx: ... })`?"
    )
  },
}

/** Configure the behavior of goober */
export const setup = ({ jsx, prefixer, filterProps }: Partial<SetupConfig>) => {
  if (jsx) setupStore.jsx = jsx
  if (prefixer) setupStore.prefixer = prefixer
  if (filterProps) setupStore.filterProps = filterProps
}

export const getSetup = () => setupStore
