import dayjs, { Dayjs } from 'dayjs'
import { useState } from 'react'
import { Wrapper } from './Wrapper'
import { usePeriodicForceUpdate } from './util/forceUpdate'
import { useT } from './util/language'
import { useOffsetHours } from './util/timeOffset'

const TABLE_CLASS =
  'w-full [&_th]:text-left [&_th]:font-light [&_td]:font-bold [&_td]:tabular-nums max-[640px]:max-w-[36rem] max-[640px]:[&_thead]:hidden max-[640px]:[&_tbody]:flex max-[640px]:[&_tbody]:flex-col max-[640px]:[&_tbody]:gap-3'

const TABLE_ROW_CLASS =
  'max-[640px]:flex max-[640px]:flex-col max-[640px]:gap-2 max-[640px]:p-3 max-[640px]:rounded-lg max-[640px]:border max-[640px]:border-[rgba(128,128,128,0.25)] max-[640px]:bg-[rgba(128,128,128,0.05)]'

const MOBILE_CELL_CLASS =
  'max-[640px]:block max-[640px]:w-full max-[640px]:p-0'

const MOBILE_TD_CLASS =
  'max-[640px]:flex max-[640px]:justify-between max-[640px]:items-center max-[640px]:gap-3 max-[640px]:w-full max-[640px]:p-0 max-[640px]:text-[length:var(--font-size-caption)] max-[640px]:before:content-[attr(data-label)] max-[640px]:before:font-light max-[640px]:before:shrink-0'

const MOBILE_TD_VALUE_CLASS = 'max-[640px]:text-right max-[640px]:[overflow-wrap:anywhere]'

const NAV_BUTTON_CLASS =
  'bg-transparent border border-transparent px-2 py-[0.1rem] leading-[1.4] rounded-md opacity-50 shrink-0 transition-[opacity,background-color] duration-150 ease-in-out hover:opacity-100 hover:bg-[rgba(100,108,255,0.15)]'

const MONTH_SNAP_BUTTON_CLASS =
  'bg-transparent border border-[rgba(128,128,128,0.4)] px-3 py-1 text-[length:var(--font-size-caption)] rounded-full opacity-70 transition-[opacity,border-color] duration-150 ease-in-out hover:opacity-100 hover:border-[#646cff]'

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
      <div className="flex items-center gap-2 w-full max-[640px]:max-w-[36rem]">
        <input
          type="date"
          className="flex-1 min-w-0"
          value={selectedDate.format('YYYY-MM-DD')}
          onChange={(e) => {
            if (e.currentTarget.value) {
              setManualDate(dayjs(e.currentTarget.value))
            }
          }}
        />
        <button
          className="shrink-0 px-[0.9rem] py-[0.3rem] disabled:opacity-30 disabled:cursor-default"
          disabled={isLive}
          onClick={() => setManualDate(null)}
        >
          {t.today}
        </button>
      </div>
      <table className={TABLE_CLASS}>
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
function Controller({ unit, format, date, onChange }: ControllerProps) {
  const t = useT()
  return (
    <tr className={TABLE_ROW_CLASS}>
      <th className={MOBILE_CELL_CLASS}>
        <div className="flex flex-row items-center flex-wrap gap-[0.35rem] max-[640px]:flex-col max-[640px]:items-stretch">
          <div className="flex items-center gap-[0.35rem] max-[640px]:justify-center">
            <button className={NAV_BUTTON_CLASS} onClick={() => onChange(date.add(-1, unit))}>
              ←
            </button>
            <span className="inline-block min-w-[6.5em] text-center max-[640px]:min-w-0">{date.format(format)}</span>
            <button className={NAV_BUTTON_CLASS} onClick={() => onChange(date.add(1, unit))}>
              →
            </button>
          </div>
          {unit === 'month' && (
            <div className="flex items-center gap-[0.3rem] ml-[0.3rem] pl-[0.6rem] border-l border-[rgba(128,128,128,0.35)] max-[640px]:w-full max-[640px]:ml-0 max-[640px]:pl-0 max-[640px]:pt-2 max-[640px]:border-l-0 max-[640px]:border-t max-[640px]:border-[rgba(128,128,128,0.25)] max-[640px]:justify-center">
              <button className={MONTH_SNAP_BUTTON_CLASS} onClick={() => onChange(date.startOf('month'))}>
                {t.startOfMonthButton}
              </button>
              <button className={MONTH_SNAP_BUTTON_CLASS} onClick={() => onChange(date.endOf('month'))}>
                {t.endOfMonthButton}
              </button>
            </div>
          )}
        </div>
      </th>
      <td data-label={t.startOfColumn} className={MOBILE_TD_CLASS}>
        <span className={MOBILE_TD_VALUE_CLASS}>{date.startOf(unit).unix()}</span>
      </td>
      <td data-label={t.endOfColumn} className={MOBILE_TD_CLASS}>
        <span className={MOBILE_TD_VALUE_CLASS}>{date.endOf(unit).unix()}</span>
      </td>
    </tr>
  )
}
