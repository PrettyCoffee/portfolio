/* eslint-disable no-restricted-imports -- importing from goober is allowed in this file */
import { createElement } from "react"

import { setup } from "goober"

setup({ jsx: createElement })

export * from "goober"
export * from "goober/theme"
