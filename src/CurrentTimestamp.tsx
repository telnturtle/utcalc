import { css } from '@emotion/react'
import dayjs from 'dayjs'
import { useRef } from 'react'
import { usePeriodicForceUpdate } from './util/forceUpdate'
import { useT } from './util/language'
import { useOffsetHours } from './util/timeOffset'
import { Wrapper } from './Wrapper'

const infoRowCss = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  max-width: 36rem;
  font-size: var(--font-size-body);
  line-height: 1.4;
`

const labelCss = css`
  font-weight: 400;
  text-align: left;
  flex-shrink: 0;
`

const valueGroupCss = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
  min-width: 0;
`

const valueCss = css`
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  text-align: right;
`

const copyButtonCss = css`
  position: relative;
  flex-shrink: 0;
  padding: 0.3rem 0.7rem;
  font-size: var(--font-size-caption);
  &.copied::after {
    content: attr(data-copied-label);
    color: #646cff;
    font-size: 0.8em;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 0.2rem;
    white-space: nowrap;
  }
`

type InfoRowProps = {
  label: string
  value: string
  trailing?: React.ReactNode
}

function InfoRow({ label, value, trailing }: InfoRowProps) {
  return (
    <div css={infoRowCss}>
      <span css={labelCss}>{label}</span>
      <div css={valueGroupCss}>
        <span css={valueCss}>{value}</span>
        {trailing}
      </div>
    </div>
  )
}

export function CurrentUnixTimestamp() {
  const t = useT()

  usePeriodicForceUpdate(500)
  const offsetHours = useOffsetHours()

  const now = dayjs().add(offsetHours, 'hour')
  const currentUnixTimestamp = now.unix()
  const isoString = now.format('YYYY-MM-DDTHH:mm:ss')
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const utcOffset = dayjs().format('Z')

  const copyButtonEl = useRef<HTMLButtonElement>(null)

  const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleClickButton = () => {
    navigator.clipboard.writeText(currentUnixTimestamp.toString())
    copyButtonEl.current?.classList.add('copied')
    if (copiedTimerRef.current) {
      clearTimeout(copiedTimerRef.current)
    }
    copiedTimerRef.current = setTimeout(() => {
      copyButtonEl.current?.classList.remove('copied')
    }, 2000)
  }

  return (
    <Wrapper>
      <InfoRow
        label={t.currentUnixTimestampHeading}
        value={String(currentUnixTimestamp)}
        trailing={
          <button
            ref={copyButtonEl}
            onClick={handleClickButton}
            css={copyButtonCss}
            data-copied-label={t.copiedLabel}
          >
            {t.copyButton}
          </button>
        }
      />
      <InfoRow label={t.currentTimeHeading} value={isoString} />
      <InfoRow label={t.currentUtcHeading} value={now.utc().format('YYYY-MM-DDTHH:mm:ss')} />
      <InfoRow label={t.timezoneHeading} value={`${timezone} ${utcOffset}`} />
    </Wrapper>
  )
}
