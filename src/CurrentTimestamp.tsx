import dayjs from 'dayjs'
import { useRef, useState } from 'react'
import { usePeriodicForceUpdate } from './util/forceUpdate'
import { useT } from './util/language'
import { useOffsetHours } from './util/timeOffset'
import { Wrapper } from './Wrapper'

type InfoRowProps = {
  label: string
  value: string
  trailing?: React.ReactNode
}

function InfoRow({ label, value, trailing }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 w-full max-w-[36rem] text-[length:var(--font-size-body)] leading-[1.4] max-[480px]:flex-col max-[480px]:items-start max-[480px]:gap-[0.35rem]">
      <span className="font-normal text-left shrink-0">{label}</span>
      <div className="flex items-center gap-2 ml-auto min-w-0">
        <span className="font-bold tabular-nums text-right">{value}</span>
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

  const [copied, setCopied] = useState(false)
  const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleClickButton = () => {
    navigator.clipboard.writeText(currentUnixTimestamp.toString())
    setCopied(true)
    if (copiedTimerRef.current) {
      clearTimeout(copiedTimerRef.current)
    }
    copiedTimerRef.current = setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <Wrapper>
      <InfoRow
        label={t.currentUnixTimestampHeading}
        value={String(currentUnixTimestamp)}
        trailing={
          <button
            onClick={handleClickButton}
            className="relative shrink-0 px-[0.7rem] py-[0.3rem] text-[length:var(--font-size-caption)]"
          >
            {t.copyButton}
            {copied && (
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-[0.2rem] whitespace-nowrap text-[#646cff] text-[0.8em]">
                {t.copiedLabel}
              </span>
            )}
          </button>
        }
      />
      <InfoRow label={t.currentTimeHeading} value={isoString} />
      <InfoRow label={t.currentUtcHeading} value={now.utc().format('YYYY-MM-DDTHH:mm:ss')} />
      <InfoRow label={t.timezoneHeading} value={`${timezone} ${utcOffset}`} />
    </Wrapper>
  )
}
