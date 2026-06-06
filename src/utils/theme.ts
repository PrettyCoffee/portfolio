import { createTheme } from "lib/goober"

const breakpoint = {
  1040: "screen and (max-width: 65rem)",
  880: "screen and (max-width: 55rem)",
  720: "screen and (max-width: 45rem)",
  560: "screen and (max-width: 35rem)",
  400: "screen and (max-width: 25rem)",
}
const font = {
  md: "1rem",
  lg: "1.125rem",
  xl: "1.375rem",
  "2xl": "1.5rem",
  "3xl": "2rem",
  regular: "400",
  bold: "700",
  bolder: "900",
}
const space = {
  px: "0.0625rem",
  "2px": "0.125rem",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  18: "4.5rem",
  x1: "5rem",
  x2: "10rem",
  x3: "15rem",
  x4: "20rem",
  x5: "25rem",
  x6: "30rem",
  x7: "35rem",
  x8: "40rem",
  x9: "45rem",
  x10: "50rem",
  x11: "55rem",
}

const color = {
  light: {
    base: "#D7D3CB",
    gentle: "#A29E97",
  },
  dark: {
    base: "#282C34",
    gentle: "#5D6168",
  },
  accent: {
    red: "#E06C75",
    green: "#98C379",
    yellow: "#E5C07B",
    blue: "#61AFEF",
    purple: "#C678DD",
    cyan: "#56B6C2",
    orange: "#FFBB7C",
  },
}

const boxShadow = (hsl: string) => ({
  low: `
    0px 0.5px 0.5px hsl(${hsl} / 0.91),
    0px 1px 1px -1.5px hsl(${hsl} / 0.68),
    0px 5px 4px -3px hsl(${hsl} / 0.45),
    0px 13px 12px -5px hsl(${hsl} / 0.23)
  `,
  high: `
    0px 0.3px 0.3px -0.2px hsl(${hsl} / 0.96),
    0px 0.5px 0.5px -0.5px hsl(${hsl} / 0.85),
    0px 1.5px 1.5px -1.5px hsl(${hsl} / 0.69),
    0px 4px 4px -2.5px hsl(${hsl} / 0.60),
    0px 10px 9px -3px hsl(${hsl} / 0.50),
    0px 20px 15px -4px hsl(${hsl} / 0.30),
    0px 40px 30px -5px hsl(${hsl} / 0.20),
    0px 50px 40px -6px hsl(${hsl} / 0.15)
  `,
})

const dropShadow = (hsl: string) => ({
  low: `
    drop-shadow(0px 0.5px 0.5px hsl(${hsl} / 0.91))
    drop-shadow(0px 1px 1px hsl(${hsl} / 0.68))
    drop-shadow(0px 5px 4px hsl(${hsl} / 0.45))
    drop-shadow(0px 13px 12px hsl(${hsl} / 0.23))
  `,
  high: `
    drop-shadow(0px 0.3px 0.3px hsl(${hsl} / 0.96))
    drop-shadow(0px 0.5px 0.5px hsl(${hsl} / 0.83))
    drop-shadow(0px 1.5px 1.5px hsl(${hsl} / 0.69))
    drop-shadow(0px 4px 4px hsl(${hsl} / 0.55))
    drop-shadow(0px 10px 9px hsl(${hsl} / 0.41))
    drop-shadow(0px 20px 15px hsl(${hsl} / 0.28))
  `,
})

const tokens = {
  dark: {
    accent: color.accent,
    text: {
      base: color.light.base,
      gentle: color.light.gentle,
      invert: color.dark.base,
    },
    background: {
      base: color.dark.base,
      invert: color.light.base,
    },
    stroke: {
      base: color.light.base,
      invert: color.dark.base,
      gentle: color.light.gentle,
    },
    shadow: {
      box: boxShadow("220deg 21% 6%"),
      drop: dropShadow("220deg 21% 6%"),
    },
  },
  light: {
    accent: color.accent,
    text: {
      base: color.dark.base,
      gentle: color.dark.gentle,
      invert: color.light.base,
    },
    background: {
      base: color.light.base,
      invert: color.dark.base,
    },
    stroke: {
      base: color.dark.base,
      invert: color.light.base,
      gentle: color.dark.gentle,
    },
    shadow: {
      box: boxShadow("220deg 21% 6%"),
      drop: dropShadow("220deg 21% 6%"),
    },
  },
}

const shared = { breakpoint, font, space }

export const theme = createTheme(shared, tokens)
