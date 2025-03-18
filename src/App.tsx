import { css } from '@emotion/react'
import './App.css'
import { CurrentUnixTimestamp } from './CurrentTimestamp'
import { StartOf } from './StartOf'

function App() {
  return (
    <>
      <CurrentUnixTimestamp />
      <StartOf />
      <footer
        css={css`
          margin-top: calc(2 * var(--font-size-heading));
          margin-bottom: calc(1 * var(--font-size-heading));
        `}
      >
        Made by <a href="https://github.com/telnturtle">telnturtle</a>
      </footer>
    </>
  )
}

export default App
