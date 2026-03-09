import { forwardRef, useId } from 'react'

import { cn } from '@/lib/utils/cn'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string | undefined
  helperText?: string | undefined
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, label, error, helperText, id, ...props },
  ref,
) {
  const generatedId = useId()
  const textareaId = id ?? generatedId
  const messageId = `${textareaId}-message`

  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-charcoal-700" htmlFor={textareaId}>
      <span>{label}</span>
      <textarea
        ref={ref}
        id={textareaId}
        className={cn(
          'min-h-28 rounded-3xl border bg-white px-4 py-3 text-base text-charcoal-900 outline-none transition placeholder:text-charcoal-400 focus:border-gold-500',
          error ? 'border-red-400' : 'border-cream-300',
          className,
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={error || helperText ? messageId : undefined}
        {...props}
      />
      {error ? (
        <span id={messageId} className="text-sm text-red-600">
          {error}
        </span>
      ) : helperText ? (
        <span id={messageId} className="text-sm text-charcoal-500">
          {helperText}
        </span>
      ) : null}
    </label>
  )
})
