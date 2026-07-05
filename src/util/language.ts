import { useSyncExternalStore } from 'react'

export type Language = 'ko' | 'en'

const listeners = new Set<() => void>()
let language: Language = navigator.language.startsWith('ko') ? 'ko' : 'en'

export function getLanguage() {
  return language
}

export function setLanguage(lang: Language) {
  language = lang
  document.documentElement.lang = lang
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useLanguage() {
  return useSyncExternalStore(subscribe, getLanguage)
}

type Strings = {
  appTitle: string
  currentUnixTimestampHeading: string
  currentTimeHeading: string
  currentUtcHeading: string
  timezoneHeading: string
  copyButton: string
  copiedLabel: string
  startOfHeading: string
  unitColumn: string
  startOfColumn: string
  endOfColumn: string
  today: string
  timestampToTimeHeading: string
  baseTimeLabel: string
  hourUnitLabel: string
  resetButton: string
  offsetActive: (hours: number) => string
  offsetBadge: (hours: number) => string
  startOfMonthButton: string
  endOfMonthButton: string
}

const STRINGS: Record<Language, Strings> = {
  en: {
    appTitle: 'Unix Timestamp Calculator',
    currentUnixTimestampHeading: 'The Current Unix Timestamp',
    currentTimeHeading: 'The Current Time',
    currentUtcHeading: 'The Current UTC',
    timezoneHeading: 'The Timezone',
    copyButton: 'Copy',
    copiedLabel: 'Copied!',
    startOfHeading: 'Start of / End of ...',
    unitColumn: 'Unit',
    startOfColumn: 'Start of...',
    endOfColumn: 'End of...',
    today: 'Today',
    timestampToTimeHeading: 'Timestamp to Time',
    baseTimeLabel: 'Base time',
    hourUnitLabel: 'hours',
    resetButton: 'Reset',
    offsetActive: (hours) => `${hours > 0 ? '+' : ''}${hours}h applied`,
    offsetBadge: (hours) => `${hours > 0 ? '+' : ''}${hours}h applied values`,
    startOfMonthButton: 'Start of month',
    endOfMonthButton: 'End of month',
  },
  ko: {
    appTitle: '유닉스 타임스탬프 계산기',
    currentUnixTimestampHeading: '현재 유닉스 타임스탬프',
    currentTimeHeading: '현재 시각',
    currentUtcHeading: '현재 UTC',
    timezoneHeading: '타임존',
    copyButton: '복사',
    copiedLabel: '복사됨!',
    startOfHeading: '시작 / 끝 ...',
    unitColumn: '단위',
    startOfColumn: '시작',
    endOfColumn: '끝',
    today: '오늘',
    timestampToTimeHeading: '타임스탬프를 시각으로',
    baseTimeLabel: '기준 시각',
    hourUnitLabel: '시간',
    resetButton: '초기화',
    offsetActive: (hours) => `${hours > 0 ? '+' : ''}${hours}h 적용 중`,
    offsetBadge: (hours) => `${hours > 0 ? '+' : ''}${hours}시간 적용된 값`,
    startOfMonthButton: '월초',
    endOfMonthButton: '월말',
  },
}

export function useT() {
  const lang = useLanguage()
  return STRINGS[lang]
}
