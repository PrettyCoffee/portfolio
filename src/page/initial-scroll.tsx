"use client"

import { useEffect } from "react"

import { getUrlHash } from "utils/get-url-hash"

export const InitialScroll = () => {
  useEffect(() => {
    const id = getUrlHash()
    const section = !id ? null : document.getElementById(id)
    section?.scrollIntoView({ behavior: "instant" })
  }, [])
  return null
}
