import './App.css'
import { CurrentUnixTimestamp } from './CurrentTimestamp'
import { LanguageToggle } from './LanguageToggle'
import { StartOf } from './StartOf'
import { TimeOffset } from './TimeOffset'
import { TimestampToTime } from './TimestampToTime'
import { useT } from './util/language'

function App() {
  const t = useT()

  return (
    <>
      <header>
        <h1 className="mt-[calc(1*var(--font-size-heading))] mb-[calc(0.5*var(--font-size-heading))]">
          {t.appTitle}
        </h1>
      </header>
      <TimeOffset />
      <CurrentUnixTimestamp />
      <StartOf />
      <TimestampToTime />
      {/* 메인 콘텐츠 하단 여백(기존 footer 간격)을 유지하고, 그 아래에 언어 전환 버튼을 배치 */}
      <div className="mt-[calc(2*var(--font-size-heading))] flex justify-center">
        <LanguageToggle />
      </div>
      <footer className="mt-[calc(1*var(--font-size-heading))] mb-[calc(1*var(--font-size-heading))] font-thin [&_*]:font-thin">
        {/* credit */}
        <p>
          Made with <span style={{ opacity: 0.5 }}>❤️</span> by{' '}
          <a href="https://github.com/telnturtle">telnturtle</a>
        </p>
      </footer>
    </>
  )
}

export default App
