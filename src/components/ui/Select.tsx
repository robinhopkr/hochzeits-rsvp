import { forwardRef, useId } from 'react'

import { cn } from '@/lib/utils/cn'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: SelectOption[]
  error?: string | undefined
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, label, options, error, id, ...props },
  ref,
) {
  const generatedId = useId()
  const selectId = id ?? generatedId
  const messageId = `${selectId}-message`

  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-charcoal-700" htmlFor={selectId}>
      <span>{label}</span>
      <select
        ref={ref}
        id={selectId}
        className={cn(
          'min-h-11 rounded-2xl border bg-white px-4 py-3 text-base text-charcoal-900 outline-none transition focus:border-gold-500',
          error ? 'border-red-400' : 'border-cream-300',
          className,
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? messageId : undefined}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <span id={messageId} className="text-sm text-red-600">
          {error}
        </span>
      ) : null}
    </label>
  )
})
