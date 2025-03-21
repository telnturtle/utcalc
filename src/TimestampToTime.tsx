import dayjs from 'dayjs'
import { useState } from 'react'
import { Wrapper } from './Wrapper'
import clsx from 'clsx'

export function TimestampToTime() {
  const [value, setValue] = useState(loadInputValue())
  setTimeout(() => {
    storeInputValue(value)
  }, 0)
  let outputs = [
    // YYYY-MM-DD HH:mm:ss
    dayjs.unix(Number(value)).format('YYYY-MM-DD HH:mm:ss'),
    // Day
    dayjs.unix(Number(value)).format('dddd'),
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
    ).format(dayjs.unix(Number(value)).toDate()),
    // timezone: local
    dayjs.unix(Number(value)).format('YYYY-MM-DDTHH:mm:ssZ'),
    // timezone: UTC
    dayjs.unix(Number(value)).utc().format('YYYY-MM-DDTHH:mm:ssZ'),
  ]
  if (value === '') {
    outputs = outputs.map(() => '')
  }

  return (
    <Wrapper>
      <h3>Timestamp to Time</h3>
      <input
        value={value}
        onChange={(e) => {
          if (dayjs.unix(Number(e.currentTarget.value)).isValid()) {
            setValue(e.currentTarget.value)
          }
        }}
      />
      {outputs.map((output, index) => (
        <p
          key={index}
          className={clsx({
            italic: true,
            'locale-font': index === 2,
            'langauge-wrap': index === 2,
          })}
          {...(index === 2 ? { lang: navigator.language } : {})}
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
