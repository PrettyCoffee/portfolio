import type { JSX } from "react"

interface SetupConfig {
  jsx?: (...args: any[]) => JSX.Element
  prefixer?: (key: string, value: string) => string
  filterProps: <T>(props: T) => Partial<T>
}
const setupStore: SetupConfig = {
  filterProps: props => props,
}

export const setup = ({ jsx, prefixer, filterProps }: Partial<SetupConfig>) => {
  if (jsx) setupStore.jsx = jsx
  if (prefixer) setupStore.prefixer = prefixer
  if (filterProps) setupStore.filterProps = filterProps
}

export const getSetup = () => setupStore
