import { css } from '@emotion/react'
import { ReactNode, useState } from 'react'

const theCss = {
  p: css`
    font-weight: bold;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
    &::before {
      content: 'Click to copy';
      font-size: var(--font-size-caption-small);
      color: var(--color-text);
      // content place in next line
      display: block;
      height: var(--font-size-caption-small);
    }
    &::after {
      content: '';
      font-size: var(--font-size-caption-small);
      color: var(--color-text);
      display: block;
      visibility: hidden;
      height: var(--font-size-caption-small);
    }
    &[data-copied-text]:not([data-copied-text=''])::after {
      content: attr(data-copied-text);
      font-size: var(--font-size-caption-small);
      color: var(--color-text);
      display: block;
      visibility: visible;
    }
  `,
}
export function ClickToCopyParagraph({ children }: { children: ReactNode }) {
  const c = theCss
  const handleClick = () => {
    if (children) {
      navigator.clipboard.writeText(children.toString())
      setCopiedText('"' + children.toString() + '"' + ' copied!')
    }
  }
  const [copiedText, setCopiedText] = useState<string>('')
  return (
    <p css={c.p} onClick={handleClick} role="button" data-copied-text={copiedText}>
      {children}
    </p>
  )
}
