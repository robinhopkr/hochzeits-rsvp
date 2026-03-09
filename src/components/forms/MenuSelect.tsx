import { cn } from '@/lib/utils/cn'

interface MenuOption {
  value: string
  label: string
  emoji: string
}

interface MenuSelectProps {
  label: string
  options: ReadonlyArray<MenuOption>
  value: string
  onChange: (value: string) => void
  error?: string | undefined
}

export function MenuSelect({ label, options, value, onChange, error }: MenuSelectProps) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium text-charcoal-700">{label}</legend>
      <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label={label}>
        {options.map((option) => {
          const checked = option.value === value

          return (
            <label
              key={option.value}
              className={cn(
                'flex min-h-11 cursor-pointer items-center gap-3 rounded-3xl border px-4 py-4 transition',
                checked
                  ? 'border-gold-500 bg-gold-50 text-charcoal-900'
                  : 'border-cream-300 bg-white text-charcoal-700 hover:border-gold-300',
              )}
            >
              <input
                checked={checked}
                className="sr-only"
                type="radio"
                value={option.value}
                onChange={() => onChange(option.value)}
              />
              <span className="text-2xl">{option.emoji}</span>
              <span className="font-semibold">{option.label}</span>
            </label>
          )
        })}
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </fieldset>
  )
}
