import { IDepartment } from '@/types/department';
import httpService from '../../axios';
import axios from "axios";
import { IBlogCategory } from '@/types/blogs';

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

    const addBlogCategories = async (category: IBlogCategory) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.post(`${url}/add`, category);
            return res.data;
        } catch (error) {
            console.error("Error adding category:", error);

            let errorMessage = "An unexpected error occurred";

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            throw new Error(errorMessage);
        }
    };

    const remove = async (id: string) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.delete(`${url}/${id}`,);
            return res.data;
        } catch (e) {
            console.error(e);
            throw new Error("Failed to delete user");
        }
    }

    return { getBlogCategoriesById, getAllBlogCategories, addBlogCategories , remove};
}

export default useBlogCategories;
