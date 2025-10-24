import { css } from '@emotion/react'
import dayjs from 'dayjs'
import { useState } from 'react'
import { Wrapper } from './Wrapper'
import { usePeriodicForceUpdate } from './util/forceUpdate'

export const StartOf: React.FC = (() => {
  return function StartOf() {
    usePeriodicForceUpdate(500)
    return (
      <Wrapper>
        <h2>Start of / End of ...</h2>
        <table
          css={css`
            width: 100%;
            th {
              text-align: left;
              font-weight: 300;
            }
            td {
              font-weight: 700;
            }
          `}
        >
          <thead>
            <tr>
              <th>Unit</th>
              <th>Start of...</th>
              <th>End of...</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Today</th>
              <td>{dayjs().startOf('day').unix()}</td>
              <td>{dayjs().endOf('day').unix()}</td>
            </tr>
            <tr>
              <th>This Week</th>
              <td>{dayjs().startOf('week').unix()}</td>
              <td>{dayjs().endOf('week').unix()}</td>
            </tr>
            <tr>
              <th>This Month</th>
              <td>{dayjs().startOf('month').unix()}</td>
              <td>{dayjs().endOf('month').unix()}</td>
            </tr>
            <tr>
              <th>This Year</th>
              <td>{dayjs().startOf('year').unix()}</td>
              <td>{dayjs().endOf('year').unix()}</td>
            </tr>
            <Day />
            <Week />
            <Month />
            <Year />
          </tbody>
        </table>
      </Wrapper>
    )
  }
})()

const Year: React.FC = (() => {
  return function Year() {
    return <Controller unit="year" format="YYYY" />
  }
})()
const Month: React.FC = (() => {
  return function Month() {
    return <Controller unit="month" format="YYYY-MM" />
  }
})()
const Week: React.FC = (() => {
  return function Week() {
    // format: 2016-W43
    // see https://ko.wikipedia.org/wiki/ISO_8601
    return <Controller unit="week" format="YYYY-[W]ww" />
  }
})()
const Day: React.FC = (() => {
  return function Day() {
    return <Controller unit="day" format="YYYY-MM-DD" />
  }
})()
type ControllerProps = {
  unit: 'year' | 'month' | 'week' | 'day'
  format: string
}
const Controller: React.FC<ControllerProps> = (() => {
  const c = {
    styles: {
      button: css`
        padding: 4px 8px;
        margin: 0 -12px;
        opacity: 0.3;
      `,
    },
  }
  return function Controller({ unit, format }: ControllerProps) {
    const [offset, setOffset] = useState(0)
    const time = dayjs().add(offset, unit)
    return (
      <tr>
        <th>
          {/* the previous button, use symbol or emoji */}
          <button css={c.styles.button} onClick={() => setOffset((offset) => offset - 1)}>
            {/* ⬅️←⬅🠜 */}
            {/* 🠈 */}←
          </button>
          {time.format(format)}
          {/* the next button, use symbol or emoji */}
          <button css={c.styles.button} onClick={() => setOffset((offset) => offset + 1)}>
            {/* ➡️→➡🠞 */}
            {/* 🠊 */}→
          </button>
        </th>
        <td>{time.startOf(unit).unix()}</td>
        <td>{time.endOf(unit).unix()}</td>
      </tr>
    )
  }
})()
