import { useEffect, useReducer } from 'react'

export function useForceUpdate() {
  const [, forceUpdate] = useReducer((x) => x + 1, 0)
  return { forceUpdate }
}

export function usePeriodicForceUpdate(ms: number) {
  const { forceUpdate } = useForceUpdate()

  // Auto update every given ms
  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate()
    }, ms)
    return () => clearInterval(interval)
  }, [forceUpdate, ms])

  return { forceUpdate }
}
