'use client'
import { ViewIcon } from '@/assets/icons';
import Dropdown from '@/components/dropdown';
import SearchInput from '@/components/search-input';
import Table, { Column } from '@/components/table';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { getRankColor } from '@/lib/utils';
import { useUserContext } from '@/providers/UserProvider';
import useUsers from '@/services/users';
import { IUser, Rank } from '@/types/user';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';
import { toast } from 'sonner';
export interface UsersModuleProps {
    users: IUser[];
}
const UsersModule: FC<UsersModuleProps> = ({ users = [] }) => {
    const { token } = useUserContext()
    const { update } = useUsers({ token })
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>(users)
    const searchParam = useSearchParams()
    const pathName = usePathname()
    const router = useRouter()

    useEffect(() => {
        if (users)
            setFilteredUsers(users)
    }, [users])

    const handleSearch = (query: string) => {
        router.push(`${pathName}?query=${query}`)
    }

    const handleRankChange = (rank: string) => {
        if (rank === 'all')
            setFilteredUsers(users)

        else setFilteredUsers(users.filter((user) => user.rank === rank))
    }

    const handleChangePublicity = async (user: IUser) => {
        await update(user._id!, { isApproved: !user.isApproved }).then(() => {
            router.refresh()
            toast.success('updated!')
        })
    }

    const column: Column[] = [
        {
            label: 'First Name',
            value: 'firstName'
        },
        {
            label: 'Last Name',
            value: 'lastName'
        },
        {
            label: 'Email',
            value: 'email'
        },
        {
            label: 'Points',
            value: 'points'
        },
        {
            label: 'Rank',
            value: 'rank',
            render: (value: IUser) => (
                <div className={getRankColor(value.rank)}>{value.rank}</div>
            )
        },
        {
            label: 'Department',
            value: 'department',
            render: (value: IUser) => (
                <div className=''>
                    {value?.department?.name}
                </div>
            )
        },
        {
            label: 'View More',
            value: '_id',
            render: (value: IUser) => (
                <div className='flex justify-center items-center w-full'>
                    <Link href={`/admin/users/${value._id}`}><ViewIcon size={20} /> </Link>
                </div>
            )
        },
        {
            label: 'Is Approved',
            value: 'isApproved',
            render: (value: IUser) => {
                return <div className="flex items-center justify-center" >
                    <Switch checked={value.isApproved} onCheckedChange={() => handleChangePublicity(value)} />
                </div>
            }
        },
    ]

    return (
        <>
            <div className='flex gap-3 pb-7'>
                <SearchInput className='w-full' handleSearch={handleSearch} />
                <div className="flex gap-2">
                    <Dropdown placeholder='Select Rank' options={Object.values(Rank).map((rank) => {
                        return { key: rank, value: rank, label: rank }
                    })} handleDropdownChange={handleRankChange} />
                </div>
            </div >

            <Table data={filteredUsers} column={column} />
        </>
    );
};

export default UsersModule;