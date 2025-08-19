import { IAddUser, IUser } from '@/types/user';
import httpService from '../axios';
import { IAccount } from '@/types/account';
import axios from 'axios';

const useAuth = ({ token }: { token?: string | undefined }) => {
    const instance = httpService.instance
    const url = `/auth`;

    const update = async (id: string, account: Partial<IAccount>) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.put(`${url}/${id}`, account);
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

    const login = async (username: string, password: string) => {
        return await instance.post(`${url}/login`, { username, password }).then((res) => {
            return res.data
        })
    };
    const register = async (user: IAddUser) => {
        return await instance.post(`${url}/register`, user).then((res) => {
            return res.data
        })
    };
    return { login, register, update };
}

export default useAuth;
