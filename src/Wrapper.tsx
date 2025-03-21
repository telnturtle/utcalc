import { css } from '@emotion/react'

const wrapperCss = {
  wrapper: css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    & > h3 {
      font-weight: 300;
      font-size: var(--font-size-heading);
      margin-top: var(--font-size-heading);
    }
    & > p {
      font-weight: bold;
      font-size: var(--font-size-body);
      &.italic {
        font-style: italic;
      }
      &.locale-font {
        font-family: var(--locale-font), 'Noto Serif', serif;
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
    & > input {
      font-size: var(--font-size-body);
      font-family: 'Noto Serif';
    }
    &:not(last-child) {
      margin-top: 1rem;
    }
  `,
  h3: css``,
  p: css``,
}
export function Wrapper({ children }: { children: React.ReactNode }) {
  const csss = wrapperCss

  return <div css={csss.wrapper}>{children}</div>
}
