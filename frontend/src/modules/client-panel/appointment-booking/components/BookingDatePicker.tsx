"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/core/components/Button"
import { Calendar } from "@/core/components/Calendar"
import { Input } from "@/core/components/Input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/core/components/Popover"

import dayjs from "dayjs"
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);


function formatDate(date: Date | undefined) {
  if (!date) {
    return ""
  }
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

interface DatePickerProps {
  value?: string
  setCurrentDatePicker: (date: string | null) => void
}

export function BookingDatePicker({ value, setCurrentDatePicker }: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(
    value ? new Date(value) : undefined
  )
  const [month, setMonth] = React.useState<Date | undefined>(date)
  const [inputValue, setInputValue] = React.useState(
    value ? formatDate(new Date(value)) : ""
  )

  const todayArgentina = dayjs().tz("America/Argentina/Buenos_Aires").startOf("day").toDate();
  const maxDate = dayjs(todayArgentina).add(5, "month").toDate();

  React.useEffect(() => {
    if (value) {
      setDate(new Date(value))
      setInputValue(formatDate(new Date(value)))
      setMonth(new Date(value))
    }
  }, [value])

  const handleDateSelect = (selectedDate: Date | undefined) => {
    
    const formatted = formatDate(selectedDate)
    setInputValue(formatted)
    setOpen(false)

    setDate(selectedDate)

    const dateFormatted = dayjs(selectedDate).format("YYYY-MM-DD")
    
    setCurrentDatePicker(dateFormatted)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="flex w-full">
              <Input
                id="date"
                value={inputValue}
                placeholder="DD/MM/YYYY"
                className="bg-background pr-10 border border-primary cursor-pointer focus-visible:border-primary focus-visible:ring-0"
                readOnly
                onClick={() => setOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    setOpen(true)
                  }
                }}
              />
              <Button
                id="date-picker"
                variant="ghost"
                className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                tabIndex={-1}
              >
                <CalendarIcon className="size-3.5" />
                <span className="sr-only">Select date</span>
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              disabled={{ before: todayArgentina, after: maxDate }}
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(selectedDate) => handleDateSelect(selectedDate)}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}