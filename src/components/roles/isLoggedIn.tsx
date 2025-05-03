import { useUserContext } from '@/providers/UserProvider';
import React, { FC } from 'react';

export interface IsLoggedInProps {
    children: React.ReactNode
}

const IsLoggedIn: FC<IsLoggedInProps> = ({ children }) => {
    const { user } = useUserContext()

    if (user)
        return <>{children}</>

    return null
};

export default IsLoggedIn;