import { TimeRangeValue, TimeValue } from "@/components/ui/time-range-picker";

export function formatTimeRange(timeRange: TimeRangeValue): string {
    const formatTime = ({ hour, minute, period }: TimeValue) => 
        `${hour}:${minute} ${period}`;

    return `${formatTime(timeRange.startTime)} - ${formatTime(timeRange.endTime)}`;
}
