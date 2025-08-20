/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Control } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Input } from "@/components/ui/input"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { ImagePlus } from "lucide-react";

import type { FC } from 'react';

interface FileUploaderProps {
    control: Control<any>
    name: string
    title?: string
    caption?: string
    defaultValue?: string
    setValue(name: string, file: any): void
}

const FileUploader: FC<FileUploaderProps> = ({ control, name, defaultValue = "", title, caption, setValue }) => {

    const [preview, setPreview] = React.useState<string | ArrayBuffer | null>(defaultValue);

    const onDrop = React.useCallback(
        (acceptedFiles: File[]) => {
            const reader = new FileReader();
            try {
                reader.onload = () => setPreview(reader.result);
                reader.readAsDataURL(acceptedFiles[0]);

                setValue(name, acceptedFiles[0]);
                setPreview(null);
                // form.clearErrors("image");
            } catch (error) {
                console.error(error)
                // form.resetField("image");
            }
            finally {
                setPreview(null);
            }
        },
        // [form],
        []
    );

    const { getRootProps, getInputProps, isDragActive, fileRejections } =
        useDropzone({
            onDrop,
            maxFiles: 1,
            maxSize: 1000000,
            // accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
        });

    return (

        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="">
                    <FormLabel
                        className={`${fileRejections.length !== 0 && "text-destructive"}`}
                    >
                        <h2 className="text-lg">
                            {title}
                            <span
                            // className={
                            //     form.formState.errors.image || fileRejections.length !== 0
                            //         ? "text-destructive"
                            //         : "text-muted-foreground"
                            // }
                            ></span>
                        </h2>
                    </FormLabel>
                    <FormControl>
                        <div
                            {...getRootProps()}
                            className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg p-8 "
                        >
                            {preview && (
                                <img
                                    src={preview as string}
                                    alt="Uploaded image"
                                    className="max-h-[200px] rounded-lg"
                                />
                            )}
                            <ImagePlus
                                className={`size-20 ${preview ? "hidden" : "block"}`}
                            />
                            <Input {...getInputProps()} type="file" />
                            {caption}
                        </div>
                    </FormControl>
                    <FormMessage>
                        {fileRejections.length !== 0 && (
                            <p>
                                Image must be less than 1MB and of type png, jpg, or jpeg
                            </p>
                        )}
                    </FormMessage>
                </FormItem>
            )}
        />
    );
};

export default FileUploader;