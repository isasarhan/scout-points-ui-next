import { IAddUser } from '@/types/user';
import httpService from '../axios';
import axios from "axios";

const useUsers = ({ token }: { token: string | undefined }) => {
    const instance = httpService.instance
    let url = `/users`;
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

    const add = async (user: IAddUser) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.post(`${url}/add`, user);
            return res.data;
        } catch (error) {
            console.error("Error adding user:", error);

            let errorMessage = "An unexpected error occurred";

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            throw new Error(errorMessage);
        }
    };


    return { getById, getAll, add };
}

export default useUsers;
