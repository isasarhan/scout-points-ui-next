"use client";
import React, { FC } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUserContext } from "@/providers/UserProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddUserSchema } from "../validation";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import Autocomplete from "@/components/autocomplete";
import { nationalities } from "@/lib/nationalities";
import { Rank, Role } from "@/types/user";
import { IDepartment } from "@/types/department";
import useUsers from "@/services/users";
import { toast } from "sonner";
import FormInput from "@/components/common/form/input";
import FormSelect from "@/components/common/form/select";
import useAuth from "@/services/auth";

export interface AddUserModuleProps {
    departments: IDepartment[];
}
const AddUserModule: FC<AddUserModuleProps> = ({ departments }) => {
    const { token } = useUserContext();
    const { register } = useAuth({})

    const form = useForm({
        mode: "onBlur",
        resolver: zodResolver(AddUserSchema),
    });
    const { handleSubmit } = form;
    type UserType = z.infer<typeof AddUserSchema>;

    const onSubmit = async (data: UserType) => {
        try {
            await register(data);
            toast.success("User added successfully!");
        } catch (e: any) {
            toast.error(e.message);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Add User</CardTitle>
                <CardDescription>
                    Fill in the details to create a new user
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4">
                        <div className="flex items-center w-full gap-4">
                            <FormInput
                                control={form.control}
                                name="firstName"
                                title='First Name'
                                placeholder="Enter user first name"
                            />

                            <FormInput
                                control={form.control}
                                name="lastName"
                                title='Last Name'
                                placeholder="Enter user last name"
                            />
                            <FormInput
                                control={form.control}
                                name="fatherName"
                                title='Father Name'
                                placeholder="Enter father first name"
                            />

                            <FormInput
                                control={form.control}
                                name="motherName"
                                title='Mother Name'
                                placeholder="Enter mother full name"
                            />

                        </div>
                        <div className="flex items-center w-full gap-4">
                            <FormInput
                                control={form.control}
                                name="username"
                                title='Username'
                                placeholder="Enter username"
                            />
                            <FormInput
                                control={form.control}
                                name="email"
                                title='Email'
                                placeholder="Enter email"
                            />
                            <FormInput
                                control={form.control}
                                name="password"
                                title='Password'
                                placeholder="Enter password"
                                type="password"
                            />
                            <FormInput
                                control={form.control}
                                name="phone"
                                title='Phone'
                                placeholder="Enter phone"
                            />


                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            <FormField
                                control={form.control}
                                name="nationality"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Nationality</FormLabel>
                                        <FormControl>
                                            <Autocomplete
                                                options={nationalities}
                                                placeholder="Select Nationality"
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormSelect
                                control={form.control}
                                name="role"
                                title='Role'
                                placeholder="Select Role"
                                options={Object.values(Role).map((type) => ({
                                    label: type,
                                    value: type
                                }))}
                            />

                            <FormSelect
                                control={form.control}
                                name="rank"
                                title='Rank'
                                placeholder="Select Rank"
                                options={Object.values(Rank).map((type) => ({
                                    label: type,
                                    value: type
                                }))}
                            />
                            <FormSelect
                                control={form.control}
                                name="department"
                                title='Department'
                                placeholder="Select Department"
                                options={departments.map((department) => ({
                                    label: department.name,
                                    value: department._id
                                }))}
                            />

                        </div>

                        <p className="text-2xl font-bold">Address</p>
                        <div className="flex items-center w-full gap-4">
                            <FormInput
                                control={form.control}
                                name="address.city"
                                title='City'
                                placeholder="Enter city"
                            />

                            <FormField
                                control={form.control}
                                name="address.country"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Country</FormLabel>
                                        <FormControl>
                                            <Autocomplete
                                                options={nationalities}
                                                placeholder="Select Country"
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex items-center w-full gap-4">
                            <FormInput
                                control={form.control}
                                name="address.building"
                                title='Postal Code'
                                placeholder="Enter building"
                            />
                            <FormInput
                                control={form.control}
                                name="address.street"
                                title='Street'
                                placeholder="Enter street"
                            />

                            <FormInput
                                control={form.control}
                                name="address.floor"
                                title='Floor'
                                placeholder="Enter floor"
                            />

                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="px-9 ">
                            Add
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
};

export default AddUserModule;
