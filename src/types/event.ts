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
    departments?: Partial<IDepartment>[]
    attendees: IAttendee[];
}
