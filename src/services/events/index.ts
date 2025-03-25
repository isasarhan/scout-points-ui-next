import httpService from '../axios';
import axios from "axios";
import { IAddEvent } from '@/types/event';

const useEvents = ({ token }: { token: string | undefined }) => {
    const instance = httpService.instance
    let url = `/events`;
    const getAll = async (department?: string) => {
        if (!token) return
        const params = department ? { department } : {}
        return httpService.assignToken(token) ? await instance.get(`${url}`, { params }).then((res) => {
            return res.data
        }).catch((e) => {
            console.log(e)
            throw new Error(e)
        }) : null
    };

    const getById = async (id: string) => {
        if (!token) return
        return httpService.assignToken(token) ? await instance.get(`${url}/${id}`).then((res) => {
            return res.data
        }).catch((e) => {
            console.log(e)
            throw new Error(e)
        }) : null
    };

    const add = async (event: IAddEvent) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.post(`${url}/add`, event);
            return res.data;
        } catch (error) {
            console.error("Error adding event:", error);

            let errorMessage = "An unexpected error occurred";

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            throw new Error(errorMessage);
        }
    };

    const update = async (id: string, event: Partial<IAddEvent>) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.put(`${url}/${id}`, event);
            return res.data;
        } catch (error) {
            console.error("Error adding event:", error);

            let errorMessage = "An unexpected error occurred";

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            throw new Error(errorMessage);
        }
    };


    return { getById, getAll, add, update };
}

export default useEvents;
