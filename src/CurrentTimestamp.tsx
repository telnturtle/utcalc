import { css } from '@emotion/react'
import dayjs from 'dayjs'
import { useRef } from 'react'
import { usePeriodicForceUpdate } from './util/forceUpdate'
import { Wrapper } from './Wrapper'

const currentUnixTimestampCss = {
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
export function CurrentUnixTimestamp() {
  const csss = currentUnixTimestampCss

  const currentUnixTimestamp = dayjs().unix()
  const isoString = dayjs().format('YYYY-MM-DDTHH:mm:ss')

  usePeriodicForceUpdate(500)

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
      <h3>The Current Unix Timestamp</h3>
      <p>{currentUnixTimestamp}</p>
      <button ref={copyButtonEl} onClick={handleClickButton} css={csss.copyButton}>
        Copy
      </button>
      <h3>The Current Time</h3>
      <p>{isoString}</p>
      <h3>The Current Timezone</h3>
      <p>{Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
      <p>{dayjs().format('Z')}</p>
      <h3>The Current UTC</h3>
      <p>{dayjs().utc().format('YYYY-MM-DDTHH:mm:ss')}</p>
    </Wrapper>
  )
}
