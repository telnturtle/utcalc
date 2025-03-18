import { css } from '@emotion/react'
import './App.css'
import { CurrentUnixTimestamp } from './CurrentTimestamp'
import { StartOf } from './StartOf'

function App() {
  return (
    <>
      <header>
        <h1
          css={css`
            font-size: calc(8px + var(--font-size-heading));
            margin-top: calc(1 * var(--font-size-heading));
            margin-bottom: calc(1 / 2 * var(--font-size-heading));
            font-weight: 100;
          `}
        >
          Unix Timestamp Calculator
        </h1>
      </header>
      <CurrentUnixTimestamp />
      <StartOf />
      <footer
        css={css`
          margin-top: calc(2 * var(--font-size-heading));
          margin-bottom: calc(1 * var(--font-size-heading));
          font-weight: 100;
          & * {
            font-weight: 100;
          }
        `}
      >
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
