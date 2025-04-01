import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const handleAxiosError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message;

        toast.error(`Error ${status}: ${message}`);
    } else {
        toast.error("An unexpected error occurred.");
    }

    console.error("API Error:", error);
};

