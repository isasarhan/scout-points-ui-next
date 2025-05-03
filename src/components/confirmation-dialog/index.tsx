"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import React, { FC } from 'react';

export interface ConfirmationDialogProps {
    title: string
    children: React.ReactNode
    description: string
    onConfirm(): void
}

const ConfirmationDialog: FC<ConfirmationDialogProps> = ({ title, description, onConfirm, children }) => {

    const [open, setOpen] = useState(false)

    const handleConfirm = () => {

        setOpen(false)
        onConfirm()
    }

    const handleCancel = () => {

        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div onClick={() => setOpen(true)}>{children}</div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-row justify-end gap-2 sm:justify-end">
                    <Button variant="outline" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm}>Yes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default ConfirmationDialog;
