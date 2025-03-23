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

export interface IAttendee {
    user: string;
    attendance: string;
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
    department?: string
    attendees?: IAttendee[];
}
export interface IEvent {
    _id?: string
    type: EventType
    location: string;
    name?: string;
    startDate: string;
    endDate?: string;
    manager?: Partial<IUser>
    department?: Partial<IDepartment>
    attendees: IAttendee[];
}
