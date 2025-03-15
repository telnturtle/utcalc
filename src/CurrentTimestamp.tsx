import { css } from '@emotion/react'
import dayjs from 'dayjs'
import { useEffect, useRef } from 'react'
import { useForceUpdate } from './util/forceUpdate'
import { Wrapper } from './Wrapper'

const currentUnixTimestampCss = {
  h3: css`
    font-weight: 300;
    font-size: var(--font-size-heading);
  `,
  p: css`
    font-weight: bold;
    font-size: var(--font-size-body);
  `,
  copyButton: css`
    position: relative;
    font-size: var(--font-size-body);
    &.copied::after {
      content: 'Copied!';
      color: #646cff;
      font-size: 0.8em;
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 0.2rem;
    }
  `,
}
function CurrentUnixTimestamp() {
  const csss = currentUnixTimestampCss

  const currentUnixTimestamp = dayjs().unix()

  const { forceUpdate } = useForceUpdate()

  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate()
    }, 500)
    return () => clearInterval(interval)
  }, [forceUpdate])

  const copyButtonEl = useRef<HTMLButtonElement>(null)

  const copiedTimer: { timer: undefined | number } = {
    timer: undefined,
  }

  const handleClickButton = () => {
    navigator.clipboard.writeText(currentUnixTimestamp.toString())
    copyButtonEl.current?.classList.add('copied')
    clearTimeout(copiedTimer.timer)
    copiedTimer.timer = setTimeout(() => {
      copyButtonEl.current?.classList.remove('copied')
    }, 2000)
  }

  return (
    <Wrapper>
      <h3 css={csss.h3}>The Current Unix Timestamp</h3>
      <p css={csss.p}>{currentUnixTimestamp}</p>
      <button ref={copyButtonEl} onClick={handleClickButton} css={csss.copyButton}>
        Copy
      </button>
    </Wrapper>
  )
}

export default CurrentUnixTimestamp
