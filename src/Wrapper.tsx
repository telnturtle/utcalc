import { useT } from './util/language'
import { useOffsetHours } from './util/timeOffset'

export function Wrapper({ children }: { children: React.ReactNode }) {
  const t = useT()
  const offsetHours = useOffsetHours()

  return (
    <div className="flex flex-col gap-4 items-center not-last:mt-4">
      {offsetHours !== 0 && (
        <span className="text-[length:var(--font-size-caption)] text-[#646cff] opacity-80">
          {t.offsetBadge(offsetHours)}
        </span>
      )}
      {children}
    </div>
  )
}
