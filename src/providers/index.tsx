'use client'
import React, { ReactNode } from 'react'
import UserProvider from './UserProvider'
import { Toaster } from "@/components/ui/sonner"

interface ProvidersProps {
    children: ReactNode
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <UserProvider>
            {children}
            <Toaster toastOptions={{
                classNames: {
                    error: ''
                },
            }} />
        </UserProvider>
    )
}

export default Providers
