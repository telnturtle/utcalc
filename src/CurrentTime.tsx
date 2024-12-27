import dayjs from 'dayjs'
import { useEffect } from 'react'
import { useForceUpdate } from './util/forceUpdate'
import { ClickToCopyParagraph } from './ClickToCopyParagraph'

export function CurrentTime() {
  const { forceUpdate } = useForceUpdate()

  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate()
    }, 500)
    return () => clearInterval(interval)
  }, [forceUpdate])

  const now = dayjs()
  const utc = now.utc().format('YYYY-MM-DD HH:mm:ss +0000')
  const offset = new Date().getTimezoneOffset() / -60
  const local =
    now.format('YYYY-MM-DD HH:mm:ss ') +
    (offset >= 0 ? '+' : '') +
    offset.toString().padStart(2, '0') +
    '00'

  return (
    <>
      <ClickToCopyParagraph>{utc}</ClickToCopyParagraph>
      <ClickToCopyParagraph>{local}</ClickToCopyParagraph>
    </>
  )
}
