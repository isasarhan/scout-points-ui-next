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
import { getInitials, getRankColor } from "@/lib/utils"

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

    const [attendees, setAttendees] = useState<IAttendee[]>([])
    const [filteredAttendees, setFilteredAttendees] = useState<IAttendee[]>([])
    const [filterGroup, setFilterGroup] = useState<Rank | string>('all')

    const { token } = useUserContext();
    const { update } = useEvents({ token })

    useEffect(() => {
        const attendeeMap = new Map(event.attendees.map(att => [att.user._id, att.status]));
        
        const mapped = users.map(user => ({
            user,
            status: attendeeMap.get(user._id) || Status.ABSENT
        }));
        
        setAttendees(mapped);
        setFilteredAttendees(mapped);
    }, [users, event]);
    
    const handleSave = async () => {
        try {
            const mapped: IAddAttendee[] = attendees.map((att) => ({
                user: att.user?._id || '',  
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
        const updated = attendees.map(att => att.user._id === attendee.user._id ? {
            ...attendee,
            status
        } : att)
        setAttendees(updated)
        setFilteredAttendees(updated)
    }
    const filterByBatch = (filterGroup: string) => {
        setFilterGroup(filterGroup)
        if (filterGroup === "all")
            setFilteredAttendees(attendees)
        else {
            setFilteredAttendees(attendees.filter(attendee => attendee.user.rank === filterGroup))
        }
    }

    const handleSearch = (query: string) => {
        const searchTerm = query.toLowerCase().trim();
        if (searchTerm === "") {
            filterByBatch(filterGroup)
        }

        const filtered = filteredAttendees.filter((attendee) => {
            const user = attendee.user;
            if (!user) return false;

            const matchesSearch =
                (user.firstName?.toLowerCase().includes(searchTerm) ||
                    user.email?.toLowerCase().includes(searchTerm))

            return matchesSearch;
        });

        setFilteredAttendees(filtered);
    };

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

                        <Select value={filterGroup} onValueChange={filterByBatch}>
                            <SelectTrigger className="w-full md:w-[180px]">
                                <SelectValue placeholder="Filter by group" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Ranks</SelectItem>
                                {Object.values(Rank).map((rank) => (
                                    <SelectItem key={rank} value={rank}>
                                        {rank}
                                    </SelectItem>
                                ))}
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
                                                    <Badge variant="outline" className={getRankColor(attendee?.user?.rank)}>{attendee?.user?.rank}</Badge>
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
                                                variant={attendee.status === Status.ABSENT ? "destructive" : "outline"}
                                                onClick={() => updateAttendeeStatus(attendee, Status.LATE)}
                                            >
                                                <X className="h-4 w-4 mr-1" />
                                                Absent
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant={attendee.status === Status.LATE ? "secondary" : "outline"}
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