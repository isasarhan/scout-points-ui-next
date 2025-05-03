import { useUserContext } from '@/providers/UserProvider';
import React, { FC } from 'react';

export interface IsLoggedOutProps {
    children: React.ReactNode
}

const IsLoggedOut: FC<IsLoggedOutProps> = ({ children }) => {
    const { user } = useUserContext()

    if (!user)
        return <>{children}</>

    return null
};

export default IsLoggedOut;