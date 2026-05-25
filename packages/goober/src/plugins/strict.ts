import { Plugin } from "./plugin"

const isEmpty = (string = "") => !string.replaceAll(/\s+/gm, "")

/** Throw errors when detecting issues in rules or blocks (i.e. when rule values are empty) */
export const strict = (): Plugin => ({
  buildRule: ctx => {
    if (isEmpty(ctx.key)) {
      console.debug("Rule Context:", ctx)
      throw new Error("Rule key is empty")
    }
    if (isEmpty(ctx.value)) {
      console.debug("Rule Context:", ctx)
      throw new Error("Rule value is empty")
    }
  },

  buildBlock: ctx => {
    if (isEmpty(ctx.content)) {
      console.debug("Block Context:", ctx)
      throw new Error("Block content is empty")
    }
    if (isEmpty(ctx.result)) {
      console.debug("Block Context:", ctx)
      throw new Error("Block result is empty")
    }
  },
})
