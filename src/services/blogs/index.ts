import { IDepartment } from '@/types/department';
import httpService from '../axios';
import axios from "axios";
import { IAddBlog, IBlog } from '@/types/blogs';

const useBlogs = ({ token }: { token: string | undefined }) => {
    const instance = httpService.instance
    const url = `/blogs`;
    const getAllBlogs = async () => {
        if (!token) return
        return httpService.assignToken(token) ? await instance.get(`${url}`).then((res) => {
            return res.data
        }).catch((e) => console.log(e)) : null
    };

    const getById = async (id: string) => {
        if (!token) return
        return httpService.assignToken(token) ? await instance.get(`${url}/${id}`).then((res) => {
            return res.data
        }).catch((e) => console.log(e)) : null
    };

    const add = async (department: IAddBlog) => {
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

    const update = async (id: string, user: Partial<IAddBlog> & { coverImage?: File, featuredImage?: File  }) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const formData = new FormData();

            Object.entries(user).forEach(([key, value]) => {
                if (value !== undefined && key !== "coverImage") {
                    formData.append(key, value as any);
                }
            });

            if (user.coverImage) {
                formData.append("coverImage", user.coverImage);
            }

            // if (user.featuredImage) {
            //     formData.append("featuredImage", user.featuredImage);
            // }

            const res = await instance.put(`${url}/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return res.data;
        } catch (error) {
            console.error("Error updating blog:", error);

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


    return { getBlogById: getById, getAllBlogs, addBlog: add, update, remove };
}

export default useBlogs;
