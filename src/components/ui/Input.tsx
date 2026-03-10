'use client'

import { Eye, EyeOff } from 'lucide-react'
import { forwardRef, useId, useState } from 'react'

import { cn } from '@/lib/utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string | undefined
  helperText?: string | undefined
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, label, error, helperText, id, ...props },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const messageId = `${inputId}-message`
  const isPasswordField = props.type === 'password'
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const inputType = isPasswordField && isPasswordVisible ? 'text' : props.type

  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-charcoal-700" htmlFor={inputId}>
      <span>{label}</span>
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'min-h-11 w-full rounded-2xl border bg-white px-4 py-3 text-base text-charcoal-900 outline-none transition placeholder:text-charcoal-400 focus:border-gold-500',
            isPasswordField ? 'pr-12' : null,
            error ? 'border-red-400' : 'border-cream-300',
            className,
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={error || helperText ? messageId : undefined}
          {...props}
          type={inputType}
        />
        {isPasswordField ? (
          <button
            aria-label={isPasswordVisible ? 'Passwort verbergen' : 'Passwort anzeigen'}
            className="absolute inset-y-0 right-3 inline-flex items-center justify-center text-charcoal-500 transition hover:text-charcoal-900"
            type="button"
            onClick={() => setIsPasswordVisible((current) => !current)}
          >
            {isPasswordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        ) : null}
      </div>
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
