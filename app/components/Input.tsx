import React, { ChangeEventHandler } from 'react'
import { Text } from '@/components'
interface InputProps {
  onChange: ChangeEventHandler<HTMLInputElement>
  name: string
  label?: string
  placeholder?: string
}
export function Input({ onChange, label, name, placeholder }: InputProps) {
  return (
    <div className="flex flex-col items-center flex-1 w-full gap-2">
      {label && (
        <Text variant="paragraph-sm" className="italic text-center opacity-70">
          <label htmlFor={name}>{label}</label>
        </Text>
      )}
      <input
        id="name"
        placeholder={placeholder}
        type="text"
        onChange={onChange}
        className="self-stretch h-10 px-4 text-sm border rounded-lg border-slate-100"
      />
    </div>
  )
}
