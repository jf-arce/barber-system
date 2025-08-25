"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/core/components/Button"
import { Calendar } from "@/core/components/Calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/core/components/Popover"

import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/core/components/Select"

import dayjs from "dayjs"
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);


interface DateAndTimePickerProps {
    onChange: (dateIsoString: string | undefined) => void
}

export function DateAndTimePicker({ onChange }: DateAndTimePickerProps) {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)
    const [time, setTime] = React.useState<string>("")

    const todayArgentina = dayjs().tz("America/Argentina/Buenos_Aires").startOf("day").toDate();
    const maxDate = dayjs(todayArgentina).add(5, "month").toDate();

    return (
        <div className="flex gap-4">
            <div className="flex flex-col gap-3">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="date-picker"
                            className="w-32 justify-between font-normal active:scale-100 shadow-none text-muted-foreground"
                        >
                            {date ? (<span className="text-foreground">{date.toLocaleDateString()}</span>) : "Fecha"}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            disabled={[
                                { before: todayArgentina, after: maxDate },
                                { dayOfWeek: [0, 1] } // domingo=0, lunes=1
                            ]}
                            selected={date}
                            captionLayout="dropdown"
                            onSelect={(selectedDate) => {
                                setDate(selectedDate);
                                setOpen(false);
                                if (selectedDate && time) {
                                    const [hours, minutes, seconds] = time.split(":").map(Number);
                                    const localDate = new Date(selectedDate);
                                    localDate.setHours(hours ?? 0, minutes ?? 0, seconds ?? 0, 0);
                                    onChange(localDate.toISOString());
                                } else {
                                    onChange(undefined);
                                }
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex flex-col gap-3">
                <Select
                    value={time}
                    onValueChange={value => {
                        setTime(value);
                        if (date && value) {
                            const hour = Number(value);
                            const localDate = new Date(date);
                            localDate.setHours(hour, 0, 0, 0);
                            onChange(localDate.toISOString());
                        } else {
                            onChange(undefined);
                        }
                    }}
                >
                    <SelectTrigger id="time-picker" className="cursor-pointer w-32 px-3 border border-primary" aria-label="Seleccionar hora">
                        <SelectValue placeholder="Hora"/>
                    </SelectTrigger>
                    <SelectContent>
                        {[...Array(11)].map((_, i) => {
                            const hour = 8 + i;
                            return (
                                <SelectItem key={hour} value={String(hour)} className="text-black">{hour}:00</SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
