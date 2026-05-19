// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

interface IntervalProps {
  tick: (props: { stop: () => void }) => void
  ms: number
}
export const createInterval = ({ ms, tick }: IntervalProps) => {
  let resolveFn = noop
  let id = 0
  const stop = () => {
    window.clearInterval(id)
    resolveFn()
  }

  const promise = new Promise<void>(resolve => {
    resolveFn = resolve
    id = window.setInterval(() => {
      tick({ stop })
    }, ms)
  })

  return Object.assign(promise, { clear: stop })
}
