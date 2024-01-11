import React from 'react'
import { UseFormReturn, FieldValues, Path } from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>
  name: Path<T>
  label: string
  description?: string
  placeholder?: string
  className?: string
  component: React.ElementType
}

export default function FormFieldComponent<T extends FieldValues>({
  form,
  name,
  label,
  description,
  placeholder,
  className,
  component: Component,
}: Props<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const appliedClass = Component === Textarea ? 'resize-none' : ''
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Component
                placeholder={placeholder}
                className={cn(appliedClass, className)}
                {...field}
              />
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
