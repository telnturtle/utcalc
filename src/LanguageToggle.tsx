import { css } from '@emotion/react'
import { setLanguage, useLanguage } from './util/language'

const languageToggleCss = {
  wrapper: css`
    display: flex;
    gap: 0.5rem;
  `,
  button: css`
    padding: 0.3rem 0.9rem;
    opacity: 0.5;
    &.active {
      opacity: 1;
      border-color: #646cff;
    }
  `,
}

export function LanguageToggle() {
  const language = useLanguage()

  return (
    <div css={languageToggleCss.wrapper}>
      <button
        css={languageToggleCss.button}
        className={language === 'ko' ? 'active' : undefined}
        onClick={() => setLanguage('ko')}
      >
        KOR
      </button>
      <button
        css={languageToggleCss.button}
        className={language === 'en' ? 'active' : undefined}
        onClick={() => setLanguage('en')}
      >
        ENG
      </button>
    </div>
  )
}
