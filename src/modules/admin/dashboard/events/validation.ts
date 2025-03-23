import { EventType } from "@/types/event";
import { z } from "zod";

export const ZTimeValue = z.object({
    hour: z.string(),
    minute: z.string(),
    period: z.enum(['AM', 'PM'])
});

export const ZTimeRangeValue = z.object({
    startTime: ZTimeValue,
    endTime: ZTimeValue
});

export const addEventSchema = z.object({
    name: z.string().min(1, "Event name is required"),
    location: z.string().min(1, "Location is required"),
    startDate: z.string(),
    timeRange: ZTimeRangeValue,
    endDate: z.string().optional(),
    description: z.string().optional(),
    manager: z.string().optional(),
    department: z.string().min(1, "Department is required"),
    type: z.nativeEnum(EventType).default(EventType.INDOOR)
});
