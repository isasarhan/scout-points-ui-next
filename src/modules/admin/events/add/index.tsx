'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { IDepartment } from "@/types/department";
import { EventType } from "@/types/event";
import { addEventSchema } from "../validation";
import { toast } from "sonner";
import { useUserContext } from "@/providers/UserProvider";
import useEvents from "@/services/events";
import FormInput from "@/components/common/form/input";
import FormDatePicker from "@/components/common/form/datePicker";
import FormTimeRange from "@/components/common/form/timeRange";
import FormSelect from "@/components/common/form/select";
import FormMultiSelect from "@/components/common/form/multiSelect";
import FormTextArea from "@/components/common/form/textarea";



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
                            <FormInput
                                control={form.control}
                                name="name"
                                title='Name'
                                placeholder="Enter name"
                            />

                            <FormDatePicker
                                control={form.control}
                                name="startDate"
                                title='Start Date'
                            />
                            <FormTimeRange
                                control={form.control}
                                name="timeRange"
                                title='Meeting Time Range'

                            />

                            <FormDatePicker
                                control={form.control}
                                name="endDate"
                                title='End Date'
                            />

                        </div>
                        <div className='flex items-center w-full gap-4'>
                            <FormInput
                                control={form.control}
                                name="location"
                                title='Location'
                                placeholder="Enter Location"
                            />
                            <FormSelect
                                control={form.control}
                                name="type"
                                title='Type'
                                placeholder="Select Role"
                                options={Object.values(EventType).map((type) => ({
                                    label: type,
                                    value: type
                                }))}
                            />
                            <FormMultiSelect
                                control={form.control}
                                name="departments"
                                title='Departments'
                                placeholder="Select departments..."
                                options={departments}
                            />

                        </div>
                        <div>
                            <FormTextArea
                                control={form.control}
                                name="description"
                                title='Description'
                                placeholder="Enter description (optional)"
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
