interface SetupConfig {
  prefixer?: (key: string, value: string) => string
}
const setupStore: SetupConfig = {}

export const setup = ({ prefixer }: SetupConfig) => {
  setupStore.prefixer = prefixer
}

export const getSetup = () => setupStore
