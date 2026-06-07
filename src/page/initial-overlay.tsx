"use client"

import { useEffect, useState } from "react"

import { theme } from "utils/theme"

// Overlay to be displayed until styles are loaded, to prevent content flickering
export const InitialOverlay = () => {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    window.queueMicrotask(() => {
      setVisible(false)
    })
  }, [])
  return visible ? (
    <div
      style={{
        position: "fixed",
        zIndex: 999,
        inset: 0,
        background: theme("background.base"),
      }}
    />
  ) : null
}
