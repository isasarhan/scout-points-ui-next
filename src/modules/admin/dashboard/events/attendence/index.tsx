"use client"
import { useEffect, useState, FC } from "react"
import { IUser } from "@/types/user"
import { IEvent } from "@/types/event"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { dateFormatter } from "@/lib/dateFormatter";
import UsersAttendance from "./components/attendence";
import { Button } from "@/components/ui/button";

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
                    <>
                        <Card className="flex-1"    onClick={() => setSelectedEventId(event._id)}>
                          
                            {(
                                <div className=" mt-2">
                                    <UsersAttendance users={users} event={event} selectedEventId={selectedEventId}/>
                                </div>
                            )}
                        </Card>
                    </>
                ))}
            </div>
        </>
    )
}
export default AttendecModule;