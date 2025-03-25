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
import { IEvent } from "@/types/event"
import { dateFormatter } from "@/lib/dateFormatter"

export interface UsersAttendanceProps {
    users: IUser[];
    event: IEvent;
    selectedEventId: string
}

const UsersAttendance: FC<UsersAttendanceProps> = ({ users, event, selectedEventId }) => {
    const [attendees, setAttendees] = useState<IUser[]>(users)
    const [searchQuery, setSearchQuery] = useState("")
    const [filterGroup, setFilterGroup] = useState<Rank | string>('all')

    const handleSave = (id: string) => {

    }

    const updateAttendeeStatus = (id: string, status: "present" | "absent" | "late") => {
        const updatedAttendees = attendees.map((attendee) => {
            if (attendee._id === id) {
                return {
                    ...attendee,
                    status,
                    lastUpdated: new Date().toISOString(),
                }
            }
            return attendee
        })

        setAttendees(updatedAttendees)
    }

    const filteredAttendees = attendees.filter((attendee) => {
        const matchesSearch =
            attendee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            attendee.email.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesGroup = filterGroup === "all"

        return matchesSearch && matchesGroup
    })



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
                {/* <div className="flex flex-col gap-3 flex-grow " onClick={() => setSelectedEventId(prev => prev === event._id ? "" : event._id)}> */}
                    <div className="flex-1">{dateFormatter(event.startDate)}</div>
                    <div className="flex-1">{event?.name}</div>
                </div>
                <div>
                    {selectedEventId === event._id && <Button type="button" onClick={() => handleSave(event._id)}>Save</Button>}
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
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
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

                    {filteredAttendees.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-muted-foreground">No attendees found</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {users.map((attendee) => (
                                <Card key={attendee._id} className="overflow-hidden">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4">
                                        <div className="flex items-center gap-4 flex-1">
                                            <Avatar>
                                                <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${getInitials(attendee.firstName)}`} />
                                                <AvatarFallback>{getInitials(attendee.firstName)}</AvatarFallback>
                                            </Avatar>

                                            <div className="space-y-1">
                                                <h3 className="font-medium">{attendee.firstName}</h3>
                                                <p className="text-sm text-muted-foreground">{attendee.email}</p>
                                                <div className="flex items-center gap-2">
                                                    {/* <Badge variant="outline">{getGroupName(attendee.rank)}</Badge> */}
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
                                                variant={attendee.rank === Rank.ROVER ? "default" : "outline"}
                                                onClick={() => updateAttendeeStatus(attendee._id, "present")}
                                            >
                                                <Check className="h-4 w-4 mr-1" />
                                                Present
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant={attendee.rank === Rank.ROVER ? "destructive" : "outline"}
                                                onClick={() => updateAttendeeStatus(attendee._id, "absent")}
                                            >
                                                <X className="h-4 w-4 mr-1" />
                                                Absent
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant={attendee.rank === Rank.ROVER ? "secondary" : "outline"}
                                                onClick={() => updateAttendeeStatus(attendee._id, "late")}
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