'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import DatePicker from "@/common/datepicker";
import { IDepartment } from "@/types/department";
import { Textarea } from "@/components/ui/textarea";
import { EventType } from "@/types/event";
import { addEventSchema } from "../validation";
import { toast } from "sonner";
import { useUserContext } from "@/providers/UserProvider";
import useEvents from "@/services/events";
import { TimeRangePicker } from "@/components/ui/time-range-picker";



export default function AddEventModule({ departments }: { departments: IDepartment[] }) {
    const { token } = useUserContext();
    const { add } = useEvents({ token })

    const form = useForm({
        defaultValues: {
            timeRange: {
                startTime: { hour: "09", minute: "00", period: "AM" },
                endTime: { hour: "05", minute: "00", period: "PM" },
            }
        },
        resolver: zodResolver(addEventSchema),
    });
    const { handleSubmit, formState: { errors } } = form

    console.log(errors);


    type EventType = z.infer<typeof addEventSchema>;

    const onSubmit = async (data: EventType) => {
        try {
            await add(data);
            toast.success("Event added successfully!");
        } catch (e: any) {
            toast.error(e.message);
        }
    };


    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Add Event</CardTitle>
                <CardDescription>
                    Fill in the details to create a new event
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4">
                        <div className="flex items-center w-full gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Start Date</FormLabel>
                                        <FormControl>
                                            <DatePicker {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="timeRange"
                                render={({ field }) => (
                                    <FormItem className="flex-1 ">
                                        <FormLabel>Meeting Time Range</FormLabel>
                                        <FormControl>
                                            <TimeRangePicker value={field.value} onChange={field.onChange} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>End Date</FormLabel>
                                        <FormControl>
                                            <DatePicker {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>
                        <div className='flex items-center w-full gap-4'>
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Location" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Type</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Role" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {Object.values(EventType).map((type) => (
                                                        <SelectItem key={type} value={type}>
                                                            {type}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="department"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Department</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Department" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {departments.map((department) => (
                                                        <SelectItem value={department._id}>
                                                            {department.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea rows={3} placeholder="Enter description (optional)" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className='px-9 '>
                            Add
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}
