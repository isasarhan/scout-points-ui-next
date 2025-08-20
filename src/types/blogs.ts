import { IUser } from "./user"

export interface IBlogCategory {
    _id: string;
    name: string;
    slug: string;
    img: string;
    description: string;
}

export interface IBlog {
    _id: string
    author: IUser
    title: string
    content: string
    rating?: number
    enabled?: boolean;
    categories: IBlogCategory[]
    coverImage?: string;
    featuredImage?: string;
}
export interface IAddBlog {
    author?: string
    title: string
    content?: string
    rating?: number
    enabled?: boolean;
    categories?: string[]
    coverImage?: string;
    featuredImage?: string;
}
export interface IBlogsResponse {
    data: IBlog[]
    page: number
    pages: number
    total: number
}