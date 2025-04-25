import { IDepartment } from "./department";
import { IUser } from "./user";

export enum Status {
    PRESENT = "present",
    ABSENT = "absent",
    LATE = "late"
}
export enum EventType {
    INDOOR = "in door",
    OUTDOOR = "out door",
    OTHER = "other"
}

export interface IAddAttendee {
    user: string;
    attendance?: string;
    status: Status;
}
export interface IAttendee {
    user: Partial<IUser>;
    attendance?: string;
    status: Status;
}

export interface IAddEvent {
    _id?: string
    type: EventType
    location: string;
    name?: string;
    startDate: string;
    endDate?: string;
    manager?: string
    timeRange: TimeRangeValue
    departments?: string[]
    attendees?: IAddAttendee[];
}
export interface IEvent {
    _id: string
    type: EventType
    location: string;
    name?: string;
    startDate: string;
    endDate?: string;
    manager?: Partial<IUser>
    timeRange: TimeRangeValue
    departments?: Partial<IDepartment>[]
    attendees: IAttendee[];
}
export type TimeValue = {
    hour: string
    minute: string
    period: "AM" | "PM"
}

export type TimeRangeValue = {
    startTime: TimeValue
    endTime: TimeValue
}