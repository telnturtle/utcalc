import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { useT } from './util/language'
import { setOffsetHours, useOffsetHours } from './util/timeOffset'

const timeOffsetCss = {
  wrapper: css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.4rem 0.8rem;
    max-width: 100%;
    box-sizing: border-box;
    border-radius: 8px;
    border: 1px solid transparent;
    transition:
      background-color 0.2s,
      border-color 0.2s;
    &.active {
      border-color: #646cff;
      background-color: rgba(100, 108, 255, 0.15);
    }
  `,
  label: css`
    font-size: var(--font-size-caption);
    opacity: 0.7;
  `,
  input: css`
    width: 3.5rem;
    text-align: center;
  `,
  button: css`
    padding: 0.3rem 0.7rem;
  `,
  status: css`
    font-size: var(--font-size-caption);
    color: #646cff;
    font-weight: 700;
  `,
}

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
    <div css={timeOffsetCss.wrapper} className={active ? 'active' : undefined}>
      <span css={timeOffsetCss.label}>{t.baseTimeLabel}</span>
      <button css={timeOffsetCss.button} onClick={() => setOffsetHours(offsetHours - 1)}>
        -1h
      </button>
      <input
        css={timeOffsetCss.input}
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
        onBlur={(e) => commit(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') commit(e.currentTarget.value)
        }}
      />
      <span css={timeOffsetCss.label}>{t.hourUnitLabel}</span>
      <button css={timeOffsetCss.button} onClick={() => setOffsetHours(offsetHours + 1)}>
        +1h
      </button>
      {active && (
        <>
          <span css={timeOffsetCss.status}>{t.offsetActive(offsetHours)}</span>
          <button css={timeOffsetCss.button} onClick={() => setOffsetHours(0)}>
            {t.resetButton}
          </button>
        </>
      )}
    </div>
  )
}
