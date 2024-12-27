import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useForceUpdate } from './util/forceUpdate'
import { css } from '@emotion/react'

const currentUnixTimestampCss = {
  h3: css`
    font-weight: 300;
  `,
  p: css`
    font-weight: bold;
  `,
  copied: css`
    font-size: var(--font-size-caption);
    &.visible {
      visibility: visible;
    }
    visibility: hidden;
  `,
}
export function CurrentUnixTimestamp() {
  const currentUnixTimestamp = dayjs().unix()

  const { forceUpdate } = useForceUpdate()

  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate()
    }, 500)
    return () => clearInterval(interval)
  }, [forceUpdate])

  const initialCopiedText = '.'
  const [copiedText, setCopiedText] = useState<string>(initialCopiedText)
  const isVisibleCopiedText = copiedText !== initialCopiedText

  const handleClickButton = () => {
    navigator.clipboard.writeText(currentUnixTimestamp.toString())
    setCopiedText(`${currentUnixTimestamp} copied!`)
  }

  return (
    <>
      <h3 css={currentUnixTimestampCss.h3}>The Current Unix Timestamp</h3>
      <p css={currentUnixTimestampCss.p}>{currentUnixTimestamp}</p>
      <button onClick={handleClickButton}>Copy</button>
      <div
        {...(isVisibleCopiedText ? { className: 'visible' } : null)}
        css={currentUnixTimestampCss.copied}
      >
        {copiedText}
      </div>
    </>
  )
}
