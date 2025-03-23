"use client"

import { useState } from "react"
import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type TimeValue = {
  hour: string
  minute: string
  period: "AM" | "PM"
}

export type TimeRangeValue = {
  startTime: TimeValue
  endTime: TimeValue
}

interface TimeRangePickerProps {
  value?: TimeRangeValue
  onChange?: (value: TimeRangeValue) => void
  disabled?: boolean
}

const defaultTimeRange: TimeRangeValue = {
  startTime: { hour: "09", minute: "00", period: "AM" },
  endTime: { hour: "05", minute: "00", period: "PM" },
}

export function TimeRangePicker({ value = defaultTimeRange, onChange, disabled = false }: TimeRangePickerProps) {
  const [open, setOpen] = useState(false)
  const [timeRange, setTimeRange] = useState<TimeRangeValue>(value)

  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"))
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"))

  const handleTimeChange = (
    timeType: "startTime" | "endTime",
    field: "hour" | "minute" | "period",
    newValue: string,
  ) => {
    const updatedTimeRange = {
      ...timeRange,
      [timeType]: {
        ...timeRange[timeType],
        [field]: field === "period" ? (newValue as "AM" | "PM") : newValue,
      },
    }

    setTimeRange(updatedTimeRange)
    onChange?.(updatedTimeRange)
  }

  const handleApply = () => {
    onChange?.(timeRange)
    setOpen(false)
  }

  const formattedTimeRange = `${timeRange.startTime.hour}:${timeRange.startTime.minute} ${timeRange.startTime.period} - ${timeRange.endTime.hour}:${timeRange.endTime.minute} ${timeRange.endTime.period}`

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[280px] justify-start text-left font-normal" disabled={disabled}>
          <Clock className="mr-2 h-4 w-4" />
          <span>{formattedTimeRange}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Start Time</div>
              <div className="flex items-center space-x-2">
                <Select
                  value={timeRange.startTime.hour}
                  onValueChange={(value) => handleTimeChange("startTime", "hour", value)}
                  disabled={disabled}
                >
                  <SelectTrigger className="w-[70px]">
                    <SelectValue placeholder="Hour" />
                  </SelectTrigger>
                  <SelectContent>
                    {hours.map((hour) => (
                      <SelectItem key={`start-hour-${hour}`} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span>:</span>
                <Select
                  value={timeRange.startTime.minute}
                  onValueChange={(value) => handleTimeChange("startTime", "minute", value)}
                  disabled={disabled}
                >
                  <SelectTrigger className="w-[70px]">
                    <SelectValue placeholder="Min" />
                  </SelectTrigger>
                  <SelectContent>
                    {minutes.map((minute) => (
                      <SelectItem key={`start-min-${minute}`} value={minute}>
                        {minute}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={timeRange.startTime.period}
                  onValueChange={(value) => handleTimeChange("startTime", "period", value)}
                  disabled={disabled}
                >
                  <SelectTrigger className="w-[70px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AM">AM</SelectItem>
                    <SelectItem value="PM">PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">End Time</div>
              <div className="flex items-center space-x-2">
                <Select
                  value={timeRange.endTime.hour}
                  onValueChange={(value) => handleTimeChange("endTime", "hour", value)}
                  disabled={disabled}
                >
                  <SelectTrigger className="w-[70px]">
                    <SelectValue placeholder="Hour" />
                  </SelectTrigger>
                  <SelectContent>
                    {hours.map((hour) => (
                      <SelectItem key={`end-hour-${hour}`} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span>:</span>
                <Select
                  value={timeRange.endTime.minute}
                  onValueChange={(value) => handleTimeChange("endTime", "minute", value)}
                  disabled={disabled}
                >
                  <SelectTrigger className="w-[70px]">
                    <SelectValue placeholder="Min" />
                  </SelectTrigger>
                  <SelectContent>
                    {minutes.map((minute) => (
                      <SelectItem key={`end-min-${minute}`} value={minute}>
                        {minute}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={timeRange.endTime.period}
                  onValueChange={(value) => handleTimeChange("endTime", "period", value)}
                  disabled={disabled}
                >
                  <SelectTrigger className="w-[70px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AM">AM</SelectItem>
                    <SelectItem value="PM">PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Button type="button" className="w-full" onClick={handleApply} disabled={disabled}>
            Apply Time Range
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

