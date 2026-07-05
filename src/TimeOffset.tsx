import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useT } from './util/language'
import { setOffsetHours, useOffsetHours } from './util/timeOffset'

export function TimeOffset() {
  const t = useT()
  const offsetHours = useOffsetHours()
  const [text, setText] = useState(String(offsetHours))
  const active = offsetHours !== 0

  // 다른 곳(초기화 버튼 등)에서 오프셋이 바뀌면 입력창도 동기화
  useEffect(() => {
    setText(String(offsetHours))
  }, [offsetHours])

  const commit = (raw: string) => {
    const next = Number(raw)
    if (Number.isFinite(next)) {
      setOffsetHours(next)
    } else {
      setText(String(offsetHours))
    }
  }

  return (
    <div
      className={clsx(
        'flex flex-wrap items-center justify-center gap-2 px-[0.8rem] py-[0.4rem] max-w-full box-border rounded-lg border border-transparent transition-[background-color,border-color] duration-200',
        active && 'border-[#646cff] bg-[rgba(100,108,255,0.15)]',
      )}
    >
      <span className="text-[length:var(--font-size-caption)] opacity-70">{t.baseTimeLabel}</span>
      <button className="px-[0.7rem] py-[0.3rem]" onClick={() => setOffsetHours(offsetHours - 1)}>
        -1h
      </button>
      <input
        className="w-14 text-center"
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
        onBlur={(e) => commit(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') commit(e.currentTarget.value)
        }}
      />
      <span className="text-[length:var(--font-size-caption)] opacity-70">{t.hourUnitLabel}</span>
      <button className="px-[0.7rem] py-[0.3rem]" onClick={() => setOffsetHours(offsetHours + 1)}>
        +1h
      </button>
      {active && (
        <>
          <span className="text-[length:var(--font-size-caption)] text-[#646cff] font-bold">
            {t.offsetActive(offsetHours)}
          </span>
          <button className="px-[0.7rem] py-[0.3rem]" onClick={() => setOffsetHours(0)}>
            {t.resetButton}
          </button>
        </>
      )}
    </div>
  )
}
