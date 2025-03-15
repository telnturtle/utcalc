import { css } from '@emotion/react'

const wrapperCss = {
  wrapper: css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  `,
}
export function Wrapper({ children }: { children: React.ReactNode }) {
  const csss = wrapperCss

  return <div css={csss.wrapper}>{children}</div>
}
