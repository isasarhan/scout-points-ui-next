import { IAchievement } from '@/types/achievement';
import httpService from '../axios';
import axios from "axios";

const useAchievements = ({ token }: { token: string | undefined }) => {
    const instance = httpService.instance
    const url = `/achievements`;

    const getAll = async (query?: Record<string, any>) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.get(url, { params: query });
            return res.data;
        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch achievements");
        }
    }

    const getById = async (id: string) => {
        if (!token) return
        return httpService.assignToken(token) ? await instance.get(`${url}/${id}`).then((res) => {
            return res.data
        }).catch((e) => console.log(e)) : null
    };

    const add = async (achievement: IAchievement) => {
        if (!token) return;
    
        if (!httpService.assignToken(token)) return null;
    
        try {
            const res = await instance.post(`${url}/add`, achievement);
            return res.data;
        } catch (error) {
            console.error("Error adding achievement:", error);
    
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

export default useAchievements;
