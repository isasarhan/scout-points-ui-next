import { getAuth } from '@/lib/auth';
import { useUserContext } from '@/providers/UserProvider';
import { Role } from '@/types/user';
import React, { FC } from 'react';

export interface IsUserProps {
    children: React.ReactNode
}

const IsUser: FC<IsUserProps> = ({ children }) => {
    const { user } = useUserContext()

    if (user?.role === Role.USER)
        return <>{children}</>

    return null
};

export default IsUser;