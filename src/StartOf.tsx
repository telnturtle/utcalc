import { css } from '@emotion/react'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { useForceUpdate } from './util/forceUpdate'
import { Wrapper } from './Wrapper'

export function StartOf() {
  const { forceUpdate } = useForceUpdate()

  // Auto update every 500ms
  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate()
    }, 500)
    return () => clearInterval(interval)
  }, [forceUpdate])

  return (
    <Wrapper>
      <h3>Start of / End of ...</h3>
      <table
        css={css`
          width: 100%;
          th {
            text-align: left;
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
            <th>This Year</th>
            <td>{dayjs().startOf('year').unix()}</td>
            <td>{dayjs().endOf('year').unix()}</td>
          </tr>
          <tr>
            <th>This Month</th>
            <td>{dayjs().startOf('month').unix()}</td>
            <td>{dayjs().endOf('month').unix()}</td>
          </tr>
          <tr>
            <th>This Week</th>
            <td>{dayjs().startOf('week').unix()}</td>
            <td>{dayjs().endOf('week').unix()}</td>
          </tr>
          <tr>
            <th>Today</th>
            <td>{dayjs().startOf('day').unix()}</td>
            <td>{dayjs().endOf('day').unix()}</td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  )
}
