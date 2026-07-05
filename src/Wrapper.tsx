import { css } from '@emotion/react'
import { useT } from './util/language'
import { useOffsetHours } from './util/timeOffset'

const wrapperCss = {
  wrapper: css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    & > p {
      &.italic {
        font-style: italic;
      }
      &.locale-font {
        font-family: var(--font-serif);
      }
      &.langauge-wrap {
        &:lang(ko-KR) {
          word-break: keep-all;
          overflow-wrap: break-word;
        }
        &:lang(zh-CN),
        &:lang(zh-TW),
        &:lang(ja-JP) {
          word-break: break-all;
          overflow-wrap: break-word;
        }
      }
    }
    &:not(:last-child) {
      margin-top: 1rem;
    }
  `,
  p: css``,
  offsetBadge: css`
    font-size: var(--font-size-caption);
    color: #646cff;
    opacity: 0.8;
  `,
}
export function Wrapper({ children }: { children: React.ReactNode }) {
  const csss = wrapperCss
  const t = useT()
  const offsetHours = useOffsetHours()

  return (
    <div css={csss.wrapper}>
      {offsetHours !== 0 && <span css={csss.offsetBadge}>{t.offsetBadge(offsetHours)}</span>}
      {children}
    </div>
  )
}
