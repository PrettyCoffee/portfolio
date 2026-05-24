type Indexable = Record<string, unknown>
type ObjDeepPath<TObj> = TObj extends Indexable
  ? {
      [K in keyof TObj]: TObj[K] extends Indexable
        ? `${Exclude<K, symbol>}.${ObjDeepPath<TObj[K]>}`
        : K
    }[keyof TObj]
  : never

interface TokenItem {
  [key: string]: TokenItem | string
}

export type TokenVariants<TVariants extends string = string> = Record<
  TVariants,
  TokenItem
>

const getCssVar = (key: string) => "--" + key.split(".").join("-")

const getDeepKeys = (currentValue: unknown, currentKey = ""): string[] => {
  if (typeof currentValue === "string") {
    return [currentKey]
  }
  if (currentValue && typeof currentValue === "object") {
    return Object.entries(currentValue).flatMap(([key, value]) => {
      const newKey = !currentKey ? key : `${currentKey}.${key}`
      return getDeepKeys(value, newKey)
    }, {})
  }
  throw new Error(`Value of ${currentKey} could not be processed.`)
}

/** Create a css theme with variants, utilizing css variables */
export const createTheme = <
  TSharedTokens extends TokenItem,
  TVariantTokens extends TokenVariants,
>(
  shared: TSharedTokens,
  variants: TVariantTokens
) => {
  type Variant = keyof TVariantTokens
  type Tokens = TSharedTokens & TVariantTokens[Variant]

  const defaultVariant = Object.keys(variants)[0]!
  const tokens = Object.fromEntries(
    Object.entries(variants).map(([key, value]) => [
      key,
      { ...shared, ...value },
    ])
  ) as Record<Variant, Tokens>

  const getValue = (key: ObjDeepPath<Tokens>, variant: Variant) => {
    let value: unknown = tokens[variant]
    for (const segment of key.split(".")) {
      // @ts-expect-error -- hard to use correct types here
      value = value[segment]
    }
    if (typeof value !== "string") {
      throw new Error(`Theme key could not be read: ${key}`)
    }
    return value.trim()
  }

  const read = (key: ObjDeepPath<Tokens>) => {
    const value = getValue(key, defaultVariant)
    if (Object.keys(shared).includes(key.split(".")[0]!)) {
      return value
    }
    const cssVar = getCssVar(key)
    return `var(${cssVar}, ${value})`
  }

  /** Get an object with all css vars */
  const getCssVars = (variant: Variant) =>
    Object.fromEntries(
      getDeepKeys(variants[variant]).map(key => [
        getCssVar(key),
        getValue(key as ObjDeepPath<Tokens>, variant),
      ])
    )

  /** Get a string to define all css vars for the given variant */
  const getCssVarsString = (variant: Variant) =>
    Object.entries(getCssVars(variant))
      .map(([key, value]) => `${key}: ${value};`)
      .join("\n")

  return Object.assign(read, { getCssVars, getCssVarsString, tokens })
}
