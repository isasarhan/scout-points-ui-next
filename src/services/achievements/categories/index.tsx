import httpService from '../../axios';
import axios from "axios";
import { IAchievemntCategory } from '@/types/achievemntCategory';

const useAchievementCategory = ({ token }: { token: string | undefined }) => {
    const instance = httpService.instance
    const url = `/achievements-categories`;
    const getAll = async () => {
        return  await instance.get(`${url}`).then((res) => {
            return res.data
        }).catch((e) => {
            console.log(e)
            throw new Error(e)
        })
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

    const add = async (data: IAchievemntCategory) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;
        
        try {
            const res = await instance.post(`${url}/add`, data);
            return res.data;
        } catch (error) {
            console.error("Error adding achievement category:", error);

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

export default useAchievementCategory;
