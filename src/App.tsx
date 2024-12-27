import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import './App.css'
import { ConvertTimestamp } from './ConvertTimestamp'
import { CurrentUnixTimestamp } from './CurrentTimestamp'
import { CurrentTime } from './CurrentTime'
import { css } from '@emotion/react'
dayjs.extend(utc)
dayjs.extend(timezone)

function App() {
  return (
    <>
      <CurrentUnixTimestamp />
      <CurrentTime />
      <Seperator />
      {/* <ConvertTimestamp /> */}
    </>
  )
}

export default App

function Seperator() {
  return (
    <div
      css={css`
        width: 1px;
        height: 2rem;
      `}
    />
  )
}
