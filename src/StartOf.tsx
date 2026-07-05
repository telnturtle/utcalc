import { css } from '@emotion/react'
import dayjs, { Dayjs } from 'dayjs'
import { useState } from 'react'
import { Wrapper } from './Wrapper'
import { usePeriodicForceUpdate } from './util/forceUpdate'
import { useT } from './util/language'
import { useOffsetHours } from './util/timeOffset'

const MOBILE_BREAKPOINT = '640px'

const dateInputCss = {
  wrapper: css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;

    @media (max-width: ${MOBILE_BREAKPOINT}) {
      max-width: 36rem;
    }
  `,
  input: css`
    flex: 1;
    min-width: 0;
  `,
  button: css`
    flex-shrink: 0;
    padding: 0.3rem 0.9rem;
    &:disabled {
      opacity: 0.3;
      cursor: default;
    }
  `,
}

const tableCss = css`
  width: 100%;

  th {
    text-align: left;
    font-weight: 300;
  }
  td {
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    max-width: 36rem;
    thead {
      display: none;
    }
    tbody {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    tr {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.75rem;
      border-radius: 8px;
      border: 1px solid rgba(128, 128, 128, 0.25);
      background: rgba(128, 128, 128, 0.05);
    }
    th,
    td {
      display: block;
      width: 100%;
      padding: 0;
    }
    td {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.75rem;
      font-size: var(--font-size-caption);

      &::before {
        content: attr(data-label);
        font-weight: 300;
        flex-shrink: 0;
      }
    }
    td span {
      text-align: right;
      overflow-wrap: anywhere;
    }
  }
`

export function StartOf() {
  usePeriodicForceUpdate(500)
  const offsetHours = useOffsetHours()
  const t = useT()

  // null이면 "지금"을 실시간으로 따라가고, 값이 있으면 그 날짜에 고정됨
  const [manualDate, setManualDate] = useState<Dayjs | null>(null)
  const liveNow = dayjs().add(offsetHours, 'hour')
  const selectedDate = manualDate ?? liveNow
  const isLive = manualDate === null

  return (
    <Wrapper>
      <h2>{t.startOfHeading}</h2>
      <div css={dateInputCss.wrapper}>
        <input
          type="date"
          css={dateInputCss.input}
          value={selectedDate.format('YYYY-MM-DD')}
          onChange={(e) => {
            if (e.currentTarget.value) {
              setManualDate(dayjs(e.currentTarget.value))
            }
          }}
        />
        <button css={dateInputCss.button} disabled={isLive} onClick={() => setManualDate(null)}>
          {t.today}
        </button>
      </div>
      <table css={tableCss}>
        <thead>
          <tr>
            <th>{t.unitColumn}</th>
            <th>{t.startOfColumn}</th>
            <th>{t.endOfColumn}</th>
          </tr>
        </thead>
        <tbody>
          <Day date={selectedDate} onChange={setManualDate} />
          <Week date={selectedDate} onChange={setManualDate} />
          <Month date={selectedDate} onChange={setManualDate} />
          <Year date={selectedDate} onChange={setManualDate} />
        </tbody>
      </table>
    </Wrapper>
  )
}

type UnitProps = {
  date: Dayjs
  onChange: (date: Dayjs) => void
}
function Year({ date, onChange }: UnitProps) {
  return <Controller unit="year" format="YYYY" date={date} onChange={onChange} />
}
function Month({ date, onChange }: UnitProps) {
  return <Controller unit="month" format="YYYY-MM" date={date} onChange={onChange} />
}
function Week({ date, onChange }: UnitProps) {
  // format: 2016-W43
  // see https://ko.wikipedia.org/wiki/ISO_8601
  return <Controller unit="week" format="YYYY-[W]ww" date={date} onChange={onChange} />
}
function Day({ date, onChange }: UnitProps) {
  return <Controller unit="day" format="YYYY-MM-DD" date={date} onChange={onChange} />
}
type ControllerProps = UnitProps & {
  unit: 'year' | 'month' | 'week' | 'day'
  format: string
}
const controllerCss = {
  unitBlock: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.35rem;

    @media (max-width: ${MOBILE_BREAKPOINT}) {
      flex-direction: column;
      align-items: stretch;
    }
  `,
  cell: css`
    display: flex;
    align-items: center;
    gap: 0.35rem;

    @media (max-width: ${MOBILE_BREAKPOINT}) {
      justify-content: center;
    }
  `,
  navButton: css`
    background: transparent;
    border: 1px solid transparent;
    padding: 0.1rem 0.5rem;
    line-height: 1.4;
    border-radius: 6px;
    opacity: 0.5;
    flex-shrink: 0;
    transition:
      opacity 0.15s ease,
      background-color 0.15s ease;
    &:hover {
      opacity: 1;
      background-color: rgba(100, 108, 255, 0.15);
    }
  `,
  dateLabel: css`
    display: inline-block;
    min-width: 6.5em;
    text-align: center;

    @media (max-width: ${MOBILE_BREAKPOINT}) {
      min-width: 0;
    }
  `,
  monthSnapGroup: css`
    display: flex;
    align-items: center;
    gap: 0.3rem;
    margin-left: 0.3rem;
    padding-left: 0.6rem;
    border-left: 1px solid rgba(128, 128, 128, 0.35);

    @media (max-width: ${MOBILE_BREAKPOINT}) {
      width: 100%;
      margin-left: 0;
      padding-left: 0;
      padding-top: 0.5rem;
      border-left: none;
      border-top: 1px solid rgba(128, 128, 128, 0.25);
      justify-content: center;
    }
  `,
  monthSnapButton: css`
    background: transparent;
    border: 1px solid rgba(128, 128, 128, 0.4);
    padding: 0.25rem 0.75rem;
    font-size: var(--font-size-caption);
    border-radius: 999px;
    opacity: 0.7;
    transition:
      opacity 0.15s ease,
      border-color 0.15s ease;
    &:hover {
      opacity: 1;
      border-color: #646cff;
    }
  `,
}
function Controller({ unit, format, date, onChange }: ControllerProps) {
  const csss = controllerCss
  const t = useT()
  return (
    <tr>
      <th>
        <div css={csss.unitBlock}>
          <div css={csss.cell}>
            <button css={csss.navButton} onClick={() => onChange(date.add(-1, unit))}>
              ←
            </button>
            <span css={csss.dateLabel}>{date.format(format)}</span>
            <button css={csss.navButton} onClick={() => onChange(date.add(1, unit))}>
              →
            </button>
          </div>
          {unit === 'month' && (
            <div css={csss.monthSnapGroup}>
              <button css={csss.monthSnapButton} onClick={() => onChange(date.startOf('month'))}>
                {t.startOfMonthButton}
              </button>
              <button css={csss.monthSnapButton} onClick={() => onChange(date.endOf('month'))}>
                {t.endOfMonthButton}
              </button>
            </div>
          )}
        </div>
      </th>
      <td data-label={t.startOfColumn}>
        <span>{date.startOf(unit).unix()}</span>
      </td>
      <td data-label={t.endOfColumn}>
        <span>{date.endOf(unit).unix()}</span>
      </td>
    </tr>
  )
}
