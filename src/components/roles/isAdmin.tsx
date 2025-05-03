import { getAuth } from '@/lib/auth';
import { useUserContext } from '@/providers/UserProvider';
import { Role } from '@/types/user';
import React, { FC } from 'react';

export interface IsAdminProps {
    children: React.ReactNode
}

const IsAdmin: FC<IsAdminProps> = ({ children }) => {
    const { user } = useUserContext()

    if (user?.role === Role.ADMIN)
        return <>{children}</>

    return null
};

export default IsAdmin;