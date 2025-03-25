import { useEffect, useState, FC } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Search, X } from "lucide-react"
import { toast } from "sonner"
import { IUser, Rank } from "@/types/user"
import { IAddAttendee, IAttendee, IEvent } from "@/types/event"
import { dateFormatter } from "@/lib/dateFormatter"
import { useUserContext } from "@/providers/UserProvider"
import useEvents from "@/services/events"

export interface UsersAttendanceProps {
    users: IUser[];
    event: IEvent;
    selectedEventId: string
}
enum Status {
    PRESENT = "present",
    ABSENT = "absent",
    LATE = "late"
}

const UsersAttendance: FC<UsersAttendanceProps> = ({ users, event, selectedEventId }) => {
    console.log('event', event);

    const [attendees, setAttendees] = useState<IAttendee[]>([])
    const [filteredAttendees, setFilteredAttendees] = useState<IAttendee[]>([])
    const [filterGroup, setFilterGroup] = useState<Rank | string>('all')

    const { token } = useUserContext();
    const { update } = useEvents({ token })

    useEffect(() => {
        let mapped;

        if (event.attendees.length === 0) {
            mapped = users.map((user) => (
                {
                    user: user,
                    status: Status.LATE
                }
            ))
            setAttendees(mapped)
            setFilteredAttendees(mapped)
        } else {
            mapped = event.attendees.map((user) => (
                {
                    user: user.user,
                    status: user.status
                }
            ))
            setAttendees(mapped)
            setFilteredAttendees(mapped)
        }
    }, [users])

    const handleSave = async () => {
        try {

            const mapped: IAddAttendee[] = attendees.map((att) => ({
                user: att.user?._id || '',  // Safely handle potentially undefined user
                attendance: att.attendance,
                status: att.status
            }));
            update(event._id, { attendees: mapped })
            toast.success("Event updated successfully!");
        } catch (e: any) {
            toast.error(e.message);
        }
    }

    const updateAttendeeStatus = (attendee: IAttendee, status: Status) => {
        // console.log('update..', status);
        const updated = attendees.map(att => att.user._id === attendee.user._id ? {
            ...attendee,
            status
        } : att)
        setAttendees(updated)
        setFilteredAttendees(updated)
    }

    const handleSearch = (query: string) => {
        const searchTerm = query.toLowerCase().trim();
        if (searchTerm === "") {
            setFilteredAttendees(attendees);
            return;
        }

        const filtered = attendees.filter((attendee) => {
            const user = attendee.user;
            if (!user) return false;

            const matchesSearch =
                user.firstName?.toLowerCase().includes(searchTerm) ||
                user.email?.toLowerCase().includes(searchTerm);

            return matchesSearch;
        });

        console.log('filtered', filtered);
        setFilteredAttendees(filtered);
    };



    const getStatusColor = (status: string) => {
        switch (status) {
            case "present":
                return "bg-green-500"
            case "absent":
                return "bg-red-500"
            case "late":
                return "bg-yellow-500"
            default:
                return "bg-gray-500"
        }
    }

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase()
            .substring(0, 2)
    }

    return (
        <>
            <div className="flex items-center justify-content-between p-5">
                <div className="flex flex-col gap-3 flex-grow " >
                    <div className="flex-1">{dateFormatter(event.startDate)}</div>
                    <div className="flex-1">{event?.name}</div>
                </div>
                <div>
                    {selectedEventId === event._id && <Button type="button" onClick={() => handleSave()}>Save</Button>}
                </div>
            </div>
            {selectedEventId === event._id && (<div className="space-y-4">
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name or email..."
                                className="pl-8"
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </div>

                        <Select value={filterGroup} onValueChange={setFilterGroup}>
                            <SelectTrigger className="w-full md:w-[180px]">
                                <SelectValue placeholder="Filter by group" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Groups</SelectItem>
                                <SelectItem value="class-a">Class A</SelectItem>
                                <SelectItem value="class-b">Class B</SelectItem>
                                <SelectItem value="team-1">Team 1</SelectItem>
                                <SelectItem value="team-2">Team 2</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {attendees.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-muted-foreground">No attendees found</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredAttendees.map((attendee) => (
                                <Card key={attendee.user._id} className="overflow-hidden">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4">
                                        <div className="flex items-center gap-4 flex-1">
                                            <Avatar>
                                                <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${getInitials(attendee?.user?.firstName || '')}`} />
                                                <AvatarFallback>{getInitials(attendee?.user?.firstName || '')}</AvatarFallback>
                                            </Avatar>

                                            <div className="space-y-1">
                                                <h3 className="font-medium">{attendee.user.firstName}</h3>
                                                <p className="text-sm text-muted-foreground">{attendee.user.email}</p>
                                                <div className="flex items-center gap-2">
                                                    {/* <Badge variant="outline">{getGroupName(attendee.status)}</Status */}
                                                    <div className="flex items-center gap-1">
                                                        {/* <span className={`h-2 w-2 rounded-full ${getStatusColor(attendee.status)}`} /> */}
                                                        {/* <span className="text-xs capitalize">{attendee.status}</span> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 w-full sm:w-auto">
                                            <Button
                                                size="sm"
                                                variant={attendee.status === Status.PRESENT ? "default" : "outline"}
                                                onClick={() => updateAttendeeStatus(attendee, Status.PRESENT)}
                                            >
                                                <Check className="h-4 w-4 mr-1" />
                                                Present
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant={attendee.status === Status.LATE ? "destructive" : "outline"}
                                                onClick={() => updateAttendeeStatus(attendee, Status.LATE)}
                                            >
                                                <X className="h-4 w-4 mr-1" />
                                                Absent
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant={attendee.status === Status.ABSENT ? "secondary" : "outline"}
                                                onClick={() => updateAttendeeStatus(attendee, Status.ABSENT)}
                                            >
                                                Late
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </CardContent>
            </div>)}
        </>
    );
};

export default UsersAttendance;