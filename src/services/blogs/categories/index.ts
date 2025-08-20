import { IDepartment } from '@/types/department';
import httpService from '../../axios';
import axios from "axios";

const useBlogCategories = ({ token }: { token: string | undefined }) => {
    const instance = httpService.instance
    const url = `/blog-categories`;
    
    const getAllBlogCategories = async () => {
        if (!token) return
        return httpService.assignToken(token) ? await instance.get(`${url}`).then((res) => {
            return res.data
        }).catch((e) => console.log(e)) : null
    };

    const getBlogCategoriesById = async (id: string) => {
        if (!token) return
        return httpService.assignToken(token) ? await instance.get(`${url}/${id}`).then((res) => {
            return res.data
        }).catch((e) => console.log(e)) : null
    };

    const addBlogCategories = async (department: IDepartment) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.post(`${url}/add`, department);
            return res.data;
        } catch (error) {
            console.error("Error adding department:", error);

            let errorMessage = "An unexpected error occurred";

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            throw new Error(errorMessage);
        }
    };


    return { getBlogCategoriesById, getAllBlogCategories, addBlogCategories };
}

export default useBlogCategories;
