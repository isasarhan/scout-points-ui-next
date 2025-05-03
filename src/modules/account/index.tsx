'use client'
import { BuildingIcon, EmailIcon, GlobeIcon, LocationIcon, NumberIcon, RoadIcon, UserIcon } from '@/assets/icons';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserContext } from '@/providers/UserProvider';
import { IUser } from '@/types/user';
import { PhoneIcon } from 'lucide-react';
import Image from 'next/image';
import React, { FC } from 'react';

export interface AccountModuleProps { }

const AccountModule: FC<AccountModuleProps> = () => {
    const { user } = useUserContext()

    return (
        <div className='flex flex-col gap-5'>
            <div className='flex gap-5'>
                <Card className="flex flex-1 flex-grow gap-3 justify-center items-center p-5">
                    <RoadIcon />
                    {user?.address?.street}
                </Card>
                <Card className="flex flex-1 flex-grow gap-3 justify-center items-center p-5">
                    <BuildingIcon />
                    {user?.address?.building}
                </Card>
                <Card className="flex flex-1 flex-grow gap-3 justify-center items-center p-5">
                    <NumberIcon />
                    {user?.address?.floor}
                </Card>
                <Card className="flex flex-1 flex-grow gap-3 justify-center items-center p-5">
                    <GlobeIcon />
                    {user?.address?.country}
                </Card>
                <Card className="flex flex-1 flex-grow gap-3 justify-center items-center p-5">
                    <LocationIcon />
                    {user?.address?.city}
                </Card>
            </div>
            <div className="flex flex-row gap-5">
                <Card className="w-1/2">
                    <CardHeader className='flex justify-center items-center'>
                        <Image src={'/profile.png'} width={150} height={150} alt='profile image'
                            className='rounded-full border shadow' />
                    </CardHeader>
                    <CardContent >
                        <div className='flex justify-center flex-col items-center gap-2'>
                            <p className='flex  items-center gap-3 text-xl'><UserIcon className='text-primary' />{user?.firstName} {user?.lastName}</p>
                            <p className='flex items-center gap-3 text-xl'> <EmailIcon className='text-primary' />{user?.email}</p>
                            <p className='flex items-center gap-3 text-xl'><PhoneIcon className='text-primary' />{user?.phone}</p>
                        </div>
                    </CardContent>
                    <CardFooter>
                    </CardFooter>
                </Card>
                <Card className="w-1/2">
                    <CardHeader>
                        <CardTitle>Additional Info</CardTitle>
                        {/* <CardDescription>Card Description</CardDescription> */}
                    </CardHeader>
                    <CardContent>
                        <CardDescription className='flex flex-col gap-2'>
                            <div className='flex justify-between bg-primary text-white p-3 rounded-xl'>
                                <div className='w-1/4'>Father Name:</div>
                                <div className='w-3/4 text-center'>{user?.fatherName}</div>
                            </div>
                            <div className='flex justify-between p-3 rounded-xl'>
                                <div className='w-1/4'>Mother Name:</div>
                                <div className='w-3/4 text-center'>{user?.motherName}</div>
                            </div>
                            <div className='flex justify-between bg-primary text-white p-3 rounded-xl'>
                                <div className='w-1/4'>Nationality:</div>
                                <div className='w-3/4 text-center'>{user?.nationality}</div>
                            </div>
                            <div className='flex justify-between p-3 rounded-xl'>
                                <div className='w-1/4'>Department:</div>
                                <div className='w-3/4 text-center'>{user?.department?.name}</div>
                            </div>
                        </CardDescription>
                    </CardContent>
                    <CardFooter>
                    </CardFooter>
                </Card>
            </div>
            <pre>

            </pre>

        </div>
    );
};

export default AccountModule;