"use client"

import { useState } from "react"

import { styled } from "utils/styled"
import { theme } from "utils/theme"

const Layout = styled("div")`
  border: ${theme("space.2px")} dashed ${theme("stroke.base")};
  border-radius: ${theme("space.2")};
  min-width: ${theme("space.60")};
  padding: ${theme("space.4")};
  margin-top: ${theme("space.4")};
  margin-left: -${theme("space.4")};
  margin-right: -${theme("space.4")};
`

const Button = styled("button")`
  background: ${theme("text.base")};
  color: ${theme("background.base")};
  border-radius: ${theme("space.1")};
  padding: 0 ${theme("space.1")};
  &:hover:not(&:active) {
    background: color-mix(in srgb, ${theme("text.base")} 80%, transparent);
  }
`

export const Counter = () => {
  const [count, setCount] = useState(0)

  const handleIncrement = () => setCount(c => c + 1)

  return (
    <Layout>
      <div>Count: {count}</div>
      <Button onClick={handleIncrement}>Increment</Button>
    </Layout>
  )
}
