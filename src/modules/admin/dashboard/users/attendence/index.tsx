"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Search, X } from "lucide-react"
import { toast } from "sonner"
import { IUser } from "@/types/user"

type Attendee = {
    id: string
    name: string
    email: string
    group: string
    status: "present" | "absent" | "late"
    lastUpdated: string
}

export default function AttendenceModule({ users }: { users: IUser[] }) {
    const [attendees, setAttendees] = useState<Attendee[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [filterGroup, setFilterGroup] = useState<string>("all")

    useEffect(() => {
        // Load attendees from localStorage
        const storedAttendees = localStorage.getItem("attendees")
        if (storedAttendees) {
            setAttendees(JSON.parse(storedAttendees))
        } else {
            // Initialize with sample data if empty
            const sampleAttendees: Attendee[] = [
                {
                    id: "1",
                    name: "Alex Johnson",
                    email: "alex@example.com",
                    group: "class-a",
                    status: "present",
                    lastUpdated: new Date().toISOString(),
                },
                {
                    id: "2",
                    name: "Sam Wilson",
                    email: "sam@example.com",
                    group: "class-b",
                    status: "absent",
                    lastUpdated: new Date().toISOString(),
                },
                {
                    id: "3",
                    name: "Taylor Smith",
                    email: "taylor@example.com",
                    group: "team-1",
                    status: "late",
                    lastUpdated: new Date().toISOString(),
                },
            ]
            setAttendees(sampleAttendees)
            localStorage.setItem("attendees", JSON.stringify(sampleAttendees))
        }
    }, [])

    const updateAttendeeStatus = (id: string, status: "present" | "absent" | "late") => {
        const updatedAttendees = attendees.map((attendee) => {
            if (attendee.id === id) {
                return {
                    ...attendee,
                    status,
                    lastUpdated: new Date().toISOString(),
                }
            }
            return attendee
        })

        setAttendees(updatedAttendees)
        localStorage.setItem("attendees", JSON.stringify(updatedAttendees))

        // toast({
        //   title: "Status Updated",
        //   description: `Attendance status has been updated to ${status}`,
        // })
    }

    const filteredAttendees = attendees.filter((attendee) => {
        const matchesSearch =
            attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            attendee.email.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesGroup = filterGroup === "all" || attendee.group === filterGroup

        return matchesSearch && matchesGroup
    })

    const getGroupName = (groupId: string) => {
        switch (groupId) {
            case "class-a":
                return "Class A"
            case "class-b":
                return "Class B"
            case "team-1":
                return "Team 1"
            case "team-2":
                return "Team 2"
            default:
                return groupId
        }
    }

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
        <div className="space-y-4">
            <CardHeader>
                <CardTitle>Attendance Records</CardTitle>
                <CardDescription>Manage attendance for your participants</CardDescription>
            </CardHeader>

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
                        {filteredAttendees.map((attendee) => (
                            <Card key={attendee.id} className="overflow-hidden">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4">
                                    <div className="flex items-center gap-4 flex-1">
                                        <Avatar>
                                            <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${getInitials(attendee.name)}`} />
                                            <AvatarFallback>{getInitials(attendee.name)}</AvatarFallback>
                                        </Avatar>

                                        <div className="space-y-1">
                                            <h3 className="font-medium">{attendee.name}</h3>
                                            <p className="text-sm text-muted-foreground">{attendee.email}</p>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline">{getGroupName(attendee.group)}</Badge>
                                                <div className="flex items-center gap-1">
                                                    <span className={`h-2 w-2 rounded-full ${getStatusColor(attendee.status)}`} />
                                                    <span className="text-xs capitalize">{attendee.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 w-full sm:w-auto">
                                        <Button
                                            size="sm"
                                            variant={attendee.status === "present" ? "default" : "outline"}
                                            onClick={() => updateAttendeeStatus(attendee.id, "present")}
                                        >
                                            <Check className="h-4 w-4 mr-1" />
                                            Present
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant={attendee.status === "absent" ? "destructive" : "outline"}
                                            onClick={() => updateAttendeeStatus(attendee.id, "absent")}
                                        >
                                            <X className="h-4 w-4 mr-1" />
                                            Absent
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant={attendee.status === "late" ? "secondary" : "outline"}
                                            onClick={() => updateAttendeeStatus(attendee.id, "late")}
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
        </div>
    )
}

