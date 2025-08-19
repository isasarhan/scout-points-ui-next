import { Role } from "./user";

export interface IAccount {
    _id?:string
    user: string;
    username: string
    password: string;
    phone: string;
    isApproved: boolean;
    isSuperAdmin: boolean;
    role: Role
}