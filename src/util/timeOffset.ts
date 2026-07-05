import { useSyncExternalStore } from 'react'

const listeners = new Set<() => void>()
let offsetHours = 0

export function getOffsetHours() {
  return offsetHours
}

export function setOffsetHours(hours: number) {
  offsetHours = hours
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

// 앱 전역에서 "지금"을 얼마나 밀어서 볼지 나타내는 값 (시간 단위)
export function useOffsetHours() {
  return useSyncExternalStore(subscribe, getOffsetHours)
}
