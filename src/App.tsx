import { css } from '@emotion/react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import './App.css'
import { ConvertTimestamp } from './ConvertTimestamp'
import { CurrentTime } from './CurrentTime'
import { CurrentUnixTimestamp } from './CurrentTimestamp'
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)

function App() {
  return (
    <>
      <NormalGap>
        <CurrentUnixTimestamp />
      </NormalGap>
      <NormalGap>
        <ConvertTimestamp />
      </NormalGap>
    </>
  )
}

export default App

function NormalGap({ children }: { children: React.ReactNode }) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 98svh;
        gap: 1rem;
        & > * {
          margin: 0;
        }
      `}
    >
      {children}
    </div>
  )
}
