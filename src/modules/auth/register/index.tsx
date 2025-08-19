"use client"

import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { formSchema } from "./validation"
import useAuth from "@/services/auth"
import { steps } from "./steps"


type FormData = z.infer<typeof formSchema>

export default function MultiStepForm() {
    const [step, setStep] = useState(0)
    const { register } = useAuth({})
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            fatherName: "",
            motherName: "",
            email: "",
            password: "",
            phone: "",
            address: {
                street: "",
                building: "",
                floor: "",
                country: "",
                city: "",
            },
            nationality: "",
            department: "",
        },
    })
    
    const onSubmit: SubmitHandler<FormData> = async (data) => {
        await register(data).then(() => console.log('success')).catch((e)=>console.log(e))
    }

    const currentStepFields = steps[step].fields

    const handleNext = async () => {
        const isValid = await form.trigger(currentStepFields as any)
        if (isValid) {
            setStep((prev) => Math.min(prev + 1, steps.length))
        }
    }

    const handlePrevious = () => {
        setStep((prev) => Math.max(prev - 1, 0))
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-3/4 mx-auto">
                <Card>
                    <Progress value={((step + 1) / (steps.length + 1)) * 100} className="mb-4" />
                    <CardHeader>
                        <CardTitle>{steps[step].title}</CardTitle>
                        <CardDescription>{steps[step].description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {currentStepFields.map((field) => (
                            <FormField
                                key={field}
                                control={form.control}
                                name={field as any}
                                render={({ field: formField }) => (
                                    <FormItem>
                                        <FormLabel>{field.split(".").pop()}</FormLabel>
                                        <FormControl>
                                            {field === "department" ? (
                                                <Select onValueChange={formField.onChange} defaultValue={formField.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Department" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="hr">Human Resources</SelectItem>
                                                        <SelectItem value="it">Information Technology</SelectItem>
                                                        <SelectItem value="finance">Finance</SelectItem>
                                                        <SelectItem value="marketing">Marketing</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            ) : (
                                                <Input
                                                    {...formField}
                                                    type={field === "password" ? "password" : field === "points" ? "number" : "text"}
                                                />
                                            )}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        {step > 0 && (
                            <Button type="button" variant="outline" onClick={handlePrevious}>
                                Previous
                            </Button>
                        )}
                        {step < steps.length - 1 ? (
                            <Button type="button" onClick={handleNext}>
                                Next
                            </Button>
                        ) : (
                            <Button type="submit">Submit</Button>
                        )}
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}

