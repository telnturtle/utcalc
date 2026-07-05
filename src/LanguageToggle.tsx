import clsx from 'clsx'
import { setLanguage, useLanguage } from './util/language'

export function LanguageToggle() {
  const language = useLanguage()

  return (
    <div className="flex gap-2">
      <button
        className={clsx('px-[0.9rem] py-[0.3rem] opacity-50', language === 'ko' && 'opacity-100 border-[#646cff]')}
        onClick={() => setLanguage('ko')}
      >
        KOR
      </button>
      <button
        className={clsx('px-[0.9rem] py-[0.3rem] opacity-50', language === 'en' && 'opacity-100 border-[#646cff]')}
        onClick={() => setLanguage('en')}
      >
        ENG
      </button>
    </div>
  )
}
