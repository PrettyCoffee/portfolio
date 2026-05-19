const noop: () => void = () => null

export const createAnimationFrames = () => {
  let frame: number | null = null
  let lastHandler = noop

  const request = (handler: () => void) => {
    lastHandler = handler

    if (frame) return
    frame = window.requestAnimationFrame(() => {
      lastHandler()
      frame = null
    })
  }

  const cancel = () => frame && window.cancelAnimationFrame(frame)

  return { request, cancel }
}
