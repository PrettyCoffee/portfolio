"use client"

import { useState } from "react"

import { styled } from "utils/styled"
import { theme } from "utils/theme"

const Section = styled("section")`
  border: 1px dashed ${theme("accent.blue")};
  border-radius: ${theme("space.2")};
  padding: ${theme("space.4")};
  margin-top: ${theme("space.4")};
  margin-left: -${theme("space.4")};
  margin-right: -${theme("space.4")};
`

const Button = styled("button")`
  background: black;
  color: white;
  border-radius: ${theme("space.1")};
  padding: 0 ${theme("space.1")};
`

export const Counter = () => {
  const [count, setCount] = useState(0)

  const handleIncrement = () => setCount(c => c + 1)

  return (
    <Section>
      <div>Count: {count}</div>
      <Button onClick={handleIncrement}>Increment</Button>
    </Section>
  )
}
