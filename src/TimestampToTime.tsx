import clsx from 'clsx'
import { css } from '@emotion/react'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { usePeriodicForceUpdate } from './util/forceUpdate'
import { useT } from './util/language'
import { useOffsetHours } from './util/timeOffset'
import { Wrapper } from './Wrapper'

export function TimestampToTime() {
  usePeriodicForceUpdate(500)
  const t = useT()
  const offsetHours = useOffsetHours()
  const [value, setValue] = useState(loadInputValue())
  useEffect(() => {
    const timer = setTimeout(() => {
      storeInputValue(value)
    }, 0)
    return () => clearTimeout(timer)
  }, [value])
  const numericValue = Number(value)
  const isValidTimestamp = value !== '' && dayjs.unix(numericValue).isValid()
  const time = dayjs.unix(numericValue).add(offsetHours, 'hour')
  let outputs = [
    // YYYY-MM-DD HH:mm:ss
    time.format('YYYY-MM-DD HH:mm:ss'),
    // Day
    time.format('dddd'),
    // verbose time format in local language, use Intl
    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
    new Intl.DateTimeFormat(
      // my locale by browser
      navigator.language,
      {
        dateStyle: 'full',
        timeStyle: 'long',
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }
    ).format(time.toDate()),
    // relative time
    formatRelativeTime(time.toDate()),
    // timezone: local
    time.format('YYYY-MM-DDTHH:mm:ssZ'),
    // timezone: UTC
    time.utc().format('YYYY-MM-DDTHH:mm:ssZ'),
  ]
  if (!isValidTimestamp) {
    outputs = outputs.map(() => '')
  }

  return (
    <Wrapper>
      <h2>{t.timestampToTimeHeading}</h2>
      <input
        css={css`
          width: 100%;
          max-width: 36rem;
          box-sizing: border-box;
        `}
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.value)
        }}
      />
      {outputs.map((output, index) => (
        <p
          key={index}
          className={clsx({
            italic: true,
            'locale-font': [2, 3].includes(index),
            'langauge-wrap': [2, 3].includes(index),
          })}
          {...([2, 3].includes(index) ? { lang: navigator.language } : {})}
        >
          {output}
        </p>
      ))}
    </Wrapper>
  )
}

function storeSessionStorage(key: string, value: string) {
  sessionStorage.setItem(key, value)
}
function loadSessionStorage(key: string) {
  return sessionStorage.getItem(key)
}
function storeInputValue(value: string) {
  storeSessionStorage(`utcalc:${import.meta.env.PACKAGE_VERSION}`, value)
}
function loadInputValue(): string {
  return loadSessionStorage(`utcalc:${import.meta.env.PACKAGE_VERSION}`) ?? ''
}

function formatRelativeTime(from: Date) {
  const locale = navigator.language
  const to = new Date()

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto', style: 'long' })

  // Date 객체일 경우 -> 타임스탬프로 변환
  const fromTime = from instanceof Date ? from.getTime() : from
  const toTime = to instanceof Date ? to.getTime() : to

  const diff = fromTime - toTime // 밀리초(ms) 차이 (음수면 과거)
  const diffInSeconds = diff / 1000

  // Math.abs() 값이 어느 단위에 해당하는지 계산
  const seconds = Math.round(diffInSeconds)
  const minutes = Math.round(diffInSeconds / 60)
  const hours = Math.round(diffInSeconds / 3600)
  const days = Math.round(diffInSeconds / 86400)
  const weeks = Math.round(diffInSeconds / 604800)
  const months = Math.round(diffInSeconds / 2629800) // 대략 30.44일
  const years = Math.round(diffInSeconds / 31557600) // 대략 365.24일

  // 가장 알맞은 단위를 찾아서 format
  if (Math.abs(years) >= 1) {
    return rtf.format(years, 'year')
  } else if (Math.abs(months) >= 1) {
    return rtf.format(months, 'month')
  } else if (Math.abs(weeks) >= 1) {
    return rtf.format(weeks, 'week')
  } else if (Math.abs(days) >= 1) {
    return rtf.format(days, 'day')
  } else if (Math.abs(hours) >= 1) {
    return rtf.format(hours, 'hour')
  } else if (Math.abs(minutes) >= 1) {
    return rtf.format(minutes, 'minute')
  } else {
    // 1분 미만이면 초 단위 표기
    return rtf.format(seconds, 'second')
  }
}
