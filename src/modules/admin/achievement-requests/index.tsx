'use client'
import { ViewIcon } from '@/assets/icons';
import ConfirmationDialog from '@/components/confirmation-dialog';
import Table, { Column } from '@/components/table';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { cn, getLevelColor, getRankColor, getStatusColor } from '@/lib/utils';
import { useUserContext } from '@/providers/UserProvider';
import useAchievementRequests from '@/services/achievementsRequests';
import { IAchievementRequest, Status } from '@/types/achievement';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import { toast } from 'sonner';

export interface AchievementRequestsModuleProps {
    requests: IAchievementRequest[]
}

const AchievementRequestsModule: FC<AchievementRequestsModuleProps> = ({ requests }) => {
    const { token } = useUserContext()
    const { update, remove } = useAchievementRequests({ token })
    const router = useRouter()

    const handleStatus = (value: IAchievementRequest) => {
        update(value._id!, { achievement: value.achievement._id, user: value.user._id, status: value.status === Status.Complete ? Status.Pending : Status.Complete }).then(() => {
            router.refresh()
            toast.success('updated!')
        }).catch((e)=>
            toast.error(`${e.message}`)
        )
    }

    const handleDelete = (id: string) => {
        remove(id).then(() => {
            router.refresh()
            toast.success('removed!')
        })
    }

    const column: Column[] = [
        {
            label: 'User',
            render: (value: IAchievementRequest) => {
                return <div >{value.user.firstName + " " + value.user.lastName}</div>
            }
        },
        {
            label: 'Achievement',
            value: 'achievement',
            render: (value: IAchievementRequest) => {
                return <div className='text-black'>{value.achievement.title}</div>
            }
        },
        {
            label: 'Rank',
            value: 'rank',
            render: (value: IAchievementRequest) => {
                return <div className={cn(getRankColor(value.achievement.rank), 'justify-center p-2 rounded-full')}>{value.achievement.rank}</div>
            }
        },
        {
            label: 'Level',
            value: 'level',
            render: (value: IAchievementRequest) => {
                return <div className={cn(getLevelColor(value.achievement.level), 'justify-center p-2 rounded-full')}>{value.achievement.level}</div>
            }
        },
        {
            label: 'Status',
            value: 'status',
            render: (value: IAchievementRequest) => {
                return <div className={getStatusColor(value.status)}>{value.status}</div>
            }
        },
        {
            label: 'Change to Complete',
            render: (value: IAchievementRequest) => {
                return <div className="flex items-center justify-center" >
                    <Switch checked={value.status === Status.Complete} onCheckedChange={() => handleStatus(value)} />
                </div>
            }
        },
        {
            label: 'Delete',
            render: (value: IAchievementRequest) => {
                return <div className="flex items-center justify-center" >
                    <ConfirmationDialog title='Delete Request' onConfirm={() => handleDelete(value._id!)} description='Are you sure you want to delete the request?'>
                        <Trash className='text-red-500 cursor-pointer' />
                    </ConfirmationDialog>
                </div>
            }
        },
    ]
    return (
        <Card className='p-4'>
            <Table data={requests} column={column} />
        </Card>
    );
};

export default AchievementRequestsModule;