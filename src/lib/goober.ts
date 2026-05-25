/* eslint-disable no-restricted-imports -- importing from goober is allowed in this file */
import { createElement } from "react"

import { setup } from "goober"
import { minify, pretty, strict } from "goober/plugins"

const plugins = import.meta.env.DEV ? [pretty(), strict()] : [minify()]
setup({ jsx: createElement, plugins })

export * from "goober"
export * from "goober/theme"
