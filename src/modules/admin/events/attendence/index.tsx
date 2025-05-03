"use client"
import { useState, FC, Fragment } from "react"
import { IUser } from "@/types/user"
import { IEvent } from "@/types/event"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UsersAttendance from "./components/attendence";

export interface AttendecModuleProps {
    users: IUser[];
    events: IEvent[];
}

const AttendecModule: FC<AttendecModuleProps> = ({ users, events }) => {
    const [selectedEventId, setSelectedEventId] = useState<string>("")

    return (
        <>
            <CardHeader>
                <CardTitle>Attendance Records</CardTitle>
                <CardDescription>Manage attendance for your participants</CardDescription>
            </CardHeader>

            <div className="flex flex-col gap-5 w-full">
                {events.map(event => (
                    <Fragment key={event._id}>
                        <Card className="flex-1" onClick={() => setSelectedEventId(event._id)}>
                            {(<div className=" mt-2">
                                <UsersAttendance users={users} event={event} selectedEventId={selectedEventId} />
                            </div>)}
                        </Card>
                    </Fragment>
                ))}
            </div>
        </>
    )
}
export default AttendecModule;