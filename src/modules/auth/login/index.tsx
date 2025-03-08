'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React, { FC } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from './validation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useUserContext } from '@/providers/UserProvider';

export interface LoginModuleProps { }

const LoginModule: FC<LoginModuleProps> = () => {
    const form = useForm({
        resolver: zodResolver(loginSchema)
    })
    const { signIn } = useUserContext()
    const { handleSubmit } = form
    const onSubmit = async (data: { email: string, password: string }) => {
        const { email, password } = data
        await signIn(email, password)
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Login</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <Form {...form}>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="email"
                                defaultValue=''
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="enter your email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2 mt-2">
                            <FormField
                                control={form.control}
                                name="password"
                                defaultValue=''
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="enter your password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">
                            Sign In
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
};

export default LoginModule;