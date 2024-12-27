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
}

export function ConvertTimestamp() {
  const c = convertTimestampCss
  const inputEl = useRef<HTMLInputElement>(null)
  const { forceUpdate } = useForceUpdate()
  const value = inputEl.current?.value ? dayjs.unix(Number(inputEl.current?.value)) : null
  const visibleClassName = value ? { className: 'visible' } : null
  const utc = value?.utc()?.format('YYYY-MM-DD HH:mm:ss')
  const local = value?.format('YYYY-MM-DD HH:mm:ss')
  const localLocalLocale = new Intl.DateTimeFormat('ko-KR', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: 'Asia/Seoul',
  }).format(value?.toDate())
  return (
    <>
      <h4 css={c.h4}>Timestamp → Date</h4>
      <input type="number" css={c.inputNumber} onChange={forceUpdate} ref={inputEl} />
      <p css={c.hidden} {...visibleClassName}>
        {utc}
      </p>
      <p css={c.hidden} {...visibleClassName}>
        {local}
      </p>
      <p css={c.hidden} {...visibleClassName}>
        {localLocalLocale}
      </p>
    </>
  )
}
