'use client'

import * as React from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function YearSelect({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i)

  return (
    <>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue
            placeholder={<CalendarIcon className="mr-2 h-4 w-4" />}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Years</SelectLabel>
            {years.map((year) => (
              <SelectItem key={year} value={String(year)}>
                <div className="flex">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {year}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}
