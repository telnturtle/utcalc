import { css } from '@emotion/react'
import { useRef } from 'react'
import { useForceUpdate } from './util/forceUpdate'
import dayjs from 'dayjs'

const convertTimestampCss = {
  h4: css`
    font-weight: 300;
  `,
  inputNumber: css`
    font-size: var(--font-size-body);
  `,
  hidden: css`
    visibility: hidden;
    &.visible {
      visibility: visible;
    }
  `,
  caption: css`
    font-size: var(--font-size-caption);
  `,
}

const initialText = '∆'

export function ConvertTimestamp() {
  const c = convertTimestampCss
  const inputEl = useRef<HTMLInputElement>(null)
  const { forceUpdate } = useForceUpdate()
  const value = getDayjs(inputEl.current?.value)
  const visibleClassName = value ? { className: 'visible' } : null
  const utc = getUtcFormat(value)
  const local = getLocalFormat(value)
  const englishLocalLocale = getEnglishLocalLocale(value)
  const localLocalLocale = getLocalLocale(value)
  const relativeTime = getRelativeTime(value)
  return (
    <>
      <h4 css={c.h4}>Convert Timestamp to Date</h4>
      <input type="number" css={c.inputNumber} onChange={forceUpdate} ref={inputEl} />
      <p css={[c.hidden, c.caption]} {...visibleClassName}>
        {utc}
      </p>
      <p css={[c.hidden, c.caption]} {...visibleClassName}>
        {local}
      </p>
      <p css={[c.hidden, c.caption]} {...visibleClassName}>
        {englishLocalLocale}
      </p>
      <p css={[c.hidden, c.caption]} {...visibleClassName}>
        {localLocalLocale}
      </p>
      <p css={[c.hidden, c.caption]} {...visibleClassName}>
        {relativeTime}
      </p>
    </>
  )
}

function getDayjs(value?: string): dayjs.Dayjs | undefined {
  if (value === undefined) return undefined
  try {
    return dayjs.unix(Number(value))
  } catch {
    return undefined
  }
}
function getUtcFormat(value?: dayjs.Dayjs): string {
  if (value === undefined) return initialText
  return value.utc().format('YYYY-MM-DD HH:mm:ss +00:00')
}
function getLocalFormat(value?: dayjs.Dayjs): string {
  if (value === undefined) return initialText
  return value.format(
    'YYYY-MM-DD HH:mm:ss' +
      ' ' +
      (value.utcOffset() < 0 ? '-' : '+') +
      (value.utcOffset() / 60).toString().padStart(2, '0') +
      ':' +
      (value.utcOffset() % 60).toString().padStart(2, '0')
  )
}
function getEnglishLocalLocale(value?: dayjs.Dayjs): string {
  if (value === undefined) return initialText
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',
    timeStyle: 'long',
    // browser timezone
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }).format(value.toDate())
}
function getLocalLocale(value?: dayjs.Dayjs): string {
  if (value === undefined) return initialText
  // get browser settings, like 'ko-KR', 'en-US'
  const browserLocale = navigator.language
  return new Intl.DateTimeFormat(browserLocale, {
    dateStyle: 'full',
    timeStyle: 'long',
    // browser timezone
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }).format(value.toDate())
}
function getRelativeTime(value?: dayjs.Dayjs): string {
  if (value === undefined) return initialText
  return value.fromNow()
}
